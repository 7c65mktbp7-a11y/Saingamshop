/* =========================================================
   SAINGAM SHOP - MAIN JAVASCRIPT
========================================================= */

const SUPABASE_URL = "https://wljlcelgfthzyyuxvegn.supabase.co";

/*
  สำคัญ:
  ให้ใส่ Supabase ANON/PUBLIC KEY ของคุณตรงนี้
  ห้ามใส่ service_role key
*/
const SUPABASE_ANON_KEY = "ใส่_ANON_PUBLIC_KEY_ของคุณตรงนี้";

let supabaseClient = null;

if (window.supabase && SUPABASE_ANON_KEY !== "ใส่_ANON_PUBLIC_KEY_ของคุณตรงนี้") {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
}

const SHOP = {
    name: "SAINGAM SHOP",
    line: "https://lin.ee/9q139qW",
    facebook: "https://www.facebook.com/share/1MwmyTJfCb/?mibextid=wwXIfr",
    phone: "0843123861"
};

const PRODUCTS = {
    games: [
        {id:"rov",name:"ROV",icon:"🎮",description:"เติมคูปองเกม ROV",type:"game",dataLabel:"UID / Player ID",products:[
            {id:"rov-1",name:"แพ็กเกจ ROV 1",price:35,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"rov-2",name:"แพ็กเกจ ROV 2",price:60,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"rov-3",name:"แพ็กเกจ ROV 3",price:110,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"freefire",name:"Free Fire",icon:"🔥",description:"เติมเพชร Free Fire",type:"game",dataLabel:"UID",products:[
            {id:"ff-1",name:"แพ็กเกจ Free Fire 1",price:35,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"ff-2",name:"แพ็กเกจ Free Fire 2",price:69,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"pubg",name:"PUBG Mobile",icon:"🔫",description:"เติม UC PUBG Mobile",type:"game",dataLabel:"Character ID",products:[
            {id:"pubg-1",name:"แพ็กเกจ PUBG 1",price:45,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"pubg-2",name:"แพ็กเกจ PUBG 2",price:95,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"mlbb",name:"Mobile Legends",icon:"⚔️",description:"เติมเพชร Mobile Legends",type:"game",dataLabel:"User ID",products:[
            {id:"ml-1",name:"แพ็กเกจ MLBB 1",price:35,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"ml-2",name:"แพ็กเกจ MLBB 2",price:75,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"genshin",name:"Genshin Impact",icon:"✨",description:"เติม Genesis Crystals",type:"game",dataLabel:"UID",products:[
            {id:"gen-1",name:"แพ็กเกจ Genshin 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"hsr",name:"Honkai: Star Rail",icon:"🚂",description:"เติม Oneiric Shard",type:"game",dataLabel:"UID",products:[
            {id:"hsr-1",name:"แพ็กเกจ HSR 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"ragnarok",name:"Ragnarok",icon:"🪽",description:"บริการเติมเกม Ragnarok",type:"game",dataLabel:"ข้อมูลไอดี/เซิร์ฟเวอร์",products:[
            {id:"rag-1",name:"แพ็กเกจ Ragnarok 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"wuwa",name:"Wuthering Waves",icon:"🌊",description:"เติม Lunite",type:"game",dataLabel:"UID",products:[
            {id:"wuwa-1",name:"แพ็กเกจ Wuthering Waves 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"heartopia",name:"Heartopia",icon:"💖",description:"บริการ Heartopia",type:"game",dataLabel:"ข้อมูลเกม",products:[
            {id:"heart-1",name:"แพ็กเกจ Heartopia 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"rainbowsix",name:"Rainbow Six Mobile",icon:"🎯",description:"บริการ Rainbow Six Mobile",type:"game",dataLabel:"ข้อมูลเกม",products:[
            {id:"r6-1",name:"แพ็กเกจ Rainbow Six 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"mongil",name:"MONGIL: STAR DIVE",icon:"⭐",description:"บริการ MONGIL: STAR DIVE",type:"game",dataLabel:"ข้อมูลเกม",products:[
            {id:"mongil-1",name:"แพ็กเกจ MONGIL 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"kuroko",name:"Kuroko Basketball",icon:"🏀",description:"บริการ Kuroko Basketball",type:"game",dataLabel:"ข้อมูลเกม",products:[
            {id:"kuroko-1",name:"แพ็กเกจ Kuroko 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"gangstar",name:"Gangstar Mirage City",icon:"🏙️",description:"บริการ Gangstar Mirage City",type:"game",dataLabel:"ข้อมูลเกม",products:[
            {id:"gangstar-1",name:"แพ็กเกจ Gangstar 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"aniimo",name:"Aniimo",icon:"🎴",description:"บริการ Aniimo",type:"game",dataLabel:"ข้อมูลเกม",products:[
            {id:"aniimo-1",name:"แพ็กเกจ Aniimo 1",price:59,note:"ตัวอย่างแพ็กเกจ กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]}
    ],

    mobile: [
        {id:"ais-mobile",name:"AIS",icon:"📱",description:"เติมเงินมือถือ AIS",type:"mobile",dataLabel:"หมายเลขโทรศัพท์",products:[
            {id:"ais-m-20",name:"เติมเงิน 20 บาท",price:20,note:"ตรวจสอบยอดและค่าบริการก่อนทำรายการ"},
            {id:"ais-m-50",name:"เติมเงิน 50 บาท",price:50,note:"ตรวจสอบยอดและค่าบริการก่อนทำรายการ"},
            {id:"ais-m-100",name:"เติมเงิน 100 บาท",price:100,note:"ตรวจสอบยอดและค่าบริการก่อนทำรายการ"}
        ]},
        {id:"true-mobile",name:"True",icon:"📱",description:"เติมเงินมือถือ True",type:"mobile",dataLabel:"หมายเลขโทรศัพท์",products:[
            {id:"true-m-20",name:"เติมเงิน 20 บาท",price:20,note:"ตรวจสอบยอดและค่าบริการก่อนทำรายการ"},
            {id:"true-m-50",name:"เติมเงิน 50 บาท",price:50,note:"ตรวจสอบยอดและค่าบริการก่อนทำรายการ"},
            {id:"true-m-100",name:"เติมเงิน 100 บาท",price:100,note:"ตรวจสอบยอดและค่าบริการก่อนทำรายการ"}
        ]},
        {id:"dtac-mobile",name:"dtac",icon:"📱",description:"เติมเงินมือถือ dtac",type:"mobile",dataLabel:"หมายเลขโทรศัพท์",products:[
            {id:"dtac-m-20",name:"เติมเงิน 20 บาท",price:20,note:"ตรวจสอบยอดและค่าบริการก่อนทำรายการ"},
            {id:"dtac-m-50",name:"เติมเงิน 50 บาท",price:50,note:"ตรวจสอบยอดและค่าบริการก่อนทำรายการ"},
            {id:"dtac-m-100",name:"เติมเงิน 100 บาท",price:100,note:"ตรวจสอบยอดและค่าบริการก่อนทำรายการ"}
        ]}
    ],

    addons: [
        {id:"ais-addon",name:"โปรเสริม AIS",icon:"📶",description:"แพ็กเกจเสริมอินเทอร์เน็ต AIS",type:"addon",dataLabel:"หมายเลขโทรศัพท์",products:[
            {id:"ais-net-1",name:"เน็ตเสริม 1 วัน",price:19,note:"ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"ais-net-7",name:"เน็ตเสริม 7 วัน",price:49,note:"ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"ais-net-30",name:"เน็ตเสริม 30 วัน",price:99,note:"ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"true-addon",name:"โปรเสริม True",icon:"📶",description:"แพ็กเกจเสริมอินเทอร์เน็ต True",type:"addon",dataLabel:"หมายเลขโทรศัพท์",products:[
            {id:"true-net-1",name:"เน็ตเสริม 1 วัน",price:19,note:"ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"true-net-7",name:"เน็ตเสริม 7 วัน",price:49,note:"ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"true-net-30",name:"เน็ตเสริม 30 วัน",price:99,note:"ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]},
        {id:"dtac-addon",name:"โปรเสริม dtac",icon:"📶",description:"แพ็กเกจเสริมอินเทอร์เน็ต dtac",type:"addon",dataLabel:"หมายเลขโทรศัพท์",products:[
            {id:"dtac-net-1",name:"เน็ตเสริม 1 วัน",price:19,note:"ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"dtac-net-7",name:"เน็ตเสริม 7 วัน",price:49,note:"ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"},
            {id:"dtac-net-30",name:"เน็ตเสริม 30 วัน",price:99,note:"ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"}
        ]}
    ],

    services: [
        {id:"internet",name:"บริการอินเทอร์เน็ต",icon:"🌐",description:"บริการดิจิทัลด้านอินเทอร์เน็ต",type:"service",dataLabel:"รายละเอียดที่ต้องการ",products:[
            {id:"internet-contact",name:"สอบถามบริการ",price:0,note:"ติดต่อร้านเพื่อสอบถามรายละเอียด"}
        ]},
        {id:"wallet",name:"บริการกระเป๋าเงินดิจิทัล",icon:"💳",description:"บริการดิจิทัลอื่นๆ",type:"service",dataLabel:"รายละเอียดที่ต้องการ",products:[
            {id:"wallet-contact",name:"สอบถามบริการ",price:0,note:"ติดต่อร้านเพื่อสอบถามรายละเอียด"}
        ]},
        {id:"other",name:"บริการอื่นๆ",icon:"📦",description:"สอบถามบริการเพิ่มเติม",type:"service",dataLabel:"รายละเอียดที่ต้องการ",products:[
            {id:"other-contact",name:"ติดต่อร้าน",price:0,note:"กรุณาติดต่อร้านผ่าน LINE"}
        ]}
    ]
};

let currentItem = null;
let currentProduct = null;

function formatMoney(value) {
    if (!value) return "ติดต่อร้าน";
    return Number(value).toLocaleString("th-TH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }) + " บาท";
}

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

function renderGames(list = PRODUCTS.games) {
    const grid = document.getElementById("gamesGrid");
    if (!grid) return;

    if (!list.length) {
        grid.innerHTML = '<div class="empty-state">ไม่พบเกมที่ค้นหา</div>';
        return;
    }

    grid.innerHTML = list.map(item => `
        <article class="game-card">
            <div class="card-icon">${item.icon}</div>
            <h3>${escapeHTML(item.name)}</h3>
            <p>${escapeHTML(item.description)}</p>
            <button class="card-button" type="button" onclick="openProductPage('games','${item.id}')">
                ดูแพ็กเกจ
            </button>
        </article>
    `).join("");
}

function renderServiceCards(targetId, list) {
    const grid = document.getElementById(targetId);
    if (!grid) return;

    grid.innerHTML = list.map(item => `
        <article class="service-card">
            <div class="card-icon">${item.icon}</div>
            <h3>${escapeHTML(item.name)}</h3>
            <p>${escapeHTML(item.description)}</p>
            <button class="card-button" type="button" onclick="openProductPage('${getCategoryByItem(item)}','${item.id}')">
                ดูแพ็กเกจ
            </button>
        </article>
    `).join("");
}

function getCategoryByItem(item) {
    if (PRODUCTS.mobile.includes(item)) return "mobile";
    if (PRODUCTS.addons.includes(item)) return "addons";
    if (PRODUCTS.services.includes(item)) return "services";
    return "games";
}

function renderMobile() {
    renderServiceCards("mobileGrid", PRODUCTS.mobile);
}

function renderAddons() {
    renderServiceCards("addonsGrid", PRODUCTS.addons);
}

function renderServices() {
    renderServiceCards("servicesGrid", PRODUCTS.services);
}

function createModal(content) {
    const old = document.getElementById("siteModal");
    if (old) old.remove();

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.id = "siteModal";
    backdrop.innerHTML = `<div class="modal">${content}</div>`;

    backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) closeModal();
    });

    document.body.appendChild(backdrop);
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("siteModal");
    if (modal) modal.remove();
    document.body.style.overflow = "";
}

function openProductPage(category, itemId) {
    const list = PRODUCTS[category] || [];
    const item = list.find(x => x.id === itemId);
    if (!item) return;

    currentItem = item;

    const products = item.products || [];

    createModal(`
        <div class="modal-header">
            <div>
                <div class="card-icon">${item.icon}</div>
                <h2>${escapeHTML(item.name)}</h2>
                <p>${escapeHTML(item.description)}</p>
            </div>
            <button class="close-btn" type="button" onclick="closeModal()">×</button>
        </div>

        <div class="product-list">
            ${products.map(product => `
                <div class="product-item">
                    <h3>${escapeHTML(product.name)}</h3>
                    <p>${escapeHTML(product.note || "")}</p>
                    <div class="product-row">
                        <span class="price">${formatMoney(product.price)}</span>
                        <button class="btn btn-primary" type="button"
                            onclick="openOrder('${category}','${item.id}','${product.id}')">
                            ${product.price ? "สั่งซื้อ" : "ติดต่อร้าน"}
                        </button>
                    </div>
                </div>
            `).join("")}
        </div>
    `);
}

function findProduct(category, itemId, productId) {
    const item = (PRODUCTS[category] || []).find(x => x.id === itemId);
    if (!item) return null;
    const product = (item.products || []).find(x => x.id === productId);
    if (!product) return null;
    return {item, product};
}

function openOrder(category, itemId, productId) {
    const found = findProduct(category, itemId, productId);
    if (!found) return;

    currentItem = found.item;
    currentProduct = found.product;

    createModal(`
        <div class="modal-header">
            <div>
                <h2>ยืนยันการสั่งซื้อ</h2>
                <p>${escapeHTML(currentItem.name)} — ${escapeHTML(currentProduct.name)}</p>
            </div>
            <button class="close-btn" type="button" onclick="closeModal()">×</button>
        </div>

        <div class="product-item">
            <div class="product-row">
                <strong>${escapeHTML(currentProduct.name)}</strong>
                <span class="price">${formatMoney(currentProduct.price)}</span>
            </div>
        </div>

        <form class="order-form" id="orderForm">
            <div>
                <label for="customerName">ชื่อผู้สั่งซื้อ</label>
                <input id="customerName" required maxlength="100" placeholder="กรอกชื่อ">
            </div>

            <div>
                <label for="customerPhone">เบอร์โทรศัพท์</label>
                <input id="customerPhone" required maxlength="30" inputmode="tel" placeholder="กรอกเบอร์โทร">
            </div>

            <div>
                <label for="gameData">${escapeHTML(currentItem.dataLabel || "ข้อมูลสำหรับทำรายการ")}</label>
                <input id="gameData" required maxlength="200" placeholder="กรอกข้อมูล">
            </div>

            <div>
                <label for="orderNote">หมายเหตุ</label>
                <textarea id="orderNote" maxlength="1000" placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"></textarea>
            </div>

            <button class="btn btn-primary" type="submit">ยืนยันสั่งซื้อ</button>
        </form>
    `);

    document.getElementById("orderForm").addEventListener("submit", submitOrder);
}

function generateOrderNumber() {
    const now = new Date();
    const date = now.toLocaleDateString("en-CA", {timeZone:"Asia/Bangkok"}).replaceAll("-","");
    const random = Math.floor(1000 + Math.random() * 9000);
    return `SG-${date}-${random}`;
}

async function submitOrder(event) {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    const gameData = document.getElementById("gameData").value.trim();
    const note = document.getElementById("orderNote").value.trim();

    if (!customerName || !customerPhone || !gameData) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    const orderNumber = generateOrderNumber();

    let user = null;

    if (supabaseClient) {
        const authResult = await supabaseClient.auth.getUser();
        user = authResult.data?.user || null;
    }

    const orderData = {
        order_number: orderNumber,
        auth_user_id: user?.id || null,
        customer_name: customerName,
        customer_phone: customerPhone,
        game_name: currentItem?.name || "ไม่ระบุ",
        game_id: gameData,
        package_name: currentProduct?.name || "ไม่ระบุ",
        amount: currentProduct?.price || 0,
        note: note,
        status: "pending"
    };

    if (!supabaseClient) {
        showOrderResult(orderNumber, "เว็บไซต์ยังไม่ได้เชื่อมต่อ Supabase", orderData);
        return;
    }

    const {error} = await supabaseClient
        .from("orders")
        .insert(orderData);

    if (error) {
        console.error(error);
        showOrderResult(
            orderNumber,
            "สร้างเลขออเดอร์แล้ว แต่ยังบันทึกลงฐานข้อมูลไม่ได้",
            orderData
        );
        return;
    }

    showOrderResult(orderNumber, "สร้างออเดอร์และบันทึกข้อมูลเรียบร้อยแล้ว", orderData);
}

function createLineMessage(orderNumber, orderData) {
    return [
        `สวัสดีครับ ${SHOP.name}`,
        `แจ้งออเดอร์ ${orderNumber}`,
        `บริการ: ${orderData.game_name}`,
        `แพ็กเกจ: ${orderData.package_name}`,
        `ข้อมูล: ${orderData.game_id}`,
        `ชื่อ: ${orderData.customer_name}`,
        `เบอร์: ${orderData.customer_phone}`,
        `ยอด: ${formatMoney(orderData.amount)}`,
        orderData.note ? `หมายเหตุ: ${orderData.note}` : ""
    ].filter(Boolean).join("\n");
}

function showOrderResult(orderNumber, message, orderData) {
    const lineMessage = createLineMessage(orderNumber, orderData);
    const lineUrl = SHOP.line;

    createModal(`
        <div class="result-box">
            <div class="card-icon">🎉</div>
            <h2>รับรายการแล้ว</h2>
            <p>${escapeHTML(message)}</p>
            <div class="order-number">${escapeHTML(orderNumber)}</div>
            <p>กรุณาเก็บเลขออเดอร์นี้ไว้สำหรับติดต่อร้าน</p>

            <div class="hero-actions">
                <a class="btn btn-primary" href="${lineUrl}" target="_blank" rel="noopener noreferrer">
                    💬 ติดต่อร้านผ่าน LINE
                </a>
                <button class="btn btn-secondary" type="button" onclick="copyOrderNumber('${orderNumber}')">
                    📋 คัดลอกเลขออเดอร์
                </button>
            </div>
        </div>
    `);
}

async function copyOrderNumber(orderNumber) {
    try {
        await navigator.clipboard.writeText(orderNumber);
        alert("คัดลอกเลขออเดอร์แล้ว");
    } catch {
        alert(orderNumber);
    }
}

function setupSearch() {
    const input = document.getElementById("gameSearch");
    if (!input) return;

    input.addEventListener("input", () => {
        const keyword = input.value.trim().toLowerCase();
        const filtered = PRODUCTS.games.filter(item =>
            item.name.toLowerCase().includes(keyword)
        );
        renderGames(filtered);
    });
}

function setupMenu() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => nav.classList.remove("open"));
    });
}

async function registerMember() {
    if (!supabaseClient) {
        alert("ยังไม่ได้ใส่ Supabase ANON/PUBLIC KEY ใน script.js");
        return;
    }

    createModal(`
        <div class="modal-header">
            <h2>สมัครสมาชิก</h2>
            <button class="close-btn" type="button" onclick="closeModal()">×</button>
        </div>
        <form class="order-form" id="registerForm">
            <div><label>Username</label><input id="registerUsername" required maxlength="50"></div>
            <div><label>Email</label><input id="registerEmail" type="email" required></div>
            <div><label>รหัสผ่าน</label><input id="registerPassword" type="password" required minlength="6"></div>
            <button class="btn btn-primary" type="submit">สมัครสมาชิก</button>
        </form>
    `);

    document.getElementById("registerForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("registerUsername").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;

        const {data, error} = await supabaseClient.auth.signUp({
            email,
            password,
            options: {data: {username}}
        });

        if (error) {
            alert(error.message);
            return;
        }

        closeModal();
        if (data.session) {
            alert("สมัครสมาชิกสำเร็จ");
        } else {
            alert("สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี");
        }
        await checkCurrentUser();
    });
}

async function loginMember() {
    if (!supabaseClient) {
        alert("ยังไม่ได้ใส่ Supabase ANON/PUBLIC KEY ใน script.js");
        return;
    }

    createModal(`
        <div class="modal-header">
            <h2>เข้าสู่ระบบ</h2>
            <button class="close-btn" type="button" onclick="closeModal()">×</button>
        </div>
        <form class="order-form" id="loginForm">
            <div><label>Email</label><input id="loginEmail" type="email" required></div>
            <div><label>รหัสผ่าน</label><input id="loginPassword" type="password" required></div>
            <button class="btn btn-primary" type="submit">เข้าสู่ระบบ</button>
        </form>
    `);

    document.getElementById("loginForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const {error} = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            alert(error.message);
            return;
        }

        closeModal();
        alert("เข้าสู่ระบบสำเร็จ");
        await checkCurrentUser();
    });
}

async function logoutMember() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    await checkCurrentUser();
}

async function checkCurrentUser() {
    const title = document.getElementById("memberTitle");
    const text = document.getElementById("memberText");
    const registerBtn = document.getElementById("openRegisterBtn");
    const loginBtn = document.getElementById("openLoginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!title || !text) return;

    if (!supabaseClient) {
        title.textContent = "ยังไม่ได้เชื่อมต่อระบบสมาชิก";
        text.textContent = "กรุณาใส่ Supabase ANON/PUBLIC KEY ใน script.js";
        return;
    }

    const {data} = await supabaseClient.auth.getUser();
    const user = data?.user;

    if (user) {
        const username = user.user_metadata?.username || user.email || "สมาชิก";
        title.textContent = `สวัสดี ${username}`;
        text.textContent = "เข้าสู่ระบบเรียบร้อยแล้ว";
        registerBtn?.classList.add("hidden");
        loginBtn?.classList.add("hidden");
        logoutBtn?.classList.remove("hidden");
    } else {
        title.textContent = "ยังไม่ได้เข้าสู่ระบบ";
        text.textContent = "สมัครสมาชิกเพื่อใช้งานระบบสมาชิก";
        registerBtn?.classList.remove("hidden");
        loginBtn?.classList.remove("hidden");
        logoutBtn?.classList.add("hidden");
    }
}

function setupMemberButtons() {
    document.getElementById("openRegisterBtn")?.addEventListener("click", registerMember);
    document.getElementById("openLoginBtn")?.addEventListener("click", loginMember);
    document.getElementById("logoutBtn")?.addEventListener("click", logoutMember);
}

function updateYear() {
    const year = document.getElementById("currentYear");
    if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", async () => {
    renderGames();
    renderMobile();
    renderAddons();
    renderServices();
    setupSearch();
    setupMenu();
    setupMemberButtons();
    updateYear();
    await checkCurrentUser();

    if (!supabaseClient) {
        console.warn("SAINGAM SHOP: ยังไม่ได้ใส่ Supabase ANON/PUBLIC KEY");
    }
});
