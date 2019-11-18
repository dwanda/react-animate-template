import anime from 'animejs/lib/anime.es.js';

let c
let ctx
let cH;
let cW;
let refreshCircle = [];

function beginAnimation(positionX, positionY, nowColor, nextColor, timeline, offset=0) {
    let targetR = cW>cH?cW:cH;
    let rippleSize = 300;

    timeline.add({
        duration:1000,
        begin(){
            filterCircleAnimation(timeline)
        },
        update(anime){
            ctx.clearRect(0, 0, cW, cH);
            refreshCanvas()
        }
    },'-='+offset)

    //全屏的圆
    let pageFill = new Circle({
        x: positionX,
        y: positionY,
        r: 0,
        fill: nextColor
    });
    timeline.add({
        targets: pageFill,
        r: [0,targetR],
        easing: "easeOutQuart",
        duration: 1000,
    },'-=1000');

    //中间的圆
    let ripple = new Circle({
        x: positionX,
        y: positionY,
        r: 0,
        fill: nowColor,
    });
    timeline.add({
        targets: ripple,
        r: rippleSize,
        easing: "easeOutQuart",
        fill: nextColor,
        duration: 1000,
    },'-=1000');

    //散开的粒子
    let particles = [];
    for (let i = 0; i < 50; i++) {
        let particle = new Circle({
            x: positionX,
            y: positionY,
            fill: nowColor,
            r: 0
        })
        particles.push(particle);
    }
    timeline.add({
        targets: particles,
        x: function (particle) {
            return particle.x + anime.random(rippleSize, -rippleSize);
        },
        y: function (particle) {
            return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
        },
        r:[
            {value:0,duration:0},
            {value: function() { return anime.random(14, 50); },duration:50},
            {value:0,duration:950}
        ],
        easing: "easeOutExpo",
        duration: function(){
            return anime.random(800, 1000)
        }
    },'-=1000');
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
    ctx.beginPath();
    //将圆的数据画在canvas上面
    // 以(x,y)为圆心 r为半径的圆  绘制startAngle弧度 到endAngle弧度的圆弧 anticlosewise默认为false 即顺时针方向 true为逆时针方向
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
    }
    ctx.closePath();
}

function filterCircleAnimation(timeline){
    //找到序列中的我的圆形动画，目前先这样找吧，判断条件之后可以换
    timeline.children.forEach(function (anim) {
        if(anim.changeBegan){
            anim.animatables.forEach(function (animatable) {
                if(animatable.target.r){
                    refreshCircle.push(animatable.target)
                    animatable.target.draw();
                }
            });
        }
    });
}

function refreshCanvas() {
    refreshCircle.forEach((item)=>{
        item.draw();
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

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    beginAnimation(anime.random(cW * .2, cW * .8), anime.random(cH * .2, cH * .8), "#FF6138", "#FFBE53", timeline, 300);
    beginAnimation(anime.random(cW * .2, cW * .8), anime.random(cH * .2, cH * .8), "#FFBE53", "#2980B9", timeline, 600);
    beginAnimation(anime.random(cW * .2, cW * .8), anime.random(cH * .2, cH * .8), "#2980B9", "#efefef", timeline, 500);
} 