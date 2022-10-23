const menuButton = document.querySelector("#menuButton");
menuButton.addEventListener("click", () => {
    menuButton.parentElement.parentElement.classList.toggle("expanded");
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