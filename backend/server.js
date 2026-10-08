require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Database = require("better-sqlite3");
const QRCode = require("qrcode");
const generatePromptPayPayload = require("promptpay-qr");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || "saingam-shop-development-secret";
const PROMPTPAY_ID = (process.env.PROMPTPAY_ID || "").trim();
const PROMPTPAY_NAME = (process.env.PROMPTPAY_NAME || "SAINGAM SHOP").trim();
const PAYMENT_WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET || "";

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
  const { product_id, package_id, target, amount } = req.body;
  if (!product_id || !amount || Number(amount) <= 0) {
    return res.status(400).json({ ok: false, message: "ข้อมูลคำสั่งซื้อไม่ครบ" });
  }

  const product = db.prepare("SELECT * FROM products WHERE id=? AND active=1").get(product_id);
  if (!product) return res.status(404).json({ ok: false, message: "ไม่พบสินค้า" });

  const orderNo = makeOrderNo();
  const result = db.prepare(`
    INSERT INTO orders
    (order_no,user_id,product_id,package_id,target,amount,status)
    VALUES (?,?,?,?,?,?,?)
  `).run(orderNo, req.user.id, product_id, package_id || null, target || "", Number(amount), "pending");

  const order = db.prepare("SELECT * FROM orders WHERE id=?").get(result.lastInsertRowid);
  res.status(201).json({ ok: true, order });
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

app.patch("/api/admin/orders/:id", auth, adminOnly, (req, res) => {
  const { status, note } = req.body;
  const allowed = ["pending", "processing", "success", "failed", "refunded"];
  if (!allowed.includes(status)) return res.status(400).json({ ok: false, message: "สถานะไม่ถูกต้อง" });

  db.prepare(
    "UPDATE orders SET status=?, note=COALESCE(?,note), updated_at=CURRENT_TIMESTAMP WHERE id=?"
  ).run(status, note || null, req.params.id);

  const order = db.prepare("SELECT * FROM orders WHERE id=?").get(req.params.id);
  res.json({ ok: true, order });
});

app.post("/api/wallet/topup", auth, (req, res) => {
  const { amount, reference } = req.body;
  if (!amount || Number(amount) <= 0) return res.status(400).json({ ok: false, message: "จำนวนเงินไม่ถูกต้อง" });

  const result = db.prepare(`
    INSERT INTO wallet_transactions (user_id,type,amount,status,reference,note)
    VALUES (?,?,?,?,?,?)
  `).run(req.user.id, "topup", Number(amount), "pending", reference || "", "รอการตรวจสอบ/Payment Gateway");

  res.status(201).json({
    ok: true,
    transaction: db.prepare("SELECT * FROM wallet_transactions WHERE id=?").get(result.lastInsertRowid)
  });
});

app.get("/api/wallet/history", auth, (req, res) => {
  const rows = db.prepare(
    "SELECT * FROM wallet_transactions WHERE user_id=? ORDER BY id DESC"
  ).all(req.user.id);
  res.json({ ok: true, transactions: rows });
});

function makePaymentRef() {
  const now = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `PP${now}${rand}`;
}

app.post("/api/wallet/payment/create", auth, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ ok: false, message: "จำนวนเงินไม่ถูกต้อง" });
    }
    if (!PROMPTPAY_ID) {
      return res.status(503).json({
        ok: false,
        message: "ยังไม่ได้ตั้งค่า PROMPTPAY_ID ใน Render Environment"
      });
    }

    const paymentRef = makePaymentRef();
    const payload = generatePromptPayPayload(PROMPTPAY_ID, { amount });
    const qrDataUrl = await QRCode.toDataURL(payload, {
      width: 520,
      margin: 2,
      errorCorrectionLevel: "M"
    });

    const result = db.prepare(`
      INSERT INTO wallet_transactions
      (user_id,type,amount,status,reference,note,gateway,payment_ref,qr_payload)
      VALUES (?,?,?,?,?,?,?,?,?)
    `).run(
      req.user.id,
      "topup",
      amount,
      "pending",
      paymentRef,
      "PromptPay QR รอการตรวจสอบการชำระเงิน",
      "promptpay",
      paymentRef,
      payload
    );

    const transaction = db.prepare(
      "SELECT id,user_id,type,amount,status,reference,note,gateway,payment_ref,created_at,paid_at FROM wallet_transactions WHERE id=?"
    ).get(result.lastInsertRowid);

    res.status(201).json({
      ok: true,
      transaction,
      payment: {
        gateway: "promptpay",
        amount,
        promptpay_id: PROMPTPAY_ID,
        merchant_name: PROMPTPAY_NAME,
        payment_ref: paymentRef,
        qr_data_url: qrDataUrl,
        instructions: "สแกน QR นี้ด้วยแอปธนาคาร แล้วกลับมากดตรวจสอบสถานะ"
      }
    });
  } catch (e) {
    console.error("PromptPay create error:", e);
    res.status(500).json({ ok: false, message: "สร้าง QR PromptPay ไม่สำเร็จ" });
  }
});

app.get("/api/wallet/payment/:id", auth, (req, res) => {
  const transaction = db.prepare(`
    SELECT id,user_id,type,amount,status,reference,note,gateway,payment_ref,created_at,paid_at
    FROM wallet_transactions
    WHERE id=? AND user_id=?
  `).get(req.params.id, req.user.id);

  if (!transaction) return res.status(404).json({ ok: false, message: "ไม่พบรายการเติมเงิน" });
  res.json({ ok: true, transaction });
});

// Manual approval is for testing/admin operation until a real payment gateway webhook is connected.
app.patch("/api/admin/wallet/:id/approve", auth, adminOnly, (req, res) => {
  const tx = db.prepare("SELECT * FROM wallet_transactions WHERE id=?").get(req.params.id);
  if (!tx) return res.status(404).json({ ok: false, message: "ไม่พบรายการเติมเงิน" });
  if (tx.status === "success") {
    return res.json({ ok: true, message: "รายการนี้อนุมัติแล้ว", transaction: tx });
  }
  if (tx.status !== "pending") {
    return res.status(400).json({ ok: false, message: "รายการนี้ไม่อยู่ในสถานะรอตรวจสอบ" });
  }

  const approve = db.transaction(() => {
    db.prepare(`
      UPDATE wallet_transactions
      SET status='success', paid_at=CURRENT_TIMESTAMP, approved_by=?, note='PromptPay อนุมัติโดยแอดมิน'
      WHERE id=?
    `).run(req.user.id, tx.id);

    db.prepare(`
      UPDATE users
      SET wallet_balance = wallet_balance + ?
      WHERE id=?
    `).run(Number(tx.amount), tx.user_id);
  });
  approve();

  const transaction = db.prepare("SELECT * FROM wallet_transactions WHERE id=?").get(tx.id);
  const user = db.prepare("SELECT id,name,email,phone,wallet_balance FROM users WHERE id=?").get(tx.user_id);
  res.json({ ok: true, message: "อนุมัติเติมเงินแล้ว", transaction, user });
});

app.patch("/api/admin/wallet/:id/reject", auth, adminOnly, (req, res) => {
  const tx = db.prepare("SELECT * FROM wallet_transactions WHERE id=?").get(req.params.id);
  if (!tx) return res.status(404).json({ ok: false, message: "ไม่พบรายการเติมเงิน" });
  if (tx.status !== "pending") {
    return res.status(400).json({ ok: false, message: "รายการนี้ไม่อยู่ในสถานะรอตรวจสอบ" });
  }

  db.prepare(`
    UPDATE wallet_transactions
    SET status='failed', note='PromptPay รายการถูกปฏิเสธโดยแอดมิน'
    WHERE id=?
  `).run(tx.id);

  res.json({
    ok: true,
    message: "ปฏิเสธรายการเติมเงินแล้ว",
    transaction: db.prepare("SELECT * FROM wallet_transactions WHERE id=?").get(tx.id)
  });
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

app.use((req, res) => {
  res.status(404).json({ ok: false, message: "ไม่พบ API นี้" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Saingam Shop API running on port ${PORT}`);
});
