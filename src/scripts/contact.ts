// Contact form: a lightweight canvas captcha plus submission to StaticForms.

let captchaCode = "";
const CAPTCHA_LENGTH = 6;
const captchaChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function createCaptcha() {
    const captcha: string[] = [];
    for (let i = 0; i < CAPTCHA_LENGTH; i++) {
        const char = captchaChars[Math.floor(Math.random() * captchaChars.length)];
        if (char && !captcha.includes(char)) captcha.push(char);
        else i--;
    }

    const canvas = document.querySelector<HTMLCanvasElement>("#captcha");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = 100;
    canvas.height = 28.8;
    ctx.font = "20px Georgia, serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(captcha.join(""), 0, 20);
    captchaCode = captcha.join("");
}

function fieldValue(form: HTMLFormElement, name: string): string {
    const field = form.elements.namedItem(name);
    return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field.value : "";
}

const contactForm = document.querySelector<HTMLFormElement>("#contactform");
const submitButton = contactForm?.querySelector<HTMLButtonElement>("button");

if (contactForm && submitButton) {
    contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        if (fieldValue(contactForm, "filter") !== captchaCode) {
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
                name: fieldValue(contactForm, "name"),
                email: fieldValue(contactForm, "email"),
                subject: fieldValue(contactForm, "subject"),
                message: fieldValue(contactForm, "message"),
                replyTo: "@",
            };

            const result = await fetch(contactForm.action, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {"Content-Type": "application/json"},
            });

            const json = await result.json() as {success?: boolean;};
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

            setTimeout(() => {
                submitButton.classList.replace("btn-danger", "btn-primary");
                submitButton.textContent = "Send Message!";
                submitButton.disabled = false;
            }, 5000);
        }
    });

    createCaptcha();
}
