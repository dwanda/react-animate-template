import anime from 'animejs/lib/anime.es.js';

export const loadedExtendCards = function (){
    anime({
        targets: ['.ani_newBroswer_ExtendCard1','.ani_newBroswer_ExtendCard2'],
        scale: [0,1],
        opacity: [0,1],
        easing:'easeOutSine',
        duration:1000,
        delay: anime.stagger(300),
    });
}

export const expandCards = function (className){
    let selectDom = document.querySelector('.'+className)
    selectDom.style.zIndex = 300
    selectDom.style.boxShadow = 'none'
    console.log(selectDom.offsetTop)
    anime({
        targets: '.'+className,
        top:[selectDom.offsetTop,0],
        left:[selectDom.offsetLeft,0],
        width:'100%',
        height:[250,'100%'],
        easing:'easeOutSine',
        duration:1000
    });    
}