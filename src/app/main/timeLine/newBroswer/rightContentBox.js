import anime from 'animejs/lib/anime.es.js';

export const loadedRightCards = function (){
    //小人进场
    let fakeArm = null
    let timeline = anime.timeline({})
    timeline.add({
        targets:'.ani_newBroswer_PeopleBox',
        duration:1200,
        bottom:[-300,-100],
        easing:'easeInOutQuad'
    })

    timeline.add({
        targets:'.ani_newBroswer_PeopleImg',
        scale:[0,1],
        bottom:[-300,-50],
        duration:1000,
        easing:'easeOutBack'
    })

    anime({
        loop:true,
        duration:1200,
        direction: 'alternate',
        update(anim){
            // console.log(anim.currentTime)
            if(fakeArm){
                fakeArm.setAttribute('transform','rotate('+anim.currentTime/40+',250,150)')
            }
            else{
                if(document.querySelector('.ani_newBroswer_PeopleImg').getSVGDocument()){
                    fakeArm = document.querySelector('.ani_newBroswer_PeopleImg').getSVGDocument().querySelector('#fakeRightArm')
                }
            }
        }
    });

    //其他信息
    anime({
        targets:['.ani_newBroswer_InformationText1','.ani_newBroswer_InformationText2'],
        duration:1200,
        left:[300,20],
        easing:'easeInOutQuad',
        delay: anime.stagger(300)
    })
}