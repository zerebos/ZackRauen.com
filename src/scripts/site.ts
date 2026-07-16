// Site-wide interactions: the mobile menu toggle, scroll-triggered reveal
// animations, and active-section highlighting for the primary and resume navs.

const menuButton = document.querySelector<HTMLButtonElement>("#menuButton");
menuButton?.addEventListener("click", () => {
    menuButton.parentElement?.parentElement?.classList.toggle("expanded");
});

const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
const scrollElements = document.querySelectorAll<HTMLElement>(".animate-on-scroll, .resume-entry");
const getViewportHeight = () => window.innerHeight || document.documentElement.clientHeight;

const elementInView = (el: Element, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= getViewportHeight() / dividend;
};

const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
        if (!isMobile && elementInView(el, 1.05)) el.classList.add("animate");
    });
};

window.addEventListener("scroll", handleScrollAnimation);
// Reveal anything already in view on load.
handleScrollAnimation();

const mainNav = document.querySelector<HTMLElement>("#main-nav");
const scrollOffset = (mainNav?.clientHeight ?? 0) + 40;

function highlightActiveLinks(links: NodeListOf<HTMLAnchorElement>) {
    const fromTop = window.scrollY + scrollOffset;
    links.forEach(link => {
        const section = link.hash ? document.querySelector<HTMLElement>(link.hash) : null;
        if (!section) return;
        const active = section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
        link.classList.toggle("active", active);
    });
}

const mainNavLinks = document.querySelectorAll<HTMLAnchorElement>("#main-nav ul li a");
const resumeNavLinks = document.querySelectorAll<HTMLAnchorElement>("#resume-nav ul li a");

window.addEventListener("scroll", () => {
    highlightActiveLinks(mainNavLinks);
    highlightActiveLinks(resumeNavLinks);
});
