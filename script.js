/* =========================================================
   SUPABASE
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
   ตั้งค่าร้าน
========================================================= */

const SHOP = {

    line:
        "https://lin.ee/9q139qW",

    facebook:
        "https://www.facebook.com/share/1MwmyTJfCb/?mibextid=wwXIfr",

    phone:
        "0843123861"

};


/* =========================================================
   รายการเกมส์
========================================================= */

const games = [

    {
        name: "ROV",
        icon: "🎮",
        description: "Garena RoV",

        packages: [
            ["11 คูปอง", 10],
            ["24 คูปอง", 19],
            ["35 คูปอง", 29],
            ["48 คูปอง", 39],
            ["60 คูปอง", 49],
            ["71 คูปอง", 59],
            ["84 คูปอง", 69],
            ["95 คูปอง", 79],
            ["110 คูปอง", 89],
            ["121 คูปอง", 99],
            ["134 คูปอง", 109],
            ["145 คูปอง", 119]
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

        article.className =
            "game-card";


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
   SEARCH
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


    orderForm.reset();


    serviceInput.value =
        service;


    selectedService.textContent =
        "บริการ: " + service;


    orderResult.hidden =
        true;


    orderResult.innerHTML =
        "";


    orderModal.classList.add(
        "show"
    );


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
   CLICK OUTSIDE
========================================================= */

orderModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === orderModal
        ) {

            closeOrder();

        }

    }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeOrder();

            closeMemberModal();

        }

    }
);


/* =========================================================
   ORDER NUMBER
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
   ORDER FORM
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


        window.currentOrderMessage =
            message;


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
   LINE
========================================================= */

function sendOrderToLine() {

    const lineURL =
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
   CONTACT
========================================================= */

function updateContactLinks() {

    document
        .querySelectorAll(".line-button")
        .forEach(function (link) {

            link.href =
                SHOP.line;

        });


    document
        .querySelectorAll(".facebook-button")
        .forEach(function (link) {

            link.href =
                SHOP.facebook;

        });


    document
        .querySelectorAll(".phone-button")
        .forEach(function (link) {

            link.href =
                "tel:" + SHOP.phone;

        });

}


/* =========================================================
   MEMBER ELEMENTS
========================================================= */

const memberModal =
    document.getElementById(
        "memberModal"
    );


const registerBox =
    document.getElementById(
        "registerBox"
    );


const loginBox =
    document.getElementById(
        "loginBox"
    );


const registerForm =
    document.getElementById(
        "registerForm"
    );


const loginForm =
    document.getElementById(
        "loginForm"
    );


const memberLoggedOut =
    document.getElementById(
        "memberLoggedOut"
    );


const memberLoggedIn =
    document.getElementById(
        "memberLoggedIn"
    );


const loggedInUsername =
    document.getElementById(
        "loggedInUsername"
    );


/* =========================================================
   OPEN REGISTER
========================================================= */

function openRegister() {

    memberModal.classList.add(
        "show"
    );


    memberModal.setAttribute(
        "aria-hidden",
        "false"
    );


    registerBox.hidden =
        false;


    loginBox.hidden =
        true;

}


/* =========================================================
   OPEN LOGIN
========================================================= */

function openLogin() {

    memberModal.classList.add(
        "show"
    );


    memberModal.setAttribute(
        "aria-hidden",
        "false"
    );


    registerBox.hidden =
        true;


    loginBox.hidden =
        false;

}


/* =========================================================
   SHOW REGISTER
========================================================= */

function showRegisterBox() {

    registerBox.hidden =
        false;


    loginBox.hidden =
        true;

}


/* =========================================================
   SHOW LOGIN
========================================================= */

function showLoginBox() {

    registerBox.hidden =
        true;


    loginBox.hidden =
        false;

}


/* =========================================================
   CLOSE MEMBER
========================================================= */

function closeMemberModal() {

    memberModal.classList.remove(
        "show"
    );


    memberModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   MEMBER OUTSIDE CLICK
========================================================= */

memberModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === memberModal
        ) {

            closeMemberModal();

        }

    }
);


/* =========================================================
   REGISTER
========================================================= */

registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const username =
            document
                .getElementById(
                    "registerUsername"
                )
                .value
                .trim();


        const email =
            document
                .getElementById(
                    "registerEmail"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "registerPassword"
                )
                .value;


        if (
            username.length < 3
        ) {

            alert(
                "Username ต้องมีอย่างน้อย 3 ตัวอักษร"
            );

            return;

        }


        if (
            password.length < 6
        ) {

            alert(
                "Password ต้องมีอย่างน้อย 6 ตัวอักษร"
            );

            return;

        }


        const button =
            document.getElementById(
                "registerSubmit"
            );


        button.disabled =
            true;


        button.textContent =
            "กำลังสมัครสมาชิก...";


        try {

            const {
                data,
                error
            } =
                await supabaseClient.auth.signUp({

                    email:
                        email,

                    password:
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
                    "สมัครสมาชิกไม่สำเร็จ: " +
                    error.message
                );

                return;

            }


            if (!data.user) {

                alert(
                    "ไม่สามารถสร้างบัญชีได้ กรุณาลองใหม่อีกครั้ง"
                );

                return;

            }


            /*
             * ถ้ามี Session ทันที
             * แสดงว่าสามารถเข้าสู่ระบบได้ทันที
             */

            if (data.session) {

                await saveMember(
                    data.user.id,
                    username
                );


                alert(
                    "สมัครสมาชิกสำเร็จแล้ว 🎉"
                );


                registerForm.reset();


                closeMemberModal();


                await loadMember();

            } else {

                /*
                 * กรณีต้องยืนยัน Email
                 */

                alert(
                    "สมัครสมาชิกสำเร็จแล้วครับ 🎉\n\n" +
                    "กรุณาตรวจสอบ Email เพื่อยืนยันบัญชี " +
                    "แล้วจึงเข้าสู่ระบบ"
                );


                registerForm.reset();


                showLoginBox();

            }


        } catch (error) {

            console.error(
                error
            );


            alert(
                "เกิดข้อผิดพลาด: " +
                error.message
            );


        } finally {

            button.disabled =
                false;


            button.textContent =
                "สมัครสมาชิก";

        }

    }
);


/* =========================================================
   SAVE MEMBER
========================================================= */

async function saveMember(
    authUserId,
    username
) {

    const {
        data: existing
    } =
        await supabaseClient
            .from("members")
            .select("id, username")
            .eq(
                "auth_user_id",
                authUserId
            )
            .maybeSingle();


    if (existing) {

        return true;

    }


    const {
        error
    } =
        await supabaseClient
            .from("members")
            .insert({

                username:
                    username,

                auth_user_id:
                    authUserId

            });


    if (error) {

        /*
         * ไม่ทำให้การสมัครสมาชิกพัง
         * เพราะบัญชี Auth ถูกสร้างแล้ว
         */

        console.error(
            "ไม่สามารถบันทึก members:",
            error
        );

        return false;

    }


    return true;

}


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById(
                    "loginEmail"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "loginPassword"
                )
                .value;


        const button =
            document.getElementById(
                "loginSubmit"
            );


        button.disabled =
            true;


        button.textContent =
            "กำลังเข้าสู่ระบบ...";


        try {

            const {
                data,
                error
            } =
                await supabaseClient.auth.signInWithPassword({

                    email:
                        email,

                    password:
                        password

                });


            if (error) {

                alert(
                    "เข้าสู่ระบบไม่สำเร็จ: " +
                    error.message
                );

                return;

            }


            const username =
                data.user
                    .user_metadata
                    ?.username;


            if (username) {

                await saveMember(
                    data.user.id,
                    username
                );

            }


            alert(
                "เข้าสู่ระบบสำเร็จครับ 🎉"
            );


            loginForm.reset();


            closeMemberModal();


            await loadMember();


        } catch (error) {

            console.error(
                error
            );


            alert(
                "เกิดข้อผิดพลาด: " +
                error.message
            );


        } finally {

            button.disabled =
                false;


            button.textContent =
                "เข้าสู่ระบบ";

        }

    }
);


/* =========================================================
   LOAD MEMBER
========================================================= */

async function loadMember() {

    try {

        const {
            data: {
                session
            }
        } =
            await supabaseClient.auth.getSession();


        if (!session) {

            memberLoggedOut.hidden =
                false;


            memberLoggedIn.hidden =
                true;


            return;

        }


        const username =
            session.user
                .user_metadata
                ?.username
            ||
            session.user.email;


        loggedInUsername.textContent =
            username;


        memberLoggedOut.hidden =
            true;


        memberLoggedIn.hidden =
            false;


    } catch (error) {

        console.error(
            error
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    const {
        error
    } =
        await supabaseClient.auth.signOut();


    if (error) {

        alert(
            "ออกจากระบบไม่สำเร็จ: " +
            error.message
        );

        return;

    }


    memberLoggedOut.hidden =
        false;


    memberLoggedIn.hidden =
        true;


    alert(
        "ออกจากระบบแล้วครับ"
    );

}


/* =========================================================
   AUTH STATE
========================================================= */

supabaseClient.auth.onAuthStateChange(
    function () {

        loadMember();

    }
);


/* =========================================================
   START WEBSITE
========================================================= */

renderGames();

updateContactLinks();

loadMember();
