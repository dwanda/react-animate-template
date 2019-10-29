import anime from 'animejs/lib/anime.es.js';

export default function oldBroswer(timeline){
    timeline.add({
        targets: '.ani_oldBroswer_Main',
        width:[0,800],
        duration:500,
        opacity:[0,1],
        easing:'easeOutQuad',
    });
    timeline.add({
        targets: '.ani_oldBroswer_Main',
        height:[0,500],
        duration:1000,
        easing:'easeInOutQuad'
    });
    timeline.add({
      targets: '.ani_oldBroswer_content .ani_oldBroswer_codeLine',
      width:[0,800],
      duration:1500,
      delay: anime.stagger(1500),
      easing: 'steps(40)',
    });
    timeline.add({
        targets: '.ani_oldBroswer_loadingLine',
        opacity:[0,1],
        duration:50,
        direction: 'alternate',
        loop:true
    });
    timeline.add({
        targets: '.ani_oldBroswer_openText',
        duration:1000,
        width:[0,112],
        delay: anime.stagger(150),
        easing:'steps(7)',
        complete:function(){
            document.querySelector('.ani_oldBroswer_content').style.cssText='overflow-y:auto'
        }
    });
    timeline.add({
        targets: '.ani_oldBroswer_loadingText',
        duration:2000,
        height:[0,1000],
        easing:'steps(50)',
        update:function(){
            let ele = document.querySelector('.ani_oldBroswer_content')
            ele.scrollTop = ele.scrollHeight
        }
    });

    // timeline.add({
    //       targets: '.ani_test2',
    //       translateX: {
    //         value: -350,
    //         duration: 1800
    //       },
    //       translateY: {
    //         value: 350,
    //         duration: 1800
    //       },
    //       opacity:1,
    // },'-=2800');
} 