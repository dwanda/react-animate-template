import anime from 'animejs/lib/anime.es.js';

export const loadedInformationCards = function (){
    let timeline1 = anime.timeline({});
    timeline1.add({
        targets: '.ani_newBroswer_InformationCard',
        width: [0,620],
        opacity: [0,1],
        left:[600,120],
        easing:'easeOutSine',
        duration:800,
        delay: anime.stagger(300),
    });
    timeline1.add({
        targets: '.ani_newBroswer_FakeImg',
        top:[20,90],
        opacity: [0,1],
        easing:'easeOutBounce',
        duration:1000,
        delay: anime.stagger(300),
    });
}