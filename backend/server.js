require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Database = require("better-sqlite3");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || "saingam-shop-development-secret";
const PROVIDER_API_URL = process.env.PROVIDER_API_URL || "";
const PROVIDER_API_KEY = process.env.PROVIDER_API_KEY || "";
const PROVIDER_MODE = String(process.env.PROVIDER_MODE || "manual").toLowerCase();
const PROMPTPAY_ID = String(process.env.PROMPTPAY_ID || "").replace(/[^0-9]/g, "");

function crc16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}
function tlv(id, value) {
  return id + String(value.length).padStart(2, "0") + value;
}
function promptPayPayload(id, amount) {
  if (!/^\d{10,13}$/.test(id)) throw new Error("PROMPTPAY_ID ไม่ถูกต้อง");
  const normalized = id.length === 10 ? "0066" + id.slice(1) : id;
  const accountTag = id.length === 13 ? "02" : "01";
  const merchantAccount = tlv("00", "A000000677010111") + tlv(accountTag, normalized);
  let payload = tlv("00", "01") + tlv("01", "12") + tlv("29", merchantAccount) + tlv("52", "0000") + tlv("53", "764");
  if (Number(amount) > 0) payload += tlv("54", Number(amount).toFixed(2));
  payload += tlv("58", "TH") + tlv("59", "SAINGAM SHOP") + tlv("60", "PHITSANULOK") + "6304";
  return payload + crc16(payload);
}

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "1mb" }));

const db = new Database("saingam-shop.db");
db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  password_hash TEXT,
  role TEXT NOT NULL DEFAULT 'customer',
  wallet_balance REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '🎮',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  provider_code TEXT DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_no TEXT UNIQUE NOT NULL,
  user_id INTEGER,
  product_id INTEGER NOT NULL,
  package_id INTEGER,
  target TEXT DEFAULT '',
  amount REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  provider_status TEXT DEFAULT '',
  note TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(product_id) REFERENCES products(id),
  FOREIGN KEY(package_id) REFERENCES packages(id)
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  amount REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  reference TEXT DEFAULT '',
  note TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
`);

const seedProducts = [
  ["RoV เติมคูปอง", "เกม", "เติมคูปองเข้าเกม", "⚔️"],
  ["Free Fire", "เกม", "เติมเพชร Free Fire", "🔥"],
  ["Genshin Impact", "เกม", "เติม Genesis Crystals", "✨"],
  ["Garena Shells", "ดิจิทัล", "บัตรเติมเงินดิจิทัล", "🎫"],
  ["Steam Wallet", "ดิจิทัล", "เติมเงิน Steam", "🎮"],
  ["Razer Gold", "ดิจิทัล", "เติมเงิน Razer Gold", "💳"],
  ["AIS เติมเงิน", "มือถือ", "เติมเงินเข้าหมายเลข AIS", "📱"],
  ["TrueMove H", "มือถือ", "เติมเงินเข้าหมายเลข True", "📲"]
];

if (db.prepare("SELECT COUNT(*) AS c FROM products").get().c === 0) {
  const insert = db.prepare("INSERT INTO products (name,category,description,icon) VALUES (?,?,?,?)");
  const tx = db.transaction(() => seedProducts.forEach(p => insert.run(...p)));
  tx();
}

const seedPackages = [
  [1, "35 คูปอง", 10, "ROV-10"], [1, "70 คูปอง", 20, "ROV-20"], [1, "350 คูปอง", 100, "ROV-100"],
  [2, "100 เพชร", 35, "FF-100"], [2, "310 เพชร", 99, "FF-310"], [2, "520 เพชร", 159, "FF-520"],
  [3, "60 Genesis Crystals", 35, "GI-60"], [3, "330 Genesis Crystals", 179, "GI-330"], [3, "1090 Genesis Crystals", 549, "GI-1090"],
  [4, "55 Shells", 50, "GS-55"], [4, "110 Shells", 100, "GS-110"],
  [5, "100 บาท", 100, "ST-100"], [5, "300 บาท", 300, "ST-300"],
  [6, "100 Gold", 100, "RZ-100"], [6, "300 Gold", 300, "RZ-300"],
  [7, "100 บาท", 100, "AIS-100"], [7, "300 บาท", 300, "AIS-300"],
  [8, "100 บาท", 100, "TRUE-100"], [8, "300 บาท", 300, "TRUE-300"]
];
if (db.prepare("SELECT COUNT(*) AS c FROM packages").get().c === 0) {
  const insertPackage = db.prepare("INSERT INTO packages (product_id,name,price,provider_code) VALUES (?,?,?,?)");
  const tx = db.transaction(() => seedPackages.forEach(p => insertPackage.run(...p)));
  tx();
}

function makeOrderNo() {
  const now = new Date();
  const stamp = now.toISOString().replace(/\D/g, "").slice(0, 14);
  const rand = Math.floor(100 + Math.random() * 900);
  return `SG${stamp}${rand}`;
}

function signUser(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email, phone: user.phone },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ ok: false, message: "กรุณาเข้าสู่ระบบ" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ ok: false, message: "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่" });
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== "admin" && req.user.role !== "super_admin") {
    return res.status(403).json({ ok: false, message: "ไม่มีสิทธิ์ใช้งานส่วนนี้" });
  }
  next();
}

async function sendToProvider(order) {
  // Generic provider gateway. Real provider payload/headers may need adaptation
  // to the provider's API documentation.
  if (PROVIDER_MODE !== "http" || !PROVIDER_API_URL || !PROVIDER_API_KEY) {
    return { sent: false, mode: "manual", message: "ยังไม่ได้ตั้งค่า Provider API จริง" };
  }

  const payload = {
    order_no: order.order_no,
    product_code: order.provider_code || "",
    target: order.target || "",
    amount: Number(order.amount)
  };

  const response = await fetch(PROVIDER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${PROVIDER_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!response.ok) {
    throw new Error(`Provider HTTP ${response.status}`);
  }
  return { sent: true, mode: "http", data };
}

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "Saingam Shop API",
    version: "1.0.0",
    message: "Backend พร้อมทำงาน"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, status: "online", time: new Date().toISOString() });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !password || (!email && !phone)) {
      return res.status(400).json({ ok: false, message: "กรุณากรอกชื่อ และอีเมลหรือเบอร์โทร พร้อมรหัสผ่าน" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const result = db.prepare(
      "INSERT INTO users (name,email,phone,password_hash) VALUES (?,?,?,?)"
    ).run(name.trim(), email || null, phone || null, passwordHash);
    const user = db.prepare("SELECT id,name,email,phone,role,wallet_balance,status,created_at FROM users WHERE id=?").get(result.lastInsertRowid);
    res.status(201).json({ ok: true, token: signUser(user), user });
  } catch (e) {
    if (String(e.message).includes("UNIQUE")) {
      return res.status(409).json({ ok: false, message: "อีเมลหรือเบอร์โทรนี้ถูกใช้งานแล้ว" });
    }
    res.status(500).json({ ok: false, message: "ไม่สามารถสมัครสมาชิกได้" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) return res.status(400).json({ ok: false, message: "กรุณากรอกข้อมูลให้ครบ" });

  const user = db.prepare(
    "SELECT * FROM users WHERE email=? OR phone=? LIMIT 1"
  ).get(identifier, identifier);

  if (!user || !user.password_hash || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ ok: false, message: "อีเมล/เบอร์โทร หรือรหัสผ่านไม่ถูกต้อง" });
  }
  if (user.status !== "active") return res.status(403).json({ ok: false, message: "บัญชีถูกระงับ" });

  const safe = {
    id: user.id, name: user.name, email: user.email, phone: user.phone,
    role: user.role, wallet_balance: user.wallet_balance, status: user.status
  };
  res.json({ ok: true, token: signUser(safe), user: safe });
});

app.get("/api/me", auth, (req, res) => {
  const user = db.prepare(
    "SELECT id,name,email,phone,role,wallet_balance,status,created_at FROM users WHERE id=?"
  ).get(req.user.id);
  if (!user) return res.status(404).json({ ok: false, message: "ไม่พบสมาชิก" });
  res.json({ ok: true, user });
});

app.get("/api/products", (req, res) => {
  const { category, search } = req.query;
  let sql = "SELECT * FROM products WHERE active=1";
  const params = [];
  if (category && category !== "ทั้งหมด") { sql += " AND category=?"; params.push(category); }
  if (search) { sql += " AND (name LIKE ? OR description LIKE ?)"; params.push(`%${search}%`, `%${search}%`); }
  sql += " ORDER BY id DESC";
  const products = db.prepare(sql).all(...params);
  res.json({ ok: true, products });
});

app.get("/api/products/:id/packages", (req, res) => {
  const packages = db.prepare(
    "SELECT * FROM packages WHERE product_id=? AND active=1 ORDER BY price ASC"
  ).all(req.params.id);
  res.json({ ok: true, packages });
});

app.post("/api/orders", auth, (req, res) => {
  const { product_id, package_id, target } = req.body;
  if (!product_id || !package_id) {
    return res.status(400).json({ ok: false, message: "กรุณาเลือกสินค้าและแพ็กเกจ" });
  }

  const product = db.prepare("SELECT * FROM products WHERE id=? AND active=1").get(product_id);
  if (!product) return res.status(404).json({ ok: false, message: "ไม่พบสินค้า" });

  const pack = db.prepare("SELECT * FROM packages WHERE id=? AND product_id=? AND active=1").get(package_id, product_id);
  if (!pack) return res.status(404).json({ ok: false, message: "ไม่พบแพ็กเกจ" });

  const user = db.prepare("SELECT id,wallet_balance,status FROM users WHERE id=?").get(req.user.id);
  if (!user || user.status !== "active") return res.status(403).json({ ok: false, message: "บัญชีไม่พร้อมใช้งาน" });
  if (Number(user.wallet_balance) < Number(pack.price)) {
    return res.status(400).json({ ok: false, message: "ยอด Wallet ไม่เพียงพอ", balance: Number(user.wallet_balance), required: Number(pack.price) });
  }

  const orderNo = makeOrderNo();
  const createOrder = db.transaction(() => {
    db.prepare("UPDATE users SET wallet_balance = wallet_balance - ? WHERE id=? AND wallet_balance >= ?")
      .run(Number(pack.price), req.user.id, Number(pack.price));

    const result = db.prepare(`
      INSERT INTO orders (order_no,user_id,product_id,package_id,target,amount,status)
      VALUES (?,?,?,?,?,?,?)
    `).run(orderNo, req.user.id, product_id, package_id, target || "", Number(pack.price), "pending");

    db.prepare(`
      INSERT INTO wallet_transactions (user_id,type,amount,status,reference,note)
      VALUES (?,?,?,?,?,?)
    `).run(req.user.id, "purchase", -Number(pack.price), "approved", orderNo, `ชำระค่าสินค้า ${product.name} / ${pack.name}`);

    return db.prepare("SELECT * FROM orders WHERE id=?").get(result.lastInsertRowid);
  });

  try {
    const order = createOrder();
    const freshUser = db.prepare("SELECT wallet_balance FROM users WHERE id=?").get(req.user.id);
    res.status(201).json({ ok: true, order, wallet_balance: Number(freshUser.wallet_balance) });
  } catch (e) {
    res.status(500).json({ ok: false, message: "ไม่สามารถสร้างคำสั่งซื้อได้" });
  }
});

app.get("/api/orders/my", auth, (req, res) => {
  const orders = db.prepare(`
    SELECT o.*, p.name AS product_name
    FROM orders o JOIN products p ON p.id=o.product_id
    WHERE o.user_id=? ORDER BY o.id DESC
  `).all(req.user.id);
  res.json({ ok: true, orders });
});

app.get("/api/admin/orders", auth, adminOnly, (req, res) => {
  const orders = db.prepare(`
    SELECT o.*, p.name AS product_name, u.name AS customer_name, u.email, u.phone
    FROM orders o
    LEFT JOIN products p ON p.id=o.product_id
    LEFT JOIN users u ON u.id=o.user_id
    ORDER BY o.id DESC
  `).all();
  res.json({ ok: true, orders });
});

app.patch("/api/admin/orders/:id", auth, adminOnly, async (req, res) => {
  const { status, note } = req.body;
  const allowed = ["pending", "processing", "success", "failed", "refunded"];
  if (!allowed.includes(status)) return res.status(400).json({ ok: false, message: "สถานะไม่ถูกต้อง" });

  const order = db.prepare(`
    SELECT o.*, p.name AS product_name, pa.name AS package_name, pa.provider_code
    FROM orders o
    LEFT JOIN products p ON p.id=o.product_id
    LEFT JOIN packages pa ON pa.id=o.package_id
    WHERE o.id=?
  `).get(req.params.id);
  if (!order) return res.status(404).json({ ok: false, message: "ไม่พบคำสั่งซื้อ" });

  try {
    // When Admin moves an order to processing, optionally send it to a configured provider.
    let providerResult = null;
    if (status === "processing" && order.status !== "processing" && order.status !== "success") {
      try {
        providerResult = await sendToProvider(order);
        db.prepare("UPDATE orders SET provider_status=?, note=COALESCE(?,note), updated_at=CURRENT_TIMESTAMP WHERE id=?")
          .run(providerResult.sent ? "sent" : "manual", note || null, req.params.id);
      } catch (providerError) {
        db.prepare("UPDATE orders SET provider_status=?, note=?, updated_at=CURRENT_TIMESTAMP WHERE id=?")
          .run("failed", `Provider error: ${providerError.message}`, req.params.id);
        return res.status(502).json({ ok: false, message: "ส่งคำสั่งไป Provider ไม่สำเร็จ", provider_error: providerError.message });
      }
    }

    const updateOrder = db.transaction(() => {
      db.prepare("UPDATE orders SET status=?, note=COALESCE(?,note), updated_at=CURRENT_TIMESTAMP WHERE id=?")
        .run(status, note || null, req.params.id);

      if ((status === "failed" || status === "refunded") && order.user_id) {
        const ref = `${order.order_no}:REFUND`;
        const exists = db.prepare("SELECT id FROM wallet_transactions WHERE reference=? LIMIT 1").get(ref);
        if (!exists) {
          db.prepare("UPDATE users SET wallet_balance = wallet_balance + ? WHERE id=?")
            .run(Number(order.amount), order.user_id);
          db.prepare(`
            INSERT INTO wallet_transactions (user_id,type,amount,status,reference,note)
            VALUES (?,?,?,?,?,?)
          `).run(order.user_id, "refund", Number(order.amount), "approved", ref, `คืนเงินจากออเดอร์ ${order.order_no}`);
        }
      }
    });

    updateOrder();
    const updated = db.prepare("SELECT * FROM orders WHERE id=?").get(req.params.id);
    res.json({ ok: true, order: updated, provider: providerResult });
  } catch (e) {
    res.status(500).json({ ok: false, message: "ไม่สามารถอัปเดตคำสั่งซื้อได้" });
  }
});

app.get("/api/wallet/promptpay/qr", auth, (req, res) => {
  const amount = Number(req.query.amount || 0);
  if (!PROMPTPAY_ID) return res.status(503).json({ ok:false, configured:false, message:"ยังไม่ได้ตั้งค่า PROMPTPAY_ID ใน Render" });
  if (!Number.isFinite(amount) || amount <= 0) return res.status(400).json({ ok:false, message:"จำนวนเงินไม่ถูกต้อง" });
  try {
    const payload = promptPayPayload(PROMPTPAY_ID, amount);
    res.json({ ok:true, configured:true, amount:Number(amount.toFixed(2)), payload, currency:"THB", merchant:"SAINGAM SHOP" });
  } catch (e) {
    res.status(500).json({ ok:false, message:e.message });
  }
});

app.get("/api/admin/payment/promptpay/status", auth, adminOnly, (req, res) => {
  res.json({ ok:true, configured:Boolean(PROMPTPAY_ID), merchant:"SAINGAM SHOP", message: PROMPTPAY_ID ? "PromptPay QR พร้อมสร้างแล้ว (การตรวจชำระยังเป็นแบบ Manual จนกว่าจะเชื่อม Payment Gateway)" : "ยังไม่ได้ตั้งค่า PROMPTPAY_ID" });
});

app.post("/api/wallet/topup", auth, (req, res) => {
  const { amount, reference } = req.body;
  if (!amount || Number(amount) <= 0) return res.status(400).json({ ok: false, message: "จำนวนเงินไม่ถูกต้อง" });

  const result = db.prepare(`
    INSERT INTO wallet_transactions (user_id,type,amount,status,reference,note)
    VALUES (?,?,?,?,?,?)
  `).run(req.user.id, "topup", Number(amount), "awaiting_payment", reference || "", "รอการชำระเงิน");

  res.status(201).json({
    ok: true,
    transaction: db.prepare("SELECT * FROM wallet_transactions WHERE id=?").get(result.lastInsertRowid)
  });
});

app.post("/api/wallet/topup/:id/paid", auth, (req, res) => {
  const id = Number(req.params.id);
  const tx = db.prepare(
    "SELECT * FROM wallet_transactions WHERE id=? AND user_id=? AND type='topup'"
  ).get(id, req.user.id);
  if (!tx) return res.status(404).json({ ok:false, message:"ไม่พบรายการเติมเงิน" });
  if (tx.status === "pending") {
    return res.json({ ok:true, already_notified:true, message:"รายการนี้แจ้งชำระเงินแล้ว และกำลังรอ Admin ตรวจสอบ", transaction: tx });
  }
  if (tx.status !== "awaiting_payment") {
    return res.status(400).json({ ok:false, message:"รายการนี้ถูกดำเนินการไปแล้ว" });
  }
  const reference = String(req.body?.reference || tx.reference || "").trim();
  db.prepare(
    "UPDATE wallet_transactions SET status=?, reference=?, note=? WHERE id=?"
  ).run("pending", reference, "ลูกค้าแจ้งชำระเงินแล้ว รอ Admin ตรวจสอบยอดเงินจริง", id);
  res.json({
    ok:true,
    message:"แจ้งชำระเงินแล้ว รอ Admin ตรวจสอบยอดเงินจริง",
    transaction: db.prepare("SELECT * FROM wallet_transactions WHERE id=?").get(id)
  });
});

app.get("/api/admin/wallet/pending", auth, adminOnly, (req, res) => {
  const rows = db.prepare(`
    SELECT wt.*, u.name, u.email, u.phone
    FROM wallet_transactions wt
    JOIN users u ON u.id = wt.user_id
    WHERE wt.type = 'topup' AND wt.status = 'pending'
    ORDER BY wt.id DESC
  `).all();
  res.json(rows);
});

app.patch("/api/admin/wallet/:id", auth, adminOnly, (req, res) => {
  const id = Number(req.params.id);
  const status = String(req.body.status || '').toLowerCase();
  if (!['success','failed'].includes(status)) return res.status(400).json({message:'สถานะไม่ถูกต้อง'});
  const tx = db.prepare("SELECT * FROM wallet_transactions WHERE id=? AND type='topup'").get(id);
  if (!tx) return res.status(404).json({message:'ไม่พบรายการเติมเงิน'});
  if (tx.status !== 'pending') return res.status(400).json({message:'รายการนี้ถูกดำเนินการแล้ว'});
  const run = db.transaction(() => {
    db.prepare("UPDATE wallet_transactions SET status=? WHERE id=?").run(status, id);
    if (status === 'success') {
      db.prepare("UPDATE users SET wallet_balance = wallet_balance + ? WHERE id=?").run(tx.amount, tx.user_id);
    }
  });
  run();
  res.json({ok:true, status, transaction: db.prepare("SELECT * FROM wallet_transactions WHERE id=?").get(id)});
});

app.get("/api/wallet/history", auth, (req, res) => {
  const rows = db.prepare(
    "SELECT * FROM wallet_transactions WHERE user_id=? ORDER BY id DESC"
  ).all(req.user.id);
  res.json({ ok: true, transactions: rows });
});

app.get("/api/admin/users", auth, adminOnly, (req, res) => {
  const users = db.prepare(
    "SELECT id,name,email,phone,role,wallet_balance,status,created_at FROM users ORDER BY id DESC"
  ).all();
  res.json({ ok: true, users });
});

app.get("/api/admin/dashboard", auth, adminOnly, (req, res) => {
  const sales = db.prepare(
    "SELECT COALESCE(SUM(amount),0) AS total FROM orders WHERE status='success'"
  ).get().total;
  const orders = db.prepare("SELECT COUNT(*) AS total FROM orders").get().total;
  const pending = db.prepare(
    "SELECT COUNT(*) AS total FROM orders WHERE status IN ('pending','processing')"
  ).get().total;
  const users = db.prepare("SELECT COUNT(*) AS total FROM users").get().total;

  res.json({
    ok: true,
    dashboard: { sales, orders, pending, users }
  });
});

app.post("/api/admin/seed-admin", async (req, res) => {
  const email = process.env.ADMIN_EMAIL || "admin@saingamshop.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeThisPassword123!";
  const exists = db.prepare("SELECT id FROM users WHERE email=?").get(email);
  if (exists) return res.json({ ok: true, message: "Admin มีอยู่แล้ว" });

  const hash = await bcrypt.hash(password, 12);
  db.prepare(`
    INSERT INTO users (name,email,password_hash,role)
    VALUES (?,?,?,'super_admin')
  `).run("Super Admin", email, hash);

  res.json({ ok: true, message: "สร้าง Super Admin แล้ว", email });
});

// Auto-create the configured Admin account on startup if it does not exist.
async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  const exists = db.prepare("SELECT id FROM users WHERE email=?").get(email);
  if (exists) return;
  const hash = await bcrypt.hash(password, 12);
  db.prepare(`INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,'super_admin')`).run("Super Admin", email, hash);
  console.log(`Admin account initialized for ${email}`);
}

ensureAdmin().catch(err => console.error("Admin initialization failed:", err));

app.get("/api/admin/provider/status", auth, adminOnly, (req, res) => {
  res.json({
    ok: true,
    mode: PROVIDER_MODE,
    configured: Boolean(PROVIDER_API_URL && PROVIDER_API_KEY),
    message: (PROVIDER_MODE === "http" && PROVIDER_API_URL && PROVIDER_API_KEY)
      ? "Provider API ถูกตั้งค่าแล้ว"
      : "ยังอยู่ในโหมด Manual — ยังไม่มีการส่งคำสั่งไปผู้ให้บริการจริง"
  });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, message: "ไม่พบ API นี้" });
});

app.listen(PORT, () => {
  console.log(`Saingam Shop API running on port ${PORT}`);
});
