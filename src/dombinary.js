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
    }, isMobile || isReduced ? 100 : 10);
}