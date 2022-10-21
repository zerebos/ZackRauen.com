// const jobTitle = document.querySelector("#jobtitle");
// const currentText = jobTitle.textContent;
// jobTitle.textContent = "";
// for (let i = 0; i < currentText.length; i++) {
//     setTimeout(() => {
//         jobTitle.textContent += currentText[i];
//     }, 400 * (i + 1));
// }

// jobTitle.addEventListener("click", () => {
//     for (let i = 0; i < currentText.length; i++) {
//         setTimeout(() => {
//             jobTitle.textContent = jobTitle.textContent.substring(0, jobTitle.textContent.length - 1);
//         }, 400 * (i + 1));
//     }
// })

const vowels = ["a", "e", "i", "o", "u"]
async function addJobTitle(title) {
    const jobTitle = document.querySelector("#jobtitle");
    for (let i = 0; i < title.length; i++) {
        if (title[i] !== " ") await new Promise(r => setTimeout(r, 300));
        jobTitle.textContent += title[i];
    }
}

async function removeJobTitle() {
    const jobTitle = document.querySelector("#jobtitle");
    const length = jobTitle.textContent.length;
    for (let i = 0; i < length; i++) {
        if (jobTitle.textContent[jobTitle.textContent.length - 1] !== " ") await new Promise(r => setTimeout(r, 150));
        jobTitle.textContent = jobTitle.textContent.substring(0, jobTitle.textContent.length - 1);
    }
}


let validTitles = ["Engineer", "Developer", "Thinker", "Creator", "Designer", "Researcher", "Educator"].map(t => vowels.includes(t[0].toLowerCase()) ? `an ${t}` : `a ${t}`)
function getNextTitle(currentTitle) {
    let currentIndex = validTitles.indexOf(currentTitle);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= validTitles.length) {
        nextIndex = 0
        validTitles = validTitles.sort(() => Math.random() - 0.5);
    }

    return validTitles[nextIndex];
}


const jobTitle = document.querySelector("#jobtitle");
jobTitle.textContent = "";
new Promise(r => setTimeout(r, 1500)).then(async () => {
    let nextTitle = getNextTitle(jobTitle.textContent);
    while (true) {
        // while (nextTitle === previousTitle) nextTitle = validTitles[Math.floor(Math.random() * validTitles.length)]
        await addJobTitle(nextTitle);
        await new Promise(r => setTimeout(r, 1500));

        nextTitle = getNextTitle(jobTitle.textContent);
        await removeJobTitle();
        await new Promise(r => setTimeout(r, 750));
    }
});


const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
const scrollElements = document.querySelectorAll(".animate-on-scroll, .resume-entry");
const getViewportHeight = () => window.innerHeight || document.documentElement.clientHeight;
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= getViewportHeight() / dividend;
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > getViewportHeight();
};

const displayScrollElement = (element) => {
    if (!isMobile) element.classList.add("animate");
};

const hideScrollElement = (element) => {
    if (!isMobile) element.classList.remove("animate");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.05)) displayScrollElement(el);
        // else if (elementOutofView(el)) hideScrollElement(el);
    })
}

window.addEventListener("scroll", () => { 
    handleScrollAnimation();
});




const menuButton = document.querySelector("#menuButton");
menuButton.addEventListener("click", () => {
    menuButton.parentElement.parentElement.classList.toggle("expanded");
})













const SCROLL_OFFSET = document.querySelector("#main-nav").clientHeight + 40;
const mainNavLinks = document.querySelectorAll("#main-nav ul li a");
window.addEventListener("scroll", event => {
    const fromTop = window.scrollY + SCROLL_OFFSET;

    for (let l = 0; l < mainNavLinks.length; l++) {
        const link = mainNavLinks[l];
        const section = document.querySelector(link.hash);

        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }
});


const resumeNavLinks = document.querySelectorAll("#resume-nav ul li a");
window.addEventListener("scroll", event => {
    const fromTop = window.scrollY + SCROLL_OFFSET;

    for (let l = 0; l < resumeNavLinks.length; l++) {
        const link = resumeNavLinks[l];
        const section = document.querySelector(link.hash);

        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }
});


/** @type {HTMLFormElement} */
const contactForm = document.getElementById("contactform");
contactForm.addEventListener("submit", async event => {
    event.preventDefault();
    try {
        const payload = {
            accessKey: "ac71a6cb-698e-426a-9a75-55586ff530f1",
            name: contactForm.elements.namedItem("name").value,
            email: contactForm.elements.namedItem("email").value,
            subject: contactForm.elements.namedItem("subject").value,
            honeypot: contactForm.elements.namedItem("honeypot").value,
            message: contactForm.elements.namedItem("message").value,
            replyTo: "@"
        };
        
        const result = await fetch(contactForm.action, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        const json = await result.json();
        const submitButton = contactForm.querySelector("button");
        if (json.success) {
            contactForm.reset();
            submitButton.classList.replace("btn-primary", "btn-success");
            submitButton.textContent = "Message Sent!";
        }
        else {
            submitButton.classList.replace("btn-primary", "btn-danger");
            submitButton.textContent = "Could Not Send!";
            submitButton.disabled = true;
        }
        setTimeout(() => {
            submitButton.classList.replace(json.success ? "btn-success" : "btn-danger", "btn-primary");
            submitButton.textContent = "Send Message!";
            submitButton.disabled = false;
        }, 5000);
    }
    catch (error) {
        const submitButton = contactForm.querySelector("button");
        submitButton.classList.replace("btn-primary", "btn-danger");
        submitButton.textContent = "Something Went Wrong!";
        submitButton.disabled = true;
    }
})










// Random Stars
// var generateStars = function(){
    
//     var $galaxy = document.getElementById("galaxy");
//     var iterator = 0;
    
//     while (iterator <= 100){
//         var xposition = Math.random();
//         var yposition = Math.random();
//         var star_type = Math.floor((Math.random() * 3) + 1);
//         var position = {
//             "x" : $galaxy.width() * xposition,
//             "y" : $galaxy.height() * yposition,
//         };
        
//         $('<div class="star star-type' + star_type + '"></div>').appendTo($galaxy).css({
//             "top" : position.y,
//             "left" : position.x
//         });
        
//         iterator++;
//     }
    
// };

// generateStars();







const NUM_OF_STARS_PER_INTERVAL = 3;
const galaxy = document.getElementById("matrix");

function addStar() {
    const value = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    const binary = document.createElement("div");
    const binarySize = Math.floor((Math.random() * 3) + 1);
    // const binaryTwinkle = Math.floor((Math.random() * 3) + 1);
    binary.className = `binary binary-size${binarySize}`;
    // binary.style.top = galaxy.clientHeight * Math.random();
    binary.style.left = galaxy.clientWidth * Math.random();
    // binary.dataset.width = binary.style.left;
    binary.textContent = value;
    galaxy.append(binary);
    const timeout = binarySize == 1 ? 3000 : binarySize == 2 ? 5000 : 7000;
    setTimeout(() => {binary.remove();}, timeout);
}

// for (let s = 0; s < NUM_OF_STARS; s++) {
//     addStar();
// }

setInterval(() => {
    for (let s = 0; s < NUM_OF_STARS_PER_INTERVAL; s++) {
        addStar();
    }
}, 10);

// const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + max) + min);
// const floatInRange = (min, max) => Math.random() * (max - min + max) + min;


// const canvas = document.getElementById("matrix-canvas");
// const context = canvas.getContext("2d");
// context.globalAlpha = 0.5;
// let binaryArray = [];

// function setSize() {
//     canvas.height = innerHeight;
//     canvas.width = innerWidth;
//   }

// function generateColor() {
//     let hexSet = "0123456789ABCDEF";
//     let finalHexString = "#";
//     for (let i = 0; i < 6; i++) {
//       finalHexString += hexSet[Math.ceil(Math.random() * 15)];
//     }
//     return finalHexString;
// }

// function generateParticles(amount) {
//     for (let i = 0; i < amount; i++) {
//       binaryArray[i] = new Binary();
//     }
//   }

// function Binary() {
//     this.rotate = () => {
//         const ls = {
//             x: this.x,
//             y: this.y,
//         };
//         this.theta += this.rotateSpeed;
//         // this.x += this.translateSpeed;
//         this.y += this.translateSpeed;
//         if (this.y - this.fontSize >= canvas.clientHeight) this.randomize();
//         // context.beginPath();
//         // context.lineWidth = this.particleTrailWidth;
//         // context.strokeStyle = this.fillColor;
//         // context.moveTo(ls.x, ls.y);
//         // context.lineTo(this.x, this.y);
        
//         // context.stroke();
//         context.fillStyle = this.fillColor;
//         context.font = `${this.fontSize}px poppins,Arial,sans-serif`;
//         context.fillText(this.value, this.x, this.y);
//     };

//     this.randomize = () => {
//         this.value = randomInRange(0, 1);
//         this.x = canvas.clientWidth * Math.random();
//         this.y = 0;
//         this.fontSize = randomInRange(8, 20);
//         this.fillColor = generateColor();
//         this.translateSpeed = floatInRange(0.5, 2);
//     }

//     this.randomize();
// }

//   function anim() {
//     requestAnimationFrame(anim);
//     context.fillStyle = "rgba(29,29,29,1)";
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     binaryArray.forEach((particle) => particle.rotate());
//   }

// generateParticles(300);
// setSize();
// anim();