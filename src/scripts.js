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

if (galaxy) {
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
    }, isMobile ? 100 : 10);
}

const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + max) + min);
const floatInRange = (min, max) => Math.random() * (max - min + max) + min;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("matrix-canvas");
if (canvas) {
    const context = canvas.getContext("2d");
    context.globalAlpha = 0.5;
    let binaryArray = [];

    function setSize() {
        canvas.height = innerHeight;
        canvas.width = innerWidth;
    }

    function generateColor() {
        let hexSet = "0123456789ABCDEF";
        let finalHexString = "#";
        for (let i = 0; i < 6; i++) {
            finalHexString += hexSet[Math.ceil(Math.random() * 15)];
        }
        return finalHexString;
    }

    function generateParticles(amount) {
        const hadSome = binaryArray.length;
        for (let i = 0; i < amount; i++) {
            if (!hadSome) binaryArray[i] = new Binary();
            else binaryArray.push(new Binary());
        }
    }
    let huh = false;
    function Binary() {
        this.rotate = () => {
            const ls = {
                x: this.x,
                y: this.y,
            };
            // this.theta += this.rotateSpeed;
            // this.x += this.translateSpeed;
            // const data = context.getImageData(this.x, this.y, 1, 1);
            // if (!huh) {
            //     console.log(data);
            //     huh = true;
            // }
            // const percent = (this.y + this.fontSize) / canvas.clientHeight;
            // const rotation = Math.ceil(percent * 360);
            // if (this.special) console.log(this.y, this.fontSize, canvas.clientHeight, percent, rotation);
            // const m = hueRotate(180);
            // const rgb = this.fillColor.replace("rgb(", "").replace(")", "").split(",").map(n => parseFloat(n));
            // rgb.push(255);
            // const nRGB = mmultiply(m, rgb);
            // const nRGB = transformHSV(rgb, rotation);
            // if (this.special) console.log(rgb, rotation, nRGB)
            // this.fillColor = `rgb(${nRGB[0]}, ${nRGB[1]}, ${nRGB[2]})`;
            // console.log(data);
            // const prePercent = ((this.y + this.fontSize) / canvas.clientHeight) * 100;
            this.y += this.translateSpeed;
            // const postPercent = ((this.y + this.fontSize) / canvas.clientHeight) * 100;
            if (this.y - this.fontSize >= canvas.clientHeight) this.randomize();
            // if (Math.floor(prePercent) <= 33 && Math.round(postPercent) > 33) this.fillColor = generateColor();
            // if (Math.floor(prePercent) <= 66 && Math.round(postPercent) > 66) this.fillColor = generateColor();
            // context.beginPath();
            // context.lineWidth = this.particleTrailWidth;
            // context.strokeStyle = this.fillColor;
            // context.moveTo(ls.x, ls.y);
            // context.lineTo(this.x, this.y);
            
            // context.filter = `hue-rotate(${Math.round(percent * 360)}deg)`;
            // if (this.special) console.log(Math.round(percent * 360))
            
            // context.stroke();
            // const percent = (this.y + this.fontSize) / canvas.clientHeight;
            // if (this.special) console.log(percent < 0.5 ? (-2 * percent) + 1 : (2 * percent) - 1)
            // context.globalAlpha = percent < 0.5 ? (-2 * percent) + 1 : (2 * percent) - 1;
            context.fillStyle = this.fillColor;
            context.font = `${this.fontSize}px poppins,Arial,sans-serif`;
            context.fillText(this.value, this.x, this.y);
        };

        this.randomize = () => {
            this.value = randomInRange(0, 1);
            this.x = canvas.clientWidth * Math.random();
            this.y = 0;
            this.fontSize = randomInRange(8, 20);
            this.fillColor = "rgb(1, 139, 188)";
            if (window.rainbow) this.fillColor = generateColor();
            this.translateSpeed = floatInRange(0.5, 2);
            if (!huh) {
                this.special = true;
                huh = true;
            }
        }

        this.randomize();
    }

    function anim() {
        requestAnimationFrame(anim);
        context.fillStyle = "rgba(29,29,29,1)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        binaryArray.forEach((particle) => particle.rotate());
    }

    // generateParticles(300);
    setSize();
    anim();

    for (let i = 0; i < 300; i++) {
        setTimeout(() => generateParticles(1), 10 * i);
    }









    // hueRotate will create a colorMatrix with the hue rotation applied to it
// taken from https://pixijs.github.io/docs/filters_colormatrix_ColorMatrixFilter.js.html
// and therefore from https://stackoverflow.com/questions/8507885/shift-hue-of-an-rgb-color/8510751#8510751
// function hueRotate(rotation) {
//     rotation = (rotation || 0) / 180 * Math.PI;
//     var cosR = Math.cos(rotation),
//       sinR = Math.sin(rotation),
//       sqrt = Math.sqrt;
  
//     var w = 1 / 3,
//       sqrW = sqrt(w);
//     var a00 = cosR + (1.0 - cosR) * w;
//     var a01 = w * (1.0 - cosR) - sqrW * sinR;
//     var a02 = w * (1.0 - cosR) + sqrW * sinR;
//     var a10 = w * (1.0 - cosR) + sqrW * sinR;
//     var a11 = cosR + w * (1.0 - cosR);
//     var a12 = w * (1.0 - cosR) - sqrW * sinR;
//     var a20 = w * (1.0 - cosR) - sqrW * sinR;
//     var a21 = w * (1.0 - cosR) + sqrW * sinR;
//     var a22 = cosR + w * (1.0 - cosR);
//     var matrix = [
//       a00, a01, a02, 0, 0,
//       a10, a11, a12, 0, 0,
//       a20, a21, a22, 0, 0,
//       0, 0, 0, 1, 0,
//     ];
//     return matrix;
//   }
    function mmultiply(m, vector) {
        const R = vector[0];
        const G = vector[1];
        const B = vector[2];
        const A = vector[3];
        const red = (m[0] * R) +(m[1] * G) + (m[2] * B) + (m[3] * A) + (m[4]);
        const green = (m[5] * R) +(m[6] * G) + (m[7] * B) + (m[8] * A) + (m[9]);
        const blue = (m[10] * R) +(m[11] * G) + (m[12] * B) + (m[13] * A) + (m[14]);
        const alpha = (m[15] * R) +(m[16] * G) + (m[17] * B) + (m[18] * A) + (m[19]);
        // return [red, green, blue, alpha];
        return [Math.round(red), Math.round(green), Math.round(blue), Math.round(alpha)];
    }
    function clamp(value) {
        if (value < 0) return 0;
        if (value > 255) return 255;
        return Math.round(value);
    }
    function transformHSV(rgb, rotation) {
        const vsu = Math.cos(rotation * Math.PI / 180);
        const vsw = Math.sin(rotation * Math.PI / 180);
        const R = rgb[0];
        const G = rgb[1];
        const B = rgb[2];
        const red = ((0.299 + 0.701*vsu + 0.168*vsw) * R) + ((0.587 - 0.587*vsu + 0.330*vsw) * G) + ((0.114 - 0.114*vsu - 0.497*vsw) * B);
        const green = ((0.299 - 0.299*vsu - 0.328*vsw) * R) + ((0.587 + 0.413*vsu + 0.035*vsw) * G) + ((0.114 - 0.114*vsu + 0.292*vsw) * B);
        const blue = ((0.299 - 0.300*vsu + 1.25*vsw) * R) - ((0.587 - 0.588*vsu - 1.05*vsw) * G) + ((0.114 + 0.886*vsu - 0.203*vsw) * B);
        return [clamp(red), clamp(green), clamp(blue)];
    }
    function hueRotate(rotation) {
        rotation = (rotation || 0) / 180 * Math.PI;

        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const sqrt = Math.sqrt;

        /* a good approximation for hue rotation
         This matrix is far better than the versions with magic luminance constants
         formerly used here, but also used in the starling framework (flash) and known from this
         old part of the internet: quasimondo.com/archives/000565.php
         This new matrix is based on rgb cube rotation in space. Look here for a more descriptive
         implementation as a shader not a general matrix:
         https://github.com/evanw/glfx.js/blob/58841c23919bd59787effc0333a4897b43835412/src/filters/adjust/huesaturation.js
         This is the source for the code:
         see http://stackoverflow.com/questions/8507885/shift-hue-of-an-rgb-color/8510751#8510751
         */

        const w = 1 / 3;
        const sqrW = sqrt(w); // weight is

        const a00 = cosR + ((1.0 - cosR) * w);
        const a01 = (w * (1.0 - cosR)) - (sqrW * sinR);
        const a02 = (w * (1.0 - cosR)) + (sqrW * sinR);

        const a10 = (w * (1.0 - cosR)) + (sqrW * sinR);
        const a11 = cosR + (w * (1.0 - cosR));
        const a12 = (w * (1.0 - cosR)) - (sqrW * sinR);

        const a20 = (w * (1.0 - cosR)) - (sqrW * sinR);
        const a21 = (w * (1.0 - cosR)) + (sqrW * sinR);
        const a22 = cosR + (w * (1.0 - cosR));

        const matrix = [
            a00, a01, a02, 0, 0,
            a10, a11, a12, 0, 0,
            a20, a21, a22, 0, 0,
            0, 0, 0, 1, 0,
        ];
        return matrix;
    }
    window.transformHSV = transformHSV;
    window.mmultiply = mmultiply;
    window.hueRotate = hueRotate;
  
  function rgbToHsl(arr) {
    var r = arr[0] / 255,
      g = arr[1] / 255,
      b = arr[2] / 255;
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [
      Math.round(h * 360),
      Math.round(s * 100),
      Math.round(l * 100)
    ];
  }
}