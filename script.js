/* =========================================================
   SAINGAM SHOP
   SCRIPT.JS
========================================================= */


/* =========================================================
   SUPABASE CONFIG
========================================================= */

const SUPABASE_URL =
    "https://wljlcelgfthzyyuxvegn.supabase.co";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsamxjZWxnZnRoenl5dXh2ZWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDc0NzQsImV4cCI6MjEwNjg4MzQ3NH0.dymqAwYWp2YX54673-4R69fvLU9ujdmUXdi_LIvIKjM";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


/* =========================================================
   SHOP CONFIG
========================================================= */

const SHOP = {

    name: "SAINGAM SHOP",

    line:
        "https://lin.ee/9q139qW",

    facebook:
        "https://www.facebook.com/share/1MwmyTJfCb/?mibextid=wwXIfr",

    phone:
        "0843123861"

};


/* =========================================================
   PRODUCT DATA
========================================================= */

const PRODUCTS = {

    /* =====================================================
       GAMES
    ====================================================== */

    games: [

        {
            id: "rov",
            name: "ROV",
            icon: "⚔️",
            description: "เติมคูปอง ROV",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "rov-40",
                    name: "40 คูปอง",
                    price: 12,
                    detail: "เติมคูปองเข้าสู่บัญชี ROV",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "rov-90",
                    name: "90 คูปอง",
                    price: 25,
                    detail: "เติมคูปองเข้าสู่บัญชี ROV",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "rov-210",
                    name: "210 คูปอง",
                    price: 55,
                    detail: "เติมคูปองเข้าสู่บัญชี ROV",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "rov-500",
                    name: "500 คูปอง",
                    price: 129,
                    detail: "เติมคูปองเข้าสู่บัญชี ROV",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "freefire",
            name: "Free Fire",
            icon: "🔥",
            description: "เติมเพชร Free Fire",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "ff-100",
                    name: "100 เพชร",
                    price: 35,
                    detail: "เติมเพชร Free Fire",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "ff-310",
                    name: "310 เพชร",
                    price: 99,
                    detail: "เติมเพชร Free Fire",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "ff-520",
                    name: "520 เพชร",
                    price: 159,
                    detail: "เติมเพชร Free Fire",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "pubg",
            name: "PUBG Mobile",
            icon: "🔫",
            description: "เติม UC PUBG Mobile",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "pubg-60",
                    name: "60 UC",
                    price: 35,
                    detail: "เติม UC PUBG Mobile",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "pubg-325",
                    name: "325 UC",
                    price: 159,
                    detail: "เติม UC PUBG Mobile",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "pubg-660",
                    name: "660 UC",
                    price: 299,
                    detail: "เติม UC PUBG Mobile",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "mlbb",
            name: "Mobile Legends",
            icon: "🛡️",
            description: "เติมเพชร Mobile Legends",
            type: "game",

            dataLabel: "ID เกม",

            products: [

                {
                    id: "mlbb-86",
                    name: "86 Diamonds",
                    price: 39,
                    detail: "เติม Diamonds",
                    note: "ใช้ ID เกม"
                },

                {
                    id: "mlbb-172",
                    name: "172 Diamonds",
                    price: 75,
                    detail: "เติม Diamonds",
                    note: "ใช้ ID เกม"
                },

                {
                    id: "mlbb-257",
                    name: "257 Diamonds",
                    price: 109,
                    detail: "เติม Diamonds",
                    note: "ใช้ ID เกม"
                }

            ]
        },


        {
            id: "genshin",
            name: "Genshin Impact",
            icon: "✨",
            description: "เติม Genesis Crystals",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "genshin-60",
                    name: "60 Genesis Crystals",
                    price: 39,
                    detail: "เติม Genesis Crystals",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "genshin-300",
                    name: "300 Genesis Crystals",
                    price: 159,
                    detail: "เติม Genesis Crystals",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "hsr",
            name: "Honkai: Star Rail",
            icon: "🚂",
            description: "เติม Oneiric Shards",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "hsr-60",
                    name: "60 Oneiric Shards",
                    price: 39,
                    detail: "เติม Oneiric Shards",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "hsr-300",
                    name: "300 Oneiric Shards",
                    price: 159,
                    detail: "เติม Oneiric Shards",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "ragnarok",
            name: "Ragnarok",
            icon: "⚔️",
            description: "บริการเติมเกม Ragnarok",
            type: "game",

            dataLabel: "ID เกม",

            products: [

                {
                    id: "ragnarok-1",
                    name: "แพ็กเกจเริ่มต้น",
                    price: 50,
                    detail: "บริการเติมเกม Ragnarok",
                    note: "ใช้ ID เกม"
                },

                {
                    id: "ragnarok-2",
                    name: "แพ็กเกจพิเศษ",
                    price: 100,
                    detail: "บริการเติมเกม Ragnarok",
                    note: "ใช้ ID เกม"
                }

            ]
        },


        {
            id: "wuthering",
            name: "Wuthering Waves",
            icon: "🌊",
            description: "เติม Astrite",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "wuwa-60",
                    name: "60 Astrite",
                    price: 39,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "wuwa-300",
                    name: "300 Astrite",
                    price: 159,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "heartopia",
            name: "Heartopia",
            icon: "💗",
            description: "บริการเติมเกม Heartopia",
            type: "game",

            dataLabel: "ID เกม",

            products: [

                {
                    id: "heartopia-1",
                    name: "แพ็กเกจ 1",
                    price: 50,
                    detail: "บริการเติมเกม Heartopia",
                    note: "ใช้ ID เกม"
                },

                {
                    id: "heartopia-2",
                    name: "แพ็กเกจ 2",
                    price: 100,
                    detail: "บริการเติมเกม Heartopia",
                    note: "ใช้ ID เกม"
                }

            ]
        },


        {
            id: "rainbowsix",
            name: "Rainbow Six Mobile",
            icon: "🎯",
            description: "บริการเติม Rainbow Six Mobile",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "r6-1",
                    name: "แพ็กเกจ 1",
                    price: 50,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "r6-2",
                    name: "แพ็กเกจ 2",
                    price: 100,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "mongil",
            name: "MONGIL: STAR DIVE",
            icon: "⭐",
            description: "บริการเติมเกม",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "mongil-1",
                    name: "แพ็กเกจ 1",
                    price: 50,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "mongil-2",
                    name: "แพ็กเกจ 2",
                    price: 100,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "kuroko",
            name: "Kuroko Basketball",
            icon: "🏀",
            description: "บริการเติมเกม",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "kuroko-1",
                    name: "แพ็กเกจ 1",
                    price: 50,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "kuroko-2",
                    name: "แพ็กเกจ 2",
                    price: 100,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "gangstar",
            name: "Gangstar Mirage City",
            icon: "🏙️",
            description: "บริการเติมเกม",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "gangstar-1",
                    name: "แพ็กเกจ 1",
                    price: 50,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "gangstar-2",
                    name: "แพ็กเกจ 2",
                    price: 100,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                }

            ]
        },


        {
            id: "aniimo",
            name: "Aniimo",
            icon: "🐾",
            description: "บริการเติมเกม",
            type: "game",

            dataLabel: "UID เกม",

            products: [

                {
                    id: "aniimo-1",
                    name: "แพ็กเกจ 1",
                    price: 50,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                },

                {
                    id: "aniimo-2",
                    name: "แพ็กเกจ 2",
                    price: 100,
                    detail: "บริการเติมเกม",
                    note: "ใช้ UID ในเกม"
                }

            ]
        }

    ],


    /* =====================================================
       MOBILE TOP UP
    ====================================================== */

    mobile: [

        {
            id: "ais-mobile",
            name: "AIS",
            icon: "📱",
            description: "เติมเงินมือถือ AIS",
            type: "mobile",

            dataLabel: "หมายเลขโทรศัพท์",

            products: [

                {
                    id: "ais-20",
                    name: "เติมเงิน 20 บาท",
                    price: 20,
                    detail: "เติมเงินมือถือ AIS",
                    note: "กรอกหมายเลขโทรศัพท์"
                },

                {
                    id: "ais-50",
                    name: "เติมเงิน 50 บาท",
                    price: 50,
                    detail: "เติมเงินมือถือ AIS",
                    note: "กรอกหมายเลขโทรศัพท์"
                },

                {
                    id: "ais-100",
                    name: "เติมเงิน 100 บาท",
                    price: 100,
                    detail: "เติมเงินมือถือ AIS",
                    note: "กรอกหมายเลขโทรศัพท์"
                }

            ]
        },


        {
            id: "true-mobile",
            name: "True",
            icon: "📱",
            description: "เติมเงินมือถือ True",
            type: "mobile",

            dataLabel: "หมายเลขโทรศัพท์",

            products: [

                {
                    id: "true-20",
                    name: "เติมเงิน 20 บาท",
                    price: 20,
                    detail: "เติมเงินมือถือ True",
                    note: "กรอกหมายเลขโทรศัพท์"
                },

                {
                    id: "true-50",
                    name: "เติมเงิน 50 บาท",
                    price: 50,
                    detail: "เติมเงินมือถือ True",
                    note: "กรอกหมายเลขโทรศัพท์"
                },

                {
                    id: "true-100",
                    name: "เติมเงิน 100 บาท",
                    price: 100,
                    detail: "เติมเงินมือถือ True",
                    note: "กรอกหมายเลขโทรศัพท์"
                }

            ]
        },


        {
            id: "dtac-mobile",
            name: "dtac",
            icon: "📱",
            description: "เติมเงินมือถือ dtac",
            type: "mobile",

            dataLabel: "หมายเลขโทรศัพท์",

            products: [

                {
                    id: "dtac-20",
                    name: "เติมเงิน 20 บาท",
                    price: 20,
                    detail: "เติมเงินมือถือ dtac",
                    note: "กรอกหมายเลขโทรศัพท์"
                },

                {
                    id: "dtac-50",
                    name: "เติมเงิน 50 บาท",
                    price: 50,
                    detail: "เติมเงินมือถือ dtac",
                    note: "กรอกหมายเลขโทรศัพท์"
                },

                {
                    id: "dtac-100",
                    name: "เติมเงิน 100 บาท",
                    price: 100,
                    detail: "เติมเงินมือถือ dtac",
                    note: "กรอกหมายเลขโทรศัพท์"
                }

            ]
        }

    ],


    /* =====================================================
       BUY INTERNET ADD-ON
    ====================================================== */

    addons: [

        {
            id: "ais-addon",
            name: "โปรเสริม AIS",
            icon: "📶",
            description: "แพ็กเกจเสริมอินเทอร์เน็ต AIS",
            type: "addon",

            dataLabel: "หมายเลขโทรศัพท์",

            products: [

                {
                    id: "ais-net-1",
                    name: "เน็ตเสริม 1 วัน",
                    price: 19,
                    detail: "แพ็กเกจเสริมอินเทอร์เน็ต AIS",
                    note: "ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"
                },

                {
                    id: "ais-net-7",
                    name: "เน็ตเสริม 7 วัน",
                    price: 49,
                    detail: "แพ็กเกจเสริมอินเทอร์เน็ต AIS",
                    note: "ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"
                },

                {
                    id: "ais-net-30",
                    name: "เน็ตเสริม 30 วัน",
                    price: 99,
                    detail: "แพ็กเกจเสริมอินเทอร์เน็ต AIS",
                    note: "ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"
                }

            ]
        },


        {
            id: "true-addon",
            name: "โปรเสริม True",
            icon: "📶",
            description: "แพ็กเกจเสริมอินเทอร์เน็ต True",
            type: "addon",

            dataLabel: "หมายเลขโทรศัพท์",

            products: [

                {
                    id: "true-net-1",
                    name: "เน็ตเสริม 1 วัน",
                    price: 19,
                    detail: "แพ็กเกจเสริมอินเทอร์เน็ต True",
                    note: "ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"
                },

                {
                    id: "true-net-7",
                    name: "เน็ตเสริม 7 วัน",
                    price: 49,
                    detail: "แพ็กเกจเสริมอินเทอร์เน็ต True",
                    note: "ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"
                },

                {
                    id: "true-net-30",
                    name: "เน็ตเสริม 30 วัน",
                    price: 99,
                    detail: "แพ็กเกจเสริมอินเทอร์เน็ต True",
                    note: "ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"
                }

            ]
        },


        {
            id: "dtac-addon",
            name: "โปรเสริม dtac",
            icon: "📶",
            description: "แพ็กเกจเสริมอินเทอร์เน็ต dtac",
            type: "addon",

            dataLabel: "หมายเลขโทรศัพท์",

            products: [

                {
                    id: "dtac-net-1",
                    name: "เน็ตเสริม 1 วัน",
                    price: 19,
                    detail: "แพ็กเกจเสริมอินเทอร์เน็ต dtac",
                    note: "ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"
                },

                {
                    id: "dtac-net-7",
                    name: "เน็ตเสริม 7 วัน",
                    price: 49,
                    detail: "แพ็กเกจเสริมอินเทอร์เน็ต dtac",
                    note: "ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"
                },

                {
                    id: "dtac-net-30",
                    name: "เน็ตเสริม 30 วัน",
                    price: 99,
                    detail: "แพ็กเกจเสริมอินเทอร์เน็ต dtac",
                    note: "ตัวอย่างราคา — กรุณาตรวจสอบราคาจริงกับร้าน"
                }

            ]
        }

    ],


    /* =====================================================
       OTHER SERVICES
    ====================================================== */

    services: [

        {
            id: "internet",
            name: "บริการอินเทอร์เน็ต",
            icon: "🌐",
            description: "บริการดิจิทัลเกี่ยวกับอินเทอร์เน็ต",
            type: "service",

            dataLabel: "ข้อมูลบริการ",

            products: [

                {
                    id: "internet-1",
                    name: "บริการอินเทอร์เน็ต",
                    price: 0,
                    detail: "สอบถามรายละเอียดกับร้าน",
                    note: "ติดต่อร้านเพื่อเช็กราคา"
                }

            ]
        },


        {
            id: "wallet",
            name: "บริการกระเป๋าเงิน",
            icon: "💰",
            description: "บริการเติมเงินกระเป๋าเงินดิจิทัล",
            type: "service",

            dataLabel: "ข้อมูลบัญชี",

            products: [

                {
                    id: "wallet-1",
                    name: "บริการเติมเงิน",
                    price: 0,
                    detail: "สอบถามรายละเอียดกับร้าน",
                    note: "ติดต่อร้านเพื่อเช็กราคา"
                }

            ]
        },


        {
            id: "other",
            name: "บริการอื่นๆ",
            icon: "🧩",
            description: "สอบถามบริการเพิ่มเติม",
            type: "service",

            dataLabel: "รายละเอียด",

            products: [

                {
                    id: "other-1",
                    name: "บริการพิเศษ",
                    price: 0,
                    detail: "สอบถามรายละเอียดกับร้าน",
                    note: "ติดต่อร้านเพื่อเช็กราคา"
                }

            ]
        }

    ]

};


/* =========================================================
   DOM
========================================================= */

const gamesGrid =
    document.getElementById("gamesGrid");

const mobileGrid =
    document.getElementById("mobileGrid");

const addonsGrid =
    document.getElementById("addonsGrid");

const servicesGrid =
    document.getElementById("servicesGrid");

const gameSearch =
    document.getElementById("gameSearch");

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


/* =========================================================
   MODALS
========================================================= */

let productModal;
let orderModal;
let resultModal;
let registerModal;
let loginModal;


/* =========================================================
   CURRENT ORDER
========================================================= */

let currentCategory = null;
let currentItem = null;
let currentProduct = null;


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createModals();

        renderGames(
            PRODUCTS.games
        );

        renderMobile();

        renderAddons();

        renderServices();

        setupSearch();

        setupMenu();

        setupMemberEvents();

        checkCurrentUser();

        updateYear();

    }
);


/* =========================================================
   CREATE MODALS
========================================================= */

function createModals() {

    productModal =
        createModal(
            "productModal"
        );

    orderModal =
        createModal(
            "orderModal"
        );

    resultModal =
        createModal(
            "resultModal"
        );

    registerModal =
        createModal(
            "registerModal"
        );

    loginModal =
        createModal(
            "loginModal"
        );

}


/* =========================================================
   MODAL CREATOR
========================================================= */

function createModal(id) {

    const modal =
        document.createElement("div");

    modal.id = id;

    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button
                class="modal-close"
                type="button"
                aria-label="ปิด"
            >
                ×
            </button>

            <div class="modal-body"></div>

        </div>
    `;

    document.body.appendChild(modal);

    const closeButton =
        modal.querySelector(
            ".modal-close"
        );

    closeButton.addEventListener(
        "click",
        () => closeModal(modal)
    );

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {
                closeModal(modal);
            }

        }
    );

    return modal;
}


/* =========================================================
   OPEN MODAL
========================================================= */

function openModal(modal) {

    if (!modal) return;

    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("active");

    const activeModal =
        document.querySelector(
            ".modal.active"
        );

    if (!activeModal) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   RENDER GAMES
========================================================= */

function renderGames(games) {

    if (!gamesGrid) return;

    if (!games.length) {

        gamesGrid.innerHTML = `
            <div class="empty-state">
                <strong>ไม่พบเกม</strong>
                ลองค้นหาด้วยชื่อเกมอื่น
            </div>
        `;

        return;
    }


    gamesGrid.innerHTML =
        games.map(
            game => `

                <article
                    class="game-card"
                    data-game-id="${game.id}"
                    tabindex="0"
                >

                    <div class="game-icon">
                        ${game.icon}
                    </div>

                    <h3>
                        ${escapeHTML(game.name)}
                    </h3>

                    <p>
                        ${escapeHTML(game.description)}
                    </p>

                </article>

            `
        ).join("");


    gamesGrid
        .querySelectorAll(".game-card")
        .forEach(card => {

            const id =
                card.dataset.gameId;

            const game =
                games.find(
                    item => item.id === id
                );

            card.addEventListener(
                "click",
                () => {

                    openProductPage(
                        game
                    );

                }
            );

        });

}


/* =========================================================
   RENDER MOBILE
========================================================= */

function renderMobile() {

    renderServiceCards(
        PRODUCTS.mobile,
        mobileGrid
    );

}


/* =========================================================
   RENDER ADDONS
========================================================= */

function renderAddons() {

    renderServiceCards(
        PRODUCTS.addons,
        addonsGrid
    );

}


/* =========================================================
   RENDER SERVICES
========================================================= */

function renderServices() {

    renderServiceCards(
        PRODUCTS.services,
        servicesGrid
    );

}


/* =========================================================
   RENDER SERVICE CARDS
========================================================= */

function renderServiceCards(
    items,
    target
) {

    if (!target) return;

    if (!items.length) {

        target.innerHTML = `
            <div class="empty-state">
                <strong>ยังไม่มีบริการ</strong>
                กรุณาติดต่อร้าน
            </div>
        `;

        return;
    }


    target.innerHTML =
        items.map(
            item => `

                <article
                    class="service-card"
                    data-service-id="${item.id}"
                    tabindex="0"
                >

                    <div class="service-icon">
                        ${item.icon}
                    </div>

                    <h3>
                        ${escapeHTML(item.name)}
                    </h3>

                    <p>
                        ${escapeHTML(item.description)}
                    </p>

                </article>

            `
        ).join("");


    target
        .querySelectorAll(
            ".service-card"
        )
        .forEach(card => {

            const id =
                card.dataset.serviceId;

            const item =
                items.find(
                    service =>
                        service.id === id
                );

            card.addEventListener(
                "click",
                () => {

                    openProductPage(
                        item
                    );

                }
            );

        });

}


/* =========================================================
   OPEN PRODUCT PAGE
========================================================= */

function openProductPage(item) {

    if (!item) return;

    currentCategory =
        item.type;

    currentItem =
        item;


    const categoryName =
        getCategoryName(
            item.type
        );


    productModal.querySelector(
        ".modal-body"
    ).innerHTML = `

        <div class="modal-header">

            <h2>
                ${item.icon}
                ${escapeHTML(item.name)}
            </h2>

            <p>
                ${escapeHTML(
                    item.description
                )}
            </p>

        </div>


        <div class="product-list">

            ${item.products
                .map(
                    product =>
                        createProductHTML(
                            product,
                            categoryName
                        )
                )
                .join("")
            }

        </div>

    `;


    productModal
        .querySelectorAll(
            "[data-product-id]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const productId =
                        button.dataset.productId;

                    const product =
                        item.products.find(
                            p =>
                                p.id === productId
                        );

                    openOrder(
                        item,
                        product
                    );

                }
            );

        });


    openModal(
        productModal
    );

}


/* =========================================================
   PRODUCT HTML
========================================================= */

function createProductHTML(
    product,
    categoryName
) {

    const price =
        Number(product.price) || 0;


    const priceHTML =
        price > 0
            ? `${formatMoney(price)} บาท`
            : "ติดต่อร้าน";


    return `

        <div class="product-card">

            <div class="product-card-top">

                <div>

                    <h3>
                        ${escapeHTML(
                            product.name
                        )}
                    </h3>

                    <p class="product-detail">
                        ${escapeHTML(
                            product.detail
                        )}
                    </p>

                </div>

                <div class="product-price">
                    ${priceHTML}
                </div>

            </div>


            <p class="product-note">
                ${escapeHTML(
                    product.note
                )}
            </p>


            <button
                class="btn btn-primary"
                type="button"
                data-product-id="${product.id}"
            >
                🛒 สั่งซื้อแพ็กเกจนี้
            </button>

        </div>

    `;

}


/* =========================================================
   OPEN ORDER
========================================================= */

async function openOrder(
    item,
    product
) {

    if (!item || !product) return;

    currentItem =
        item;

    currentProduct =
        product;


    closeModal(
        productModal
    );


    const categoryName =
        getCategoryName(
            item.type
        );


    const price =
        Number(product.price) || 0;


    orderModal.querySelector(
        ".modal-body"
    ).innerHTML = `

        <div class="modal-header">

            <h2>
                📝 สั่งซื้อ
            </h2>

            <p>
                ${escapeHTML(
                    categoryName
                )}
            </p>

        </div>


        <div class="order-summary">

            <div class="order-summary-row">

                <span>
                    รายการ
                </span>

                <strong>
                    ${escapeHTML(
                        product.name
                    )}
                </strong>

            </div>


            <div class="order-summary-row">

                <span>
                    บริการ
                </span>

                <strong>
                    ${escapeHTML(
                        item.name
                    )}
                </strong>

            </div>


            <div class="order-summary-row">

                <span>
                    ราคา
                </span>

                <strong>
                    ${
                        price > 0
                            ? `${formatMoney(price)} บาท`
                            : "ติดต่อร้าน"
                    }
                </strong>

            </div>

        </div>


        <form id="orderForm">

            <div class="form-group">

                <label for="customerName">
                    ชื่อผู้สั่งซื้อ
                </label>

                <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    placeholder="กรอกชื่อ"
                    required
                >

            </div>


            <div class="form-group">

                <label for="customerPhone">
                    เบอร์โทรศัพท์
                </label>

                <input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    inputmode="tel"
                    placeholder="กรอกเบอร์โทรศัพท์"
                    required
                >

            </div>


            <div class="form-group">

                <label for="gameData">
                    ${escapeHTML(
                        item.dataLabel ||
                        "ข้อมูลสำหรับทำรายการ"
                    )}
                </label>

                <input
                    id="gameData"
                    name="gameData"
                    type="text"
                    placeholder="กรอกข้อมูล"
                    required
                >

                <div class="form-help">
                    กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนส่งคำสั่งซื้อ
                </div>

            </div>


            <div class="form-group">

                <label for="orderNote">
                    หมายเหตุ
                </label>

                <textarea
                    id="orderNote"
                    name="orderNote"
                    placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
                ></textarea>

            </div>


            <button
                class="btn btn-primary"
                type="submit"
                style="width:100%;"
            >
                ✅ ยืนยันคำสั่งซื้อ
            </button>

        </form>

    `;


    const form =
        document.getElementById(
            "orderForm"
        );


    form.addEventListener(
        "submit",
        submitOrder
    );


    openModal(
        orderModal
    );

}


/* =========================================================
   SUBMIT ORDER
========================================================= */

async function submitOrder(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const customerName =
        form.customerName.value.trim();

    const customerPhone =
        form.customerPhone.value.trim();

    const gameData =
        form.gameData.value.trim();

    const note =
        form.orderNote.value.trim();


    if (
        !customerName ||
        !customerPhone ||
        !gameData
    ) {

        alert(
            "กรุณากรอกข้อมูลให้ครบถ้วน"
        );

        return;

    }


    const orderNumber =
        generateOrderNumber();


    let user = null;


    try {

        const result =
            await supabaseClient.auth.getUser();

        user =
            result.data.user || null;

    } catch (error) {

        console.warn(
            "ไม่สามารถอ่านข้อมูลสมาชิกได้",
            error
        );

    }


    const price =
        Number(
            currentProduct?.price
        ) || 0;


    const orderData = {

        order_number:
            orderNumber,

        auth_user_id:
            user?.id || null,

        customer_name:
            customerName,

        customer_phone:
            customerPhone,

        game_name:
            currentItem?.name ||
            "ไม่ระบุ",

        game_id:
            gameData,

        package_name:
            currentProduct?.name ||
            "ไม่ระบุ",

        amount:
            price,

        note:
            note,

        status:
            "pending"

    };


    try {

        const {
            error
        } =
            await supabaseClient
                .from("orders")
                .insert(
                    orderData
                );


        if (error) {

            console.error(
                error
            );

            alert(
                "ไม่สามารถบันทึกออเดอร์ได้\n\n" +
                error.message
            );

            return;

        }


        closeModal(
            orderModal
        );


        showOrderResult(
            orderNumber,
            orderData
        );


    } catch (error) {

        console.error(
            error
        );

        alert(
            "เกิดข้อผิดพลาดในการส่งออเดอร์"
        );

    }

}


/* =========================================================
   SHOW ORDER RESULT
========================================================= */

function showOrderResult(
    orderNumber,
    orderData
) {

    resultModal.querySelector(
        ".modal-body"
    ).innerHTML = `

        <div class="result-box">

            <div class="result-icon">
                🎉
            </div>

            <h2>
                สั่งซื้อสำเร็จ
            </h2>

            <p>
                ระบบบันทึกคำสั่งซื้อของคุณแล้ว
            </p>


            <div class="order-number">
                ${escapeHTML(
                    orderNumber
                )}
            </div>


            <div class="result-actions">

                <button
                    class="btn btn-secondary"
                    type="button"
                    id="copyOrderBtn"
                >
                    📋 คัดลอกเลขออเดอร์
                </button>


                <a
                    href="${SHOP.line}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-primary"
                    id="lineOrderBtn"
                >
                    💬 ติดต่อ LINE
                </a>

            </div>

        </div>

    `;


    const copyButton =
        document.getElementById(
            "copyOrderBtn"
        );


    copyButton.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    orderNumber
                );

                copyButton.textContent =
                    "✅ คัดลอกแล้ว";

            } catch {

                alert(
                    "ไม่สามารถคัดลอกอัตโนมัติได้"
                );

            }

        }
    );


    const lineButton =
        document.getElementById(
            "lineOrderBtn"
        );


    const lineMessage =
        createLineMessage(
            orderNumber,
            orderData
        );


    lineButton.href =
        `${SHOP.line}?text=${encodeURIComponent(
            lineMessage
        )}`;


    openModal(
        resultModal
    );

}


/* =========================================================
   CREATE LINE MESSAGE
========================================================= */

function createLineMessage(
    orderNumber,
    orderData
) {

    return [
        `สวัสดีครับ ${SHOP.name}`,
        ``,
        `เลขออเดอร์: ${orderNumber}`,
        `รายการ: ${orderData.game_name}`,
        `แพ็กเกจ: ${orderData.package_name}`,
        `ข้อมูล: ${orderData.game_id}`,
        `ชื่อ: ${orderData.customer_name}`,
        `เบอร์: ${orderData.customer_phone}`,
        `ราคา: ${
            Number(orderData.amount) > 0
                ? `${formatMoney(orderData.amount)} บาท`
                : "ติดต่อร้าน"
        }`,
        ``,
        `หมายเหตุ: ${orderData.note || "-"}`
    ].join("\n");

}


/* =========================================================
   ORDER NUMBER
========================================================= */

function generateOrderNumber() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    const random =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return `SG-${year}${month}${day}-${random}`;

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    if (!gameSearch) return;


    gameSearch.addEventListener(
        "input",
        () => {

            const keyword =
                gameSearch.value
                    .trim()
                    .toLowerCase();


            if (!keyword) {

                renderGames(
                    PRODUCTS.games
                );

                return;

            }


            const filtered =
                PRODUCTS.games.filter(
                    game =>

                        game.name
                            .toLowerCase()
                            .includes(
                                keyword
                            )

                        ||

                        game.description
                            .toLowerCase()
                            .includes(
                                keyword
                            )

                );


            renderGames(
                filtered
            );

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMenu() {

    if (
        !menuToggle ||
        !mainNav
    ) return;


    menuToggle.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle(
                "active"
            );

        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =========================================================
   MEMBER EVENTS
========================================================= */

function setupMemberEvents() {

    const registerButton =
        document.getElementById(
            "openRegisterBtn"
        );

    const loginButton =
        document.getElementById(
            "openLoginBtn"
        );

    const logoutButton =
        document.getElementById(
            "logoutBtn"
        );


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            openRegister
        );

    }


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            openLogin
        );

    }


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }

}


/* =========================================================
   REGISTER
========================================================= */

function openRegister() {

    registerModal.querySelector(
        ".modal-body"
    ).innerHTML = `

        <div class="modal-header">

            <h2>
                👤 สมัครสมาชิก
            </h2>

            <p>
                สร้างบัญชี SAINGAM SHOP
            </p>

        </div>


        <form id="registerForm">

            <div class="form-group">

                <label>
                    Username
                </label>

                <input
                    name="username"
                    type="text"
                    placeholder="ตั้งชื่อผู้ใช้"
                    required
                >

            </div>


            <div class="form-group">

                <label>
                    Email
                </label>

                <input
                    name="email"
                    type="email"
                    placeholder="อีเมล"
                    required
                >

            </div>


            <div class="form-group">

                <label>
                    Password
                </label>

                <input
                    name="password"
                    type="password"
                    placeholder="รหัสผ่าน"
                    minlength="6"
                    required
                >

            </div>


            <button
                class="btn btn-primary"
                type="submit"
                style="width:100%;"
            >
                สมัครสมาชิก
            </button>

        </form>

    `;


    document
        .getElementById(
            "registerForm"
        )
        .addEventListener(
            "submit",
            registerUser
        );


    openModal(
        registerModal
    );

}


/* =========================================================
   REGISTER USER
========================================================= */

async function registerUser(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const username =
        form.username.value.trim();

    const email =
        form.email.value.trim();

    const password =
        form.password.value;


    if (
        !username ||
        !email ||
        !password
    ) {

        alert(
            "กรุณากรอกข้อมูลให้ครบ"
        );

        return;

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signUp({

                email,

                password,

                options: {

                    data: {
                        username:
                            username
                    }

                }

            });


        if (error) {

            alert(
                error.message
            );

            return;

        }


        closeModal(
            registerModal
        );


        if (
            data.user &&
            !data.session
        ) {

            alert(
                "สมัครสมาชิกสำเร็จ\n\n" +
                "กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี"
            );

        } else {

            alert(
                "สมัครสมาชิกสำเร็จ"
            );

        }


        checkCurrentUser();


    } catch (error) {

        console.error(
            error
        );

        alert(
            "เกิดข้อผิดพลาดในการสมัครสมาชิก"
        );

    }

}


/* =========================================================
   LOGIN
========================================================= */

function openLogin() {

    loginModal.querySelector(
        ".modal-body"
    ).innerHTML = `

        <div class="modal-header">

            <h2>
                🔐 เข้าสู่ระบบ
            </h2>

            <p>
                เข้าสู่บัญชี SAINGAM SHOP
            </p>

        </div>


        <form id="loginForm">

            <div class="form-group">

                <label>
                    Email
                </label>

                <input
                    name="email"
                    type="email"
                    placeholder="อีเมล"
                    required
                >

            </div>


            <div class="form-group">

                <label>
                    Password
                </label>

                <input
                    name="password"
                    type="password"
                    placeholder="รหัสผ่าน"
                    required
                >

            </div>


            <button
                class="btn btn-primary"
                type="submit"
                style="width:100%;"
            >
                เข้าสู่ระบบ
            </button>

        </form>

    `;


    document
        .getElementById(
            "loginForm"
        )
        .addEventListener(
            "submit",
            loginUser
        );


    openModal(
        loginModal
    );

}


/* =========================================================
   LOGIN USER
========================================================= */

async function loginUser(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const email =
        form.email.value.trim();

    const password =
        form.password.value;


    try {

        const {
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email,

                password

            });


        if (error) {

            alert(
                error.message
            );

            return;

        }


        closeModal(
            loginModal
        );


        alert(
            "เข้าสู่ระบบสำเร็จ"
        );


        checkCurrentUser();


    } catch (error) {

        console.error(
            error
        );

        alert(
            "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        const {
            error
        } =
            await supabaseClient.auth.signOut();


        if (error) {

            alert(
                error.message
            );

            return;

        }


        alert(
            "ออกจากระบบแล้ว"
        );


        checkCurrentUser();


    } catch (error) {

        console.error(
            error
        );

    }

}


/* =========================================================
   CHECK CURRENT USER
========================================================= */

async function checkCurrentUser() {

    const title =
        document.getElementById(
            "memberTitle"
        );

    const text =
        document.getElementById(
            "memberText"
        );

    const registerButton =
        document.getElementById(
            "openRegisterBtn"
        );

    const loginButton =
        document.getElementById(
            "openLoginBtn"
        );

    const logoutButton =
        document.getElementById(
            "logoutBtn"
        );


    if (
        !title ||
        !text
    ) return;


    try {

        const {
            data
        } =
            await supabaseClient.auth.getUser();


        const user =
            data.user;


        if (user) {

            const username =
                user.user_metadata?.username ||
                user.email ||
                "สมาชิก";


            title.textContent =
                `สวัสดี ${username}`;


            text.textContent =
                "คุณเข้าสู่ระบบแล้ว";


            registerButton?.classList.add(
                "hidden"
            );

            loginButton?.classList.add(
                "hidden"
            );

            logoutButton?.classList.remove(
                "hidden"
            );

        } else {

            title.textContent =
                "ยังไม่ได้เข้าสู่ระบบ";


            text.textContent =
                "สมัครสมาชิกเพื่อใช้งานระบบสมาชิก";


            registerButton?.classList.remove(
                "hidden"
            );

            loginButton?.classList.remove(
                "hidden"
            );

            logoutButton?.classList.add(
                "hidden"
            );

        }

    } catch (error) {

        console.error(
            error
        );

    }

}


/* =========================================================
   AUTH STATE
========================================================= */

supabaseClient.auth.onAuthStateChange(
    () => {

        checkCurrentUser();

    }
);


/* =========================================================
   CATEGORY NAME
========================================================= */

function getCategoryName(
    type
) {

    if (
        type === "game"
    ) {

        return "🎮 เติมเกม";

    }


    if (
        type === "mobile"
    ) {

        return "📱 เติมเงินมือถือ";

    }


    if (
        type === "addon"
    ) {

        return "📶 ซื้อโปรเสริม";

    }


    if (
        type === "service"
    ) {

        return "📦 บริการอื่นๆ";

    }


    return "บริการ";

}


/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(
    amount
) {

    return Number(
        amount || 0
    ).toLocaleString(
        "th-TH",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   UPDATE YEAR
========================================================= */

function updateYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date()
                    .getFullYear();

        }
    );

}
