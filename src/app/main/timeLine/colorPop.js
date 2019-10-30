import anime from 'animejs/lib/anime.es.js';

window.human = false;

let canvasEl 
let ctx 
let numberOfParticules
let pointerX
let pointerY
let tap
let colors

//设定canvas画布大小
function setCanvasSize() {
  canvasEl.width = window.innerWidth * 2;
  canvasEl.height = window.innerHeight * 2;
  canvasEl.style.width = window.innerWidth + 'px';
  canvasEl.style.height = window.innerHeight + 'px';
  canvasEl.getContext('2d').scale(2, 2);
}

function updateCoords(e) {
  pointerX = e.clientX || e.touches[0].clientX;
  pointerY = e.clientY || e.touches[0].clientY;
}

//设置粒子的消失方向的位置
function setParticuleDirection(p) {
  let angle = anime.random(0, 360) * Math.PI / 180;
  let value = anime.random(50, 180);
  let radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

//粒子数据创建
function createParticule(x,y) {
  let p = {};
  p.x = x;
  p.y = y;
  p.color = colors[anime.random(0, colors.length - 1)];
  p.radius = anime.random(16, 32);
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();                      //新建一条路径一旦创建成功 绘制命令将转移到新建的路径上
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true); // 以(x,y)为圆心 r为半径的圆
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  return p;
}

//大圆数据创建
function createCircle(x,y) {
  let p = {};
  p.x = x;
  p.y = y;
  p.color = '#c4c4c4';
  p.radius = 0.1;
  p.alpha = 1;
  p.lineWidth = 6;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  return p;
}

//
function renderParticule(anim) {
  for (let i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
    console.log(anim)
  }
}

//将圆和粒子添加到队列
function animateParticules(x, y) {
  let circle = createCircle(x, y);
  let particules = [];
  for (let i = 0; i < numberOfParticules; i++){
    particules.push(createParticule(x, y));
  }
//   console.log(x,y)
  anime.timeline().add({
    targets: particules,
    x: function(p) { return p.endPos.x; },
    y: function(p) { return p.endPos.y; },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
  .add({
    targets: circle,
    radius: anime.random(2500, 2600),
    lineWidth: 0,
    // alpha: {
    //   value: 0,
    //   easing: 'linear',
    //   duration: anime.random(600, 800),  
    // },
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule,
    offset: 0
  });
}

// let render = anime({
//   duration: Infinity,
//   update: function() {
//     console.log('清除画布')
//     ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
//   }
// });


let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

function autoClick() {
  if (window.human) return;
  animateParticules(
    anime.random(centerX-50, centerX+50), 
    anime.random(centerY-50, centerY+50)
  );
  //这里作者用它自己写的搞成异步了哈哈哈哈哈哈哈哈哈哈哈
  anime({duration: 1000}).finished.then(autoClick);
}

export default function oldBroswer(timeline){
    canvasEl = document.querySelector('.ani_oldBroswer_transToNew');
    ctx = canvasEl.getContext('2d');
    numberOfParticules = 30;
    pointerX = 0;
    pointerY = 0;
    tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
    colors = ['#ffbd43', '#ff8843', '#ffec43', '#FBF38C'];

    document.addEventListener(tap, function(e) {
        console.log('点击事件')
        window.human = true;
        // render.play();
        updateCoords(e);
        animateParticules(pointerX, pointerY);
    }, false);
      
    // autoClick();
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize, false);

    // timeline.add({
    //     targets: '.ani_test1',
    //     duration:1200,
    //     opacity:0
    // });
} 