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
    anime({
        targets: '.'+className,
        scale: [0,1],
        opacity: [0,1],
        zIndex:300,
        rotateY:['180deg'  ,'0deg' ],
        easing:'easeOutSine',
        duration:1000,
        delay: anime.stagger(300),
    });    
}