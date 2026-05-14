import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

    apiKey: "AIzaSyCqG9bZshg1iyRfjwnTPjzv4QAAfcJSEJk",

    authDomain: "mikarin-65e35.firebaseapp.com",

    projectId: "mikarin-65e35",

    storageBucket: "mikarin-65e35.firebasestorage.app",

    messagingSenderId: "198418754584",

    appId: "1:198418754584:web:1da2013462cd04b81ee76d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


/* =========================
   POPUP
========================= */

const popup =
document.getElementById("popup");

if (popup) {

    setTimeout(() => {

        popup.style.opacity = "0";

    }, 2000);

    setTimeout(() => {

        popup.style.display = "none";

    }, 2500);
}


/* =========================
   TYPING EFFECT
========================= */

const typingElement =
document.getElementById("typing");

const text =
"Yaho, Mika here. I'm just a regular guy who enjoys gacha games and anime. My background is in the hospitality industry, but I also love trying new things outside my comfort zone, which is why I started creating this website. I hope I can keep improving and make this project grow even bigger in the future.";

let index = 0;

function typeEffect() {

    if (typingElement && index < text.length) {

        typingElement.innerHTML +=
        text.charAt(index);

        index++;

        setTimeout(typeEffect, 40);
    }
}

if (typingElement) {

    typeEffect();
}


/* =========================
   SCROLL REVEAL
========================= */

const hiddenElements =
document.querySelectorAll(".hidden");

function revealSections() {

    hiddenElements.forEach((el) => {

        const position =
        el.getBoundingClientRect().top;

        const screenPosition =
        window.innerHeight / 1.3;

        if (position < screenPosition) {

            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealSections);

revealSections();


/* =========================
   BACK TO TOP
========================= */

window.scrollToTop = function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"
    });
};


/* =========================
   GUESTBOOK
========================= */

window.addMessage = async function () {

    const nameInput =
    document.getElementById("name");

    const messageInput =
    document.getElementById("message");

    if (!nameInput || !messageInput) return;

    const name =
    nameInput.value.trim();

    const message =
    messageInput.value.trim();

    if (name === "" || message === "") {

        showPopup("Isi dulu wir");

        return;
    }

    try {

        await addDoc(collection(db, "guestbook"), {

            name: name,

            message: message
        });

        showPopup("ke kirim loh ya");

        nameInput.value = "";

        messageInput.value = "";

        loadMessages();

    } catch (error) {

        console.error(error);

        showPopup("isi dulu lah wir");
    }
};


async function loadMessages() {

    const messagesContainer =
    document.getElementById("messages");

    if (!messagesContainer) return;

    messagesContainer.innerHTML = "";

    try {

        const querySnapshot =
        await getDocs(collection(db, "guestbook"));

        querySnapshot.forEach((doc) => {

            const data = doc.data();

            const div =
            document.createElement("div");

            div.classList.add("message-card");

            div.innerHTML = `

                <h4>${data.name}</h4>
                <p>${data.message}</p>

            `;

            messagesContainer.prepend(div);
        });

    } catch (error) {

        console.error(error);
    }
}

function showPopup(message) {

    const popup =
    document.createElement("div");

    popup.classList.add("custom-popup");

    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.classList.add("show-popup");

    }, 100);

    setTimeout(() => {

        popup.classList.remove("show-popup");

        setTimeout(() => {

            popup.remove();

        }, 500);

    }, 2500);
}

loadMessages();

