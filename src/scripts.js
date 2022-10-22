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







const menuButton = document.querySelector("#menuButton");
menuButton.addEventListener("click", () => {
    menuButton.parentElement.parentElement.classList.toggle("expanded");
});













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
});