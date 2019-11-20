import anime from 'animejs/lib/anime.es.js';
import { loadedCards } from './newBroswer/extendCards'

export default function (timeline){
    
    //左边栏出现
    let timeline1 = anime.timeline({
    });
    timeline1.add({
        targets: '.ani_newBroswer_LeftsideBar',
        width: [0,100],
        opacity: [0,1],
        easing:'easeOutQuad',
        duration:1000,
    });
    timeline1.add({
        targets: '.ani_newBroswer_LeftsideBarContent .ele',
        marginLeft: [-60,0],
        opacity: [0,1],
        easing:'easeOutQuad',
        delay: anime.stagger(200, {from: 'center'}),
    },'-=300');

    //左边栏消失
    // anime({
    //     targets: '.ani_newBroswer_LeftsideBar',
    //     width: [100,1000],
    //     opacity: [1,0],
    //     easing:'easeOutSine',
    //     duration:1000,
    // });

    loadedCards(anime)

} 