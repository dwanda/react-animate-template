import anime from 'animejs/lib/anime.es.js';

export const loadedCards = function (){
    anime({
        targets: ['.ani_newBroswer_ExtendCard1','.ani_newBroswer_ExtendCard2'],
        scale: [0,1],
        opacity: [0,1],
        rotateX:['180deg'  ,'0deg' ],
        easing:'easeOutSine',
        duration:1000,
        delay: anime.stagger(300),
    });
}

export const expandCards = function (className){
    document.querySelector('.'+className).style.zIndex = 300
    document.querySelector('.'+className).style.boxShadow = 'none'
    anime({
        targets: '.'+className,
        top:0,
        left:0,
        width:'100%',
        height:[250,'100%'],
        easing:'easeOutSine',
        duration:1000
    });    
}