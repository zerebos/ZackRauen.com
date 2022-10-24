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