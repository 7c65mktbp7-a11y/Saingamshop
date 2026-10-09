require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Database = require("better-sqlite3");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || "saingam-shop-development-secret";

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
  const productId = Number(req.body.product_id ?? req.body.productId);
  const packageId = Number(req.body.package_id ?? req.body.packageId);
  const target = String(req.body.target ?? "").trim();
  if (!Number.isInteger(productId) || productId <= 0 || !Number.isInteger(packageId) || packageId <= 0 || !target) {
    return res.status(400).json({ ok: false, message: "กรุณาเลือกสินค้า/แพ็กเกจและกรอกข้อมูลผู้รับให้ครบ" });
  }
  const product = db.prepare("SELECT * FROM products WHERE id=? AND active=1").get(productId);
  if (!product) return res.status(404).json({ ok: false, message: "ไม่พบสินค้าหรือสินค้าปิดใช้งาน" });
  const pack = db.prepare("SELECT * FROM packages WHERE id=? AND product_id=? AND active=1").get(packageId, productId);
  if (!pack) return res.status(404).json({ ok: false, message: "ไม่พบแพ็กเกจหรือแพ็กเกจปิดใช้งาน" });

  // Debit wallet and create order in one SQLite transaction; never trust the browser's price.
  const amount = Number(pack.price);
  if (!Number.isFinite(amount) || amount <= 0) return res.status(400).json({ ok: false, message: "ราคาสินค้าไม่ถูกต้อง" });
  const createOrder = db.transaction(() => {
    const user = db.prepare("SELECT id,wallet_balance,status FROM users WHERE id=?").get(req.user.id);
    if (!user || user.status !== "active") throw new Error("ACCOUNT_NOT_ACTIVE");
    if (Number(user.wallet_balance) < amount) throw new Error("INSUFFICIENT_WALLET");
    db.prepare("UPDATE users SET wallet_balance=wallet_balance-? WHERE id=? AND wallet_balance>=?").run(amount, req.user.id, amount);
    const orderNo = makeOrderNo();
    const result = db.prepare(`INSERT INTO orders (order_no,user_id,product_id,package_id,target,amount,status,note)
      VALUES (?,?,?,?,?,?,?,?)`).run(orderNo, req.user.id, productId, packageId, target, amount, "pending", "หัก Wallet แล้ว; รอระบบร้าน/ผู้ให้บริการดำเนินการ");
    db.prepare(`INSERT INTO wallet_transactions (user_id,type,amount,status,reference,note)
      VALUES (?,?,?,?,?,?)`).run(req.user.id, "purchase", -amount, "success", orderNo, `ซื้อ ${product.name} / ${pack.name}`);
    return { order: db.prepare("SELECT * FROM orders WHERE id=?").get(result.lastInsertRowid),
      wallet_balance: db.prepare("SELECT wallet_balance FROM users WHERE id=?").get(req.user.id).wallet_balance };
  });
  try {
    const result = createOrder();
    res.status(201).json({ ok: true, ...result, message: "รับคำสั่งซื้อแล้ว หัก Wallet แล้ว และรอการดำเนินการ" });
  } catch (e) {
    if (e.message === "INSUFFICIENT_WALLET") return res.status(400).json({ ok: false, message: "ยอด Wallet ไม่เพียงพอ กรุณาเติมเงินก่อน" });
    if (e.message === "ACCOUNT_NOT_ACTIVE") return res.status(403).json({ ok: false, message: "บัญชีไม่พร้อมใช้งาน" });
    console.error("Create order failed:", e);
    return res.status(500).json({ ok: false, message: "สร้างคำสั่งซื้อไม่สำเร็จ กรุณาลองใหม่" });
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

app.patch("/api/admin/orders/:id", auth, adminOnly, (req, res) => {
  const { status, note } = req.body;
  const allowed = ["pending", "processing", "success", "failed", "refunded"];
  if (!allowed.includes(status)) return res.status(400).json({ ok: false, message: "สถานะไม่ถูกต้อง" });
  const updateOrder = db.transaction(() => {
    const before = db.prepare("SELECT * FROM orders WHERE id=?").get(req.params.id);
    if (!before) throw new Error("ORDER_NOT_FOUND");
    // If an order is failed/refunded, return its debit once only. The order number is the idempotency key.
    if (["failed", "refunded"].includes(status) && !["failed", "refunded"].includes(before.status)) {
      const existing = db.prepare("SELECT id FROM wallet_transactions WHERE type='refund' AND reference=?").get(before.order_no);
      if (!existing && before.user_id) {
        db.prepare("UPDATE users SET wallet_balance=wallet_balance+? WHERE id=?").run(Number(before.amount), before.user_id);
        db.prepare(`INSERT INTO wallet_transactions (user_id,type,amount,status,reference,note)
          VALUES (?,?,?,?,?,?)`).run(before.user_id, "refund", Number(before.amount), "success", before.order_no, "คืน Wallet จากออเดอร์ที่ไม่สำเร็จ");
      }
    }
    db.prepare("UPDATE orders SET status=?, note=COALESCE(?,note), updated_at=CURRENT_TIMESTAMP WHERE id=?")
      .run(status, note || null, req.params.id);
    return db.prepare("SELECT * FROM orders WHERE id=?").get(req.params.id);
  });
  try {
    const order = updateOrder();
    if (!order) return res.status(404).json({ ok: false, message: "ไม่พบคำสั่งซื้อ" });
    res.json({ ok: true, order });
  } catch (e) {
    if (e.message === "ORDER_NOT_FOUND") return res.status(404).json({ ok: false, message: "ไม่พบคำสั่งซื้อ" });
    console.error("Update order failed:", e);
    res.status(500).json({ ok: false, message: "อัปเดตสถานะคำสั่งซื้อไม่สำเร็จ" });
  }
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

app.listen(PORT, () => {
  console.log(`Saingam Shop API running on port ${PORT}`);
});
