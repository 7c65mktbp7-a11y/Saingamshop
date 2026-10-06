/* =========================================================
   ตั้งค่าร้าน
========================================================= */

const SHOP = {

    /*
     * เปลี่ยนเป็น LINE ของร้านคุณ
     *
     * ตัวอย่าง:
     * https://lin.ee/xxxxxxxx
     */
    line: "https://line.me/R/ti/p/@504hanbe",


    /*
     * เปลี่ยนเป็น Facebook Page ของร้านคุณ
     */
    facebook: "https://www.facebook.com/share/19tG2aVwCx/?mibextid=wwXIfr",


    /*
     * เปลี่ยนเป็นเบอร์โทรร้านคุณ
     *
     * ตัวอย่าง:
     * 0812345678
     */
    phone: "0843123861"

};


/* =========================================================
   รายการเกมส์
========================================================= */

/*
 * หมายเหตุ
 *
 * ราคาด้านล่างเป็นเพียงตัวอย่าง
 * ให้เปลี่ยนเป็นราคาจริงของร้าน
 *
 */

const games = [

    {
        name: "ROV",

        icon: "🎮",

        description: "Garena RoV",

        packages: [
            ["60 คูปอง", 20],
            ["110 คูปอง", 35],
            ["310 คูปอง", 95]
        ]
    },


    {
        name: "Free Fire",

        icon: "🔥",

        description: "เติมเพชร",

        packages: [
            ["100 Diamonds", 35],
            ["310 Diamonds", 99],
            ["520 Diamonds", 159]
        ]
    },


    {
        name: "PUBG Mobile",

        icon: "🔫",

        description: "เติม UC",

        packages: [
            ["60 UC", 35],
            ["325 UC", 169],
            ["660 UC", 329]
        ]
    },


    {
        name: "Mobile Legends",

        icon: "⚔️",

        description: "เติม Diamonds",

        packages: [
            ["86 Diamonds", 35],
            ["172 Diamonds", 69],
            ["257 Diamonds", 99]
        ]
    },


    {
        name: "Genshin Impact",

        icon: "✨",

        description: "Genesis Crystals",

        packages: [
            ["60 Crystals", 35],
            ["300 Crystals", 169],
            ["980 Crystals", 499]
        ]
    },


    {
        name: "Honkai: Star Rail",

        icon: "🚄",

        description: "Oneiric Shards",

        packages: [
            ["60 Shards", 35],
            ["300 Shards", 169],
            ["980 Shards", 499]
        ]
    },


    {
        name: "Ragnarok",

        icon: "🧙",

        description: "แพ็กเกจเติมเกม",

        packages: [
            ["แพ็กเริ่มต้น", 50],
            ["แพ็กกลาง", 150],
            ["แพ็กใหญ่", 300]
        ]
    },


    {
        name: "Wuthering Waves",

        icon: "🌊",

        description: "เติม Lunite",

        packages: [
            ["60 Lunite", 35],
            ["300 Lunite", 169],
            ["980 Lunite", 499]
        ]
    },


    {
        name: "Heartopia",

        icon: "💗",

        description: "เติมสกุลเงินในเกม",

        packages: [
            ["แพ็กเล็ก", 30],
            ["แพ็กกลาง", 99],
            ["แพ็กใหญ่", 299]
        ]
    },


    {
        name: "Rainbow Six Mobile",

        icon: "🎯",

        description: "เติมเครดิต",

        packages: [
            ["แพ็กเล็ก", 50],
            ["แพ็กกลาง", 150],
            ["แพ็กใหญ่", 300]
        ]
    },


    {
        name: "MONGIL: STAR DIVE",

        icon: "⭐",

        description: "เติมแพ็กเกจ",

        packages: [
            ["แพ็กเล็ก", 50],
            ["แพ็กกลาง", 150],
            ["แพ็กใหญ่", 300]
        ]
    },


    {
        name: "Kuroko Basketball",

        icon: "🏀",

        description: "Street Rivals",

        packages: [
            ["แพ็กเล็ก", 50],
            ["แพ็กกลาง", 150],
            ["แพ็กใหญ่", 300]
        ]
    },


    {
        name: "Gangstar Mirage City",

        icon: "🏙️",

        description: "เติมแพ็กเกจ",

        packages: [
            ["แพ็กเล็ก", 50],
            ["แพ็กกลาง", 150],
            ["แพ็กใหญ่", 300]
        ]
    },


    {
        name: "Aniimo",

        icon: "🐾",

        description: "เติมด้วย UID",

        packages: [
            ["แพ็กเล็ก", 30],
            ["แพ็กกลาง", 99],
            ["แพ็กใหญ่", 299]
        ]
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const gameGrid =
    document.getElementById("gameGrid");

const gameSearch =
    document.getElementById("gameSearch");

const noGames =
    document.getElementById("noGames");

const orderModal =
    document.getElementById("orderModal");

const orderForm =
    document.getElementById("orderForm");

const orderResult =
    document.getElementById("orderResult");

const navigation =
    document.getElementById("navigation");

const menuButton =
    document.getElementById("menuButton");


/* =========================================================
   MONEY
========================================================= */

function formatMoney(number) {

    return "฿" +
        Number(number).toLocaleString("th-TH");

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   RENDER GAMES
========================================================= */

function renderGames(gameList = games) {

    gameGrid.innerHTML = "";


    if (gameList.length === 0) {

        noGames.hidden = false;

        return;

    }


    noGames.hidden = true;


    gameList.forEach(game => {

        const article =
            document.createElement("article");

        article.className = "game-card";


        let priceHTML = "";


        game.packages.forEach(pack => {

            priceHTML += `

                <div class="price-row">

                    <span>
                        ${escapeHtml(pack[0])}
                    </span>

                    <b>
                        ${formatMoney(pack[1])}
                    </b>

                </div>

            `;

        });


        article.innerHTML = `

            <div class="game-icon">

                ${game.icon}

            </div>


            <h3>

                ${escapeHtml(game.name)}

            </h3>


            <p>

                ${escapeHtml(game.description)}

            </p>


            <div class="price-list">

                ${priceHTML}

            </div>


            <button
                class="button button-primary button-full"
                type="button"
            >

                🛒 สั่งเติมเกม

            </button>

        `;


        const orderButton =
            article.querySelector("button");


        orderButton.addEventListener(
            "click",
            function () {

                openOrder(game.name);

            }
        );


        gameGrid.appendChild(article);

    });

}


/* =========================================================
   SEARCH GAME
========================================================= */

gameSearch.addEventListener(
    "input",
    function () {

        const keyword =
            gameSearch.value
                .trim()
                .toLowerCase();


        if (!keyword) {

            renderGames(games);

            return;

        }


        const filteredGames =
            games.filter(game => {

                const text =
                    (
                        game.name +
                        " " +
                        game.description
                    ).toLowerCase();


                return text.includes(keyword);

            });


        renderGames(filteredGames);

    }
);


/* =========================================================
   OPEN ORDER
========================================================= */

function openOrder(service) {

    const serviceInput =
        document.getElementById(
            "serviceInput"
        );


    const selectedService =
        document.getElementById(
            "selectedService"
        );


    serviceInput.value =
        service;


    selectedService.textContent =
        "บริการ: " + service;


    orderForm.reset();


    serviceInput.value =
        service;


    orderResult.hidden = true;

    orderResult.innerHTML = "";


    orderModal.classList.add("show");


    orderModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE ORDER
========================================================= */

function closeOrder() {

    orderModal.classList.remove(
        "show"
    );


    orderModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   CLICK OUTSIDE MODAL
========================================================= */

orderModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            orderModal
        ) {

            closeOrder();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeOrder();

        }

    }
);


/* =========================================================
   GENERATE ORDER NUMBER
========================================================= */

function generateOrderNumber() {

    const now =
        new Date();


    const year =
        now.getFullYear()
            .toString()
            .slice(-2);


    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            now.getDate()
        ).padStart(2, "0");


    const random =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return (
        "TP" +
        year +
        month +
        day +
        random
    );

}


/* =========================================================
   CREATE ORDER MESSAGE
========================================================= */

orderForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const service =
            document.getElementById(
                "serviceInput"
            ).value;


        const name =
            document.getElementById(
                "customerName"
            ).value.trim();


        const phone =
            document.getElementById(
                "customerPhone"
            ).value.trim();


        const gameId =
            document.getElementById(
                "gameId"
            ).value.trim();


        const packageName =
            document.getElementById(
                "packageInput"
            ).value.trim();


        const note =
            document.getElementById(
                "note"
            ).value.trim()
            || "-";


        const orderNumber =
            generateOrderNumber();


        const message =

`📋 รายการสั่งซื้อ

เลขออเดอร์: ${orderNumber}

บริการ:
${service}

ชื่อ:
${name}

เบอร์โทร:
${phone}

UID / เบอร์มือถือ:
${gameId}

แพ็กเกจ / จำนวนเงิน:
${packageName}

หมายเหตุ:
${note}`;


        /*
         * เก็บข้อความไว้เพื่อใช้ส่ง LINE
         */

        window.currentOrderMessage =
            message;


        /*
         * แสดงผลให้ลูกค้าตรวจสอบ
         */

        orderResult.hidden =
            false;


        orderResult.innerHTML = `

            <strong>
                ✅ สร้างออเดอร์เรียบร้อย
            </strong>

            <pre>
${escapeHtml(message)}
            </pre>

            <button
                type="button"
                class="button button-primary button-full"
                onclick="sendOrderToLine()"
            >

                💬 ส่งรายละเอียดทาง LINE

            </button>

        `;

    }
);


/* =========================================================
   SEND ORDER TO LINE
========================================================= */

function sendOrderToLine() {

    const message =
        window.currentOrderMessage
        || "ต้องการสั่งเติมเกม";


    /*
     * เปิด LINE
     *
     * หมายเหตุ:
     *
     * เว็บไซต์ทั่วไปไม่สามารถบังคับ
     * ส่งข้อความเข้า LINE OA ของร้าน
     * โดยตรงได้ด้วย URL ธรรมดา
     *
     * ส่วนนี้จึงเปิด LINE ของร้านก่อน
     *
     * หากต้องการระบบส่งออเดอร์อัตโนมัติ
     * ต้องเชื่อม LINE Messaging API
     * หรือระบบหลังบ้านเพิ่มเติม
     */

    const lineURL =https://lin.ee/vf78tz0
        SHOP.line;


    window.open(
        lineURL,
        "_blank"
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

menuButton.addEventListener(
    "click",
    function () {

        navigation.classList.toggle(
            "open"
        );

    }
);


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

const navigationLinks =
    navigation.querySelectorAll("a");


navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                navigation.classList.remove(
                    "open"
                );

            }
        );

    }
);


/* =========================================================
   YEAR
========================================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


/* =========================================================
   UPDATE CONTACT LINKS
========================================================= */

function updateContactLinks() {

    const lineLinks =https://lin.ee/vf78tz0
        document.querySelectorAll(
            ".line-button"
        );


    lineLinks.forEach(
        function (link) {

            link.href =
                SHOP.line;

        }
    );


    const facebookLinks =https://www.facebook.com/share/19gfEFKkBY/?mibextid=wwXIfr
        document.querySelectorAll(
            ".facebook-button"
        );


    facebookLinks.forEach(
        function (link) {

            link.href =
                SHOP.facebook;

        }
    );


    const phoneLinks =0843123861
        document.querySelectorAll(
            ".phone-button"
        );


    phoneLinks.forEach(
        function (link) {

            link.href =
                "tel:" +66843123861
                SHOP.phone;

        }
    );

}


/* =========================================================
   START WEBSITE
========================================================= */

renderGames();

updateContactLinks();
