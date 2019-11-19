import anime from 'animejs/lib/anime.es.js';

export default function newBroswer(timeline){
    anime({
          targets: '.ani_newBroswer_CardBox1',
          rotate: function() { return anime.random(-360, 360); },
          loop: true
    });
} 