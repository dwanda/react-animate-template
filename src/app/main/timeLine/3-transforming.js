import anime from 'animejs/lib/anime.es.js';

let c
let ctx
let cH;
let cW;
let bgColor
let animations

//颜色选择器 将上一个颜色作为粒子
let colorPicker = (function () {
    let colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
    let index = 0;
    function next() {
        index = index++ < colors.length - 1 ? index : 0;
        return colors[index];
    }
    function current() {
        return colors[index]
    }
    return {
        next: next,
        current: current
    }
})();

function calcPageFillRadius(x, y) {
    let l = Math.max(x - 0, cW - x);
    let h = Math.max(y - 0, cH - y);
    return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

function beginAnimation(positionX, positionY, timeline) {
    let currentColor = colorPicker.current();
    let nextColor = colorPicker.next();
    let targetR = calcPageFillRadius(positionX, positionY);
    let rippleSize = Math.min(300, (cW * .4));
    let minCoverDuration = 1350;

    //全屏的圆
    let pageFill = new Circle({
        x: positionX,
        y: positionY,
        r: 0,
        fill: nextColor
    });
    let fillAnimation = anime({
        targets: pageFill,
        r: targetR,
        duration: Math.max(targetR / 2, minCoverDuration),
        easing: "easeOutQuart",
        update() {
            changeBackground()
        },
        complete: function () {
            //当圆放大至全屏时，调整全局背景颜色为圆的颜色
            bgColor = pageFill.fill;
        }
    });

    //中间的圆
    let ripple = new Circle({
        x: positionX,
        y: positionY,
        r: 0,
        fill: currentColor,
        opacity: 0
    });
    let rippleAnimation = anime({
        targets: ripple,
        r: rippleSize,
        opacity: [1, 0],
        easing: "easeOutQuart",
        fill: nextColor,
        duration: 2200,
        update() {
            changeBackground()
        },
    });

    //散开的粒子
    let particles = [];
    for (let i = 0; i < 30; i++) {
        let particle = new Circle({
            x: positionX,
            y: positionY,
            fill: currentColor,
            r: anime.random(24, 48)
        })
        particles.push(particle);
    }
    let particlesAnimation = anime({
        targets: particles,
        x: function (particle) {
            return particle.x + anime.random(rippleSize, -rippleSize);
        },
        y: function (particle) {
            return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
        },
        r: 0,
        easing: "easeOutExpo",
        duration: anime.random(2000, 2300),
        update() {
            changeBackground()
        }
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b) {
    for (let key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}

let Circle = function (opts) {
    extend(this, opts);
}

Circle.prototype.draw = function () {
    ctx.globalAlpha = this.opacity || 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    if (this.stroke) {
        ctx.strokeStyle = this.stroke.color;
        ctx.lineWidth = this.stroke.width;
        ctx.stroke();
    }
    if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
    }
    ctx.closePath();
    ctx.globalAlpha = 1;
}

function changeBackground() {
    console.log('刷新画布')
    ctx.fillStyle = bgColor;
    //不断重新fill相当于clear了一遍
    ctx.fillRect(0, 0, cW, cH);
    animations.forEach(function (anim) {
        anim.animatables.forEach(function (animatable) {
            animatable.target.draw();
        });
    });
}

//获取当前窗口的宽高信息
let resizeCanvas = function () {
    cW = window.innerWidth;
    cH = window.innerHeight;
    c.width = cW * devicePixelRatio;
    c.height = cH * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
};

export default function oldBroswer(timeline) {
    c = document.querySelector(".ani_oldBroswer_transToNew");
    ctx = c.getContext("2d");
    bgColor = "#FF6138";
    animations = [];
 
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    beginAnimation(anime.random(cW * .2, cW * .8), anime.random(cH * .2, cH * .8), timeline);

    // timeline.add({
    //     targets: '.ani_test1',
    //     duration:1200,
    //     opacity:0
    // });
} 