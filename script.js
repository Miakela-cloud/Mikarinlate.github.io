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



const text =
"Yaho, Mika here. I'm just a regular guy who enjoys gacha games and anime. My background is in the hospitality industry, but I also love trying new things outside my comfort zone, which is why I started creating this website. I hope I can keep improving and make this project grow even bigger in the future.";

const typingElement =
document.getElementById("typing");

let index = 0;

function typeEffect() {

    if (typingElement && index < text.length) {

        typingElement.innerHTML +=
        text.charAt(index);

        index++;

        setTimeout(typeEffect, 40);
    }
}

typeEffect();



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