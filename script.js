"use strict";

/* ==========================================
   1. ตั้งค่าร้านและ SUPABASE
========================================== */

const SHOP = {
  line: "https://lin.ee/9q139qW",
  facebook: "https://www.facebook.com/share/1MwmyTJfCb/?mibextid=wwXIfr",
  phone: "0843123861"
};

const SUPABASE_URL = "https://wljlcelgfthzyyuxvegn.supabase.co";

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsamxjZWxnZnRoenl5dXh2ZWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDc0NzQsImV4cCI6MjEwNjg4MzQ3NH0.dymqAwYWp2YX54673-4R69fvLU9ujdmUXdi_LIvIKjM */
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsamxjZWxnZnRoenl5dXh2ZWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDc0NzQsImV4cCI6MjEwNjg4MzQ3NH0.dymqAwYWp2YX54673-4R69fvLU9ujdmUXdi_LIvIKjM";

let supabaseClient = null;
let supabaseReady = false;
let currentOrder = null;
let currentService = "เติมเกม / เติมเพชร";

const GAMES = [
  { name: "ROV", icon: "⚔️", description: "เติมคูปอง / เกม MOBA" },
  { name: "Free Fire", icon: "🔥", description: "เติมเพชร" },
  { name: "PUBG Mobile", icon: "🎯", description: "UC และบริการเกม" },
  { name: "Mobile Legends", icon: "🛡️", description: "Diamond" },
  { name: "Genshin Impact", icon: "🌟", description: "บริการเกม" },
  { name: "Honkai: Star Rail", icon: "🚄", description: "บริการเกม" },
  { name: "Ragnarok", icon: "🧙", description: "บริการเกม" },
  { name: "Wuthering Waves", icon: "🌊", description: "บริการเกม" },
  { name: "Heartopia", icon: "🏡", description: "บริการเกม" },
  { name: "Rainbow Six Mobile", icon: "🎮", description: "บริการเกม" },
  { name: "MONGIL: STAR DIVE", icon: "💎", description: "บริการเกม" },
  { name: "Kuroko Basketball", icon: "🏀", description: "บริการเกม" },
  { name: "Gangstar Mirage City", icon: "🚘", description: "บริการเกม" },
  { name: "Aniimo", icon: "🐾", description: "บริการเกม" }
];

/* ==========================================
   2. ฟังก์ชันทั่วไป
========================================== */

function $(id) {
  return document.getElementById(id);
}

function setMessage(id, message, type = "") {
  const element = $(id);
  if (!element) return;
  element.textContent = message;
  element.className = "form-message" + (type ? " " + type : "");
}

function setBusy(buttonId, busy, busyText, normalText) {
  const button = $(buttonId);
  if (!button) return;
  button.disabled = busy;
  button.textContent = busy ? busyText : normalText;
}

function openModal(id) {
  const modal = $(id);
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeModal(id) {
  const modal = $(id);
  if (!modal) return;
  modal.hidden = true;

  if (!document.querySelector(".modal:not([hidden])")) {
    document.body.classList.remove("modal-open");
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.hidden = true;
  });
  document.body.classList.remove("modal-open");
}

function friendlyError(error) {
  const message = String(error?.message || "");

  if (/Invalid login credentials/i.test(message)) {
    return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
  }
  if (/Email not confirmed/i.test(message)) {
    return "กรุณาเปิดอีเมลและกดยืนยันบัญชีก่อนเข้าสู่ระบบ";
  }
  if (/User already registered/i.test(message)) {
    return "อีเมลนี้สมัครสมาชิกแล้ว กรุณาเข้าสู่ระบบ";
  }
  if (/Password should be at least/i.test(message)) {
    return "รหัสผ่านสั้นเกินไป กรุณาตรวจสอบอีกครั้ง";
  }
  if (/rate limit/i.test(message)) {
    return "คุณลองทำรายการหลายครั้งเกินไป กรุณารอสักครู่";
  }

  return message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

/* ==========================================
   3. เริ่มต้น SUPABASE
========================================== */

function initSupabase() {
  if (!window.supabase?.createClient) {
    console.error("ไม่พบ Supabase SDK");
    return;
  }

  if (
    !SUPABASE_ANON_KEY ||
    SUPABASE_ANON_KEY === "ใส่_SUPABASE_ANON_PUBLIC_KEY_ของคุณตรงนี้"
  ) {
    console.warn("กรุณาใส่ Supabase anon/public key ก่อนใช้ระบบสมาชิก");
    return;
  }

  try {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
    supabaseReady = true;

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      updateMemberUI(session?.user || null);
    });

    supabaseClient.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("ตรวจสอบ session ไม่สำเร็จ:", error.message);
        return;
      }
      updateMemberUI(data.session?.user || null);
    });
  } catch (error) {
    console.error("เริ่มต้น Supabase ไม่สำเร็จ:", error);
  }
}

function requireSupabase() {
  if (supabaseReady && supabaseClient) return true;

  alert("ระบบสมาชิกยังไม่พร้อม กรุณาตรวจสอบ Supabase URL และ anon/public key ใน script.js");
  return false;
}

/* ==========================================
   4. แสดงเกมและค้นหาเกม
========================================== */

function renderGames(searchText = "") {
  const grid = $("gameGrid");
  if (!grid) return;

  const query = searchText.trim().toLowerCase();
  const filtered = GAMES.filter(game =>
    game.name.toLowerCase().includes(query)
  );

  grid.innerHTML = filtered.map(game => `
    <button class="game-card" type="button"
      data-game="${escapeHtml(game.name)}">
      <span class="game-icon">${game.icon}</span>
      <strong>${escapeHtml(game.name)}</strong>
      <small>${escapeHtml(game.description)}</small>
      <span class="text-link">เลือกเกม →</span>
    </button>
  `).join("");

  if ($("gameEmpty")) {
    $("gameEmpty").hidden = filtered.length > 0;
  }
}

/* ==========================================
   5. ระบบสมาชิก
========================================== */

function getUsername(user) {
  return user?.user_metadata?.username ||
    user?.email?.split("@")[0] ||
    "สมาชิก";
}

function updateMemberUI(user) {
  const guest = $("memberGuest");
  const loggedIn = $("memberLoggedIn");

  if (!guest || !loggedIn) return;

  guest.hidden = Boolean(user);
  loggedIn.hidden = !user;

  if (user) {
    $("memberUsername").textContent = getUsername(user);
    $("memberEmail").textContent = user.email || "";
  } else {
    $("memberUsername").textContent = "";
    $("memberEmail").textContent = "";
  }
}

function openRegister() {
  setMessage("registerMessage", "");
  $("registerForm")?.reset();
  closeModal("loginModal");
  openModal("registerModal");
}

function openLogin() {
  setMessage("loginMessage", "");
  $("loginForm")?.reset();
  closeModal("registerModal");
  openModal("loginModal");
}

async function registerMember(event) {
  event.preventDefault();
  if (!requireSupabase()) return;

  const username = $("registerUsername").value.trim();
  const email = $("registerEmail").value.trim();
  const password = $("registerPassword").value;
  const confirmPassword = $("registerPasswordConfirm").value;

  if (!/^[A-Za-z0-9_]{3,24}$/.test(username)) {
    setMessage("registerMessage",
      "ชื่อผู้ใช้ต้องมี 3–24 ตัว ใช้ภาษาอังกฤษ ตัวเลข หรือ _ เท่านั้น",
      "error");
    return;
  }

  if (password.length < 6) {
    setMessage("registerMessage", "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร", "error");
    return;
  }

  if (password !== confirmPassword) {
    setMessage("registerMessage", "รหัสผ่านทั้งสองช่องไม่ตรงกัน", "error");
    return;
  }

  setBusy("registerSubmit", true, "กำลังสมัคร...", "สร้างบัญชี");
  setMessage("registerMessage", "กำลังสร้างบัญชี กรุณารอสักครู่");

  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: window.location.origin + window.location.pathname
      }
    });

    if (error) throw error;

    if (data.session?.user) {
      updateMemberUI(data.session.user);
      setMessage("memberStatus", "สมัครสมาชิกสำเร็จแล้ว", "success");
      closeModal("registerModal");
    } else {
      setMessage(
        "registerMessage",
        "สร้างบัญชีแล้ว กรุณาตรวจสอบอีเมลและกดยืนยันบัญชี จากนั้นกลับมาเข้าสู่ระบบ",
        "success"
      );
    }
  } catch (error) {
    setMessage("registerMessage", friendlyError(error), "error");
  } finally {
    setBusy("registerSubmit", false, "กำลังสมัคร...", "สร้างบัญชี");
  }
}

async function loginMember(event) {
  event.preventDefault();
  if (!requireSupabase()) return;

  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;

  setBusy("loginSubmit", true, "กำลังเข้าสู่ระบบ...", "เข้าสู่ระบบ");
  setMessage("loginMessage", "กำลังตรวจสอบบัญชี");

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    updateMemberUI(data.user);
    setMessage("memberStatus", "เข้าสู่ระบบสำเร็จ ยินดีต้อนรับครับ", "success");
    closeModal("loginModal");
    $("loginForm").reset();
  } catch (error) {
    setMessage("loginMessage", friendlyError(error), "error");
  } finally {
    setBusy("loginSubmit", false, "กำลังเข้าสู่ระบบ...", "เข้าสู่ระบบ");
  }
}

async function logoutMember() {
  if (!requireSupabase()) return;

  const button = $("logoutButton");
  button.disabled = true;

  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;

    updateMemberUI(null);
    setMessage("memberStatus", "ออกจากระบบแล้ว", "success");
  } catch (error) {
    setMessage("memberStatus", friendlyError(error), "error");
  } finally {
    button.disabled = false;
  }
}

/* ==========================================
   6. ระบบเปิดแบบฟอร์มสั่งซื้อ
========================================== */

function openOrder(service) {
  currentService = service || "เติมเกม / เติมเพชร";

  $("orderTitle").textContent = "สั่งซื้อ: " + currentService;
  $("packageInput").value = currentService;
  $("gameId").value = "";
  $("orderNote").value = "";
  $("orderAmount").value = "";
  setMessage("orderMessage", "");
  openModal("orderModal");
}

function closeOrder() {
  closeModal("orderModal");
}

function generateOrderNumber() {
  const date = new Date();
  const datePart =
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");

  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `SG-${datePart}-${randomPart}`;
}

/* ==========================================
   7. สร้างออเดอร์และบันทึก SUPABASE
========================================== */

async function createOrder(event) {
  event.preventDefault();

  const customerName = $("customerName").value.trim();
  const customerPhone = $("customerPhone").value.trim();
  const gameId = $("gameId").value.trim();
  const packageName = $("packageInput").value.trim();
  const note = $("orderNote").value.trim();
  const rawAmount = $("orderAmount").value.trim();
  const amount = rawAmount === "" ? null : Number(rawAmount);

  if (!customerName || !customerPhone || !gameId || !packageName) {
    setMessage("orderMessage", "กรุณากรอกข้อมูลที่จำเป็นให้ครบ", "error");
    return;
  }

  if (amount !== null && (!Number.isFinite(amount) || amount < 0 || amount > 1000000)) {
    setMessage("orderMessage", "กรุณาตรวจสอบราคาอีกครั้ง", "error");
    return;
  }

  setBusy("orderSubmit", true, "กำลังสร้างออเดอร์...", "สร้างออเดอร์");
  setMessage("orderMessage", "กำลังบันทึกรายการ กรุณารอสักครู่");

  try {
    let user = null;

    if (supabaseReady && supabaseClient) {
      const { data } = await supabaseClient.auth.getUser();
      user = data?.user || null;
    }

    const order = {
      order_number: generateOrderNumber(),
      auth_user_id: user?.id || null,
      customer_name: customerName,
      customer_phone: customerPhone,
      game_name: currentService,
      game_id: gameId,
      package_name: packageName,
      amount,
      note,
      status: "pending"
    };

    if (supabaseReady && supabaseClient) {
      const { data, error } = await supabaseClient
        .from("orders")
        .insert(order)
        .select("order_number")
        .single();

      if (error) {
        console.error("บันทึกออเดอร์ไม่สำเร็จ:", error.message);
        setMessage(
          "ยังบันทึกลงฐานข้อมูลไม่ได้ กรุณาตรวจสอบการตั้งค่า Supabase แล้วลองใหม่",
          "error"
        );
        return;
      }

      order.order_number = data.order_number;
    } else {
      setMessage("ระบบฐานข้อมูลยังไม่พร้อม กรุณาตรวจสอบการตั้งค่า", "error");
      return;
    }

    currentOrder = order;

    $("resultOrderNumber").textContent = order.order_number;
    $("resultDetails").textContent =
      `${order.game_name} · ${order.package_name}`;

    closeModal("orderModal");
    openModal("resultModal");
    $("orderForm").reset();
  } catch (error) {
    console.error(error);
    setMessage("สร้างออเดอร์ไม่สำเร็จ กรุณาลองใหม่", "error");
  } finally {
    setBusy("orderSubmit", false, "กำลังสร้างออเดอร์...", "สร้างออเดอร์");
  }
}

/* ==========================================
   8. ส่งรายละเอียดไป LINE
========================================== */

function makeOrderMessage(order) {
  return [
    "สวัสดีครับ ต้องการแจ้งออเดอร์ SAINGAM SHOP",
    `เลขออเดอร์: ${order.order_number}`,
    `ชื่อผู้ติดต่อ: ${order.customer_name}`,
    `เบอร์โทร: ${order.customer_phone}`,
    `บริการ: ${order.game_name}`,
    `UID / ID / เบอร์มือถือ: ${order.game_id}`,
    `แพ็กเกจ: ${order.package_name}`,
    `ราคา: ${order.amount === null ? "รอร้านยืนยัน" : order.amount + " บาท"}`,
    `หมายเหตุ: ${order.note || "-"}`,
    "สถานะ: รอร้านตรวจสอบและยืนยัน"
  ].join("\n");
}

function sendOrderToLine() {
  if (!currentOrder) return;

  const message = makeOrderMessage(currentOrder);
  const url = "https://line.me/R/msg/text/?" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

async function copyOrderNumber() {
  if (!currentOrder) return;

  try {
    await navigator.clipboard.writeText(currentOrder.order_number);
    $("copyOrderButton").textContent = "คัดลอกแล้ว ✓";
  } catch {
    const temp = document.createElement("textarea");
    temp.value = currentOrder.order_number;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    $("copyOrderButton").textContent = "คัดลอกแล้ว ✓";
  }
}

/* ==========================================
   9. ลิงก์ติดต่อร้าน
========================================== */

function updateContactLinks() {
  const lineLink = $("lineLink");
  const facebookLink = $("facebookLink");

  if (lineLink) lineLink.href = SHOP.line;
  if (facebookLink) facebookLink.href = SHOP.facebook;

  document.querySelectorAll(".phone-button").forEach(link => {
    link.href = "tel:" + SHOP.phone;
  });
}

/* ==========================================
   10. เริ่มต้นและผูกปุ่มทั้งหมด
========================================== */

function initWebsite() {
  initSupabase();
  renderGames();
  updateContactLinks();

  if ($("currentYear")) {
    $("currentYear").textContent = new Date().getFullYear();
  }

  $("gameSearch")?.addEventListener("input", event => {
    renderGames(event.target.value);
  });

  $("gameGrid")?.addEventListener("click", event => {
    const button = event.target.closest("[data-game]");
    if (button) openOrder(button.dataset.game);
  });

  document.querySelectorAll("[data-service]").forEach(button => {
    button.addEventListener("click", () => openOrder(button.dataset.service));
  });

  $("askLineButton")?.addEventListener("click", () => {
    window.open(SHOP.line, "_blank", "noopener,noreferrer");
  });

  $("menuToggle")?.addEventListener("click", () => {
    $("navLinks")?.classList.toggle("open");
  });

  $("navLinks")?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      $("navLinks")?.classList.remove("open");
    });
  });

  $("openRegisterButton")?.addEventListener("click", openRegister);
  $("openLoginButton")?.addEventListener("click", openLogin);
  $("switchToLogin")?.addEventListener("click", openLogin);
  $("switchToRegister")?.addEventListener("click", openRegister);

  $("registerForm")?.addEventListener("submit", registerMember);
  $("loginForm")?.addEventListener("submit", loginMember);
  $("logoutButton")?.addEventListener("click", logoutMember);

  $("orderForm")?.addEventListener("submit", createOrder);
  $("closeOrderButton")?.addEventListener("click", closeOrder);

  $("sendOrderLineButton")?.addEventListener("click", sendOrderToLine);
  $("copyOrderButton")?.addEventListener("click", copyOrderNumber);

  document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", () => closeModal(button.dataset.closeModal));
  });

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
      if (event.target === modal) closeModal(modal.id);
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeAllModals();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWebsite);
} else {
  initWebsite();
}
