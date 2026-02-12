const vowels = ["a", "e", "i", "o", "u"];
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


let validTitles = ["Engineer", "Developer", "Thinker", "Creator", "Designer", "Researcher", "Educator"].map(t => vowels.includes(t[0].toLowerCase()) ? `an ${t}` : `a ${t}`);
function getNextTitle(currentTitle) {
    const currentIndex = validTitles.indexOf(currentTitle);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= validTitles.length) {
        nextIndex = 0;
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


let captchaCode;
const CAPTCHA_LENGTH = 6;
const captchaChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function createCaptcha() {
    const captcha = [];
    for (let i = 0; i < CAPTCHA_LENGTH; i++) {
        const index = Math.floor(Math.random() * captchaChars.length + 1); // Get the next character from the array
        if (captcha.indexOf(captchaChars[index]) == -1) captcha.push(captchaChars[index]);
        else i--;
    }
    const canv = document.getElementById("captcha");
    canv.width = 100;
    canv.height = 28.8;
    const ctx = canv.getContext("2d");
    ctx.font = "20px Georgia, serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(captcha.join(""), 0, 20);
    captchaCode = captcha.join("");
}

/** @type {HTMLFormElement} */
const contactForm = document.getElementById("contactform");
const submitButton = contactForm.querySelector("button");
contactForm.addEventListener("submit", async event => {
    event.preventDefault();

    const submittedCode = contactForm.elements.namedItem("filter").value;
    if (submittedCode !== captchaCode) {
        submitButton.classList.replace("btn-primary", "btn-danger");
        submitButton.textContent = "Incorrect Captcha!";
        submitButton.disabled = true;

        setTimeout(() => {
            createCaptcha();
            submitButton.classList.replace("btn-danger", "btn-primary");
            submitButton.textContent = "Send Message!";
            submitButton.disabled = false;
        }, 3000);

        return;
    }

    try {
        const payload = {
            accessKey: "ac71a6cb-698e-426a-9a75-55586ff530f1",
            name: contactForm.elements.namedItem("name").value,
            email: contactForm.elements.namedItem("email").value,
            subject: contactForm.elements.namedItem("subject").value,
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
    catch {
        submitButton.classList.replace("btn-primary", "btn-danger");
        submitButton.textContent = "Something Went Wrong!";
        submitButton.disabled = true;
        // console.error(error);
    }
});

createCaptcha();