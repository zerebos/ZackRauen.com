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
            if (isReduced) this.y = canvas.clientHeight * Math.random();
            this.fontSize = randomInRange(8, 20);
            this.fillColor = "#018BBC";
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
        if (!isReduced) requestAnimationFrame(anim);
        context.fillStyle = "#1D1D1D";
        context.fillRect(0, 0, canvas.width, canvas.height);

        binaryArray.forEach((particle) => particle.rotate());
    }

    // generateParticles(300);
    setSize();
    
    // window.rainbow = true;
    // window.doAnimation = false;
    const MAX_NUM = 150;
    let MAX = (MAX_NUM / 2560) * canvas.width;
    for (let i = 0; i < MAX; i++) {
        if (!isReduced) setTimeout(() => generateParticles(1), 10 * i);
        else generateParticles(1);
    }
    anim();









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