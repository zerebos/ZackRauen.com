// Animated "job title" typewriter effect shown in the hero section.

const vowels = ["a", "e", "i", "o", "u"];
const jobTitle = document.querySelector<HTMLElement>("#jobtitle");

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

async function addJobTitle(title: string) {
    if (!jobTitle) return;
    for (const char of title) {
        if (char !== " ") await delay(300);
        jobTitle.textContent += char;
    }
}

async function removeJobTitle() {
    if (!jobTitle) return;
    const length = jobTitle.textContent?.length ?? 0;
    for (let i = 0; i < length; i++) {
        const text = jobTitle.textContent ?? "";
        if (text[text.length - 1] !== " ") await delay(150);
        jobTitle.textContent = text.substring(0, text.length - 1);
    }
}

let validTitles = ["Engineer", "Developer", "Thinker", "Creator", "Designer", "Researcher", "Educator"]
    .map(title => (vowels.includes(title.charAt(0).toLowerCase()) ? `an ${title}` : `a ${title}`));

function getNextTitle(currentTitle: string): string {
    let nextIndex = validTitles.indexOf(currentTitle) + 1;
    if (nextIndex >= validTitles.length) {
        nextIndex = 0;
        validTitles = validTitles.sort(() => Math.random() - 0.5);
    }
    return validTitles[nextIndex];
}

if (jobTitle) {
    jobTitle.textContent = "";
    void (async () => {
        await delay(1500);
        let nextTitle = getNextTitle(jobTitle.textContent ?? "");
        while (true) {
            await addJobTitle(nextTitle);
            await delay(1500);
            nextTitle = getNextTitle(jobTitle.textContent ?? "");
            await removeJobTitle();
            await delay(750);
        }
    })();
}
