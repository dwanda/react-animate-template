import { loadedLeftBars } from './newBroswer/leftSideBar'
import { loadedExtendCards } from './newBroswer/extendCards'
import { loadedInformationCards } from './newBroswer/informationCard'
import { loadedRightCards } from './newBroswer/rightContentBox'
import anime from 'animejs/lib/anime.es.js';


export default function (timeline){
    //整体卡片的加载
    timeline.add({
        targets:'.ani_newBroswer_OutsideBox',
        duration:1200,
        width:[0,1000],
        height:[0,700],
        easing:'easeInOutQuad',
        complete(){
            document.querySelector('.ani_newBroswer_InsideBox').style.display='block'
            loadedLeftBars()
            loadedExtendCards()
            loadedInformationCards()
            loadedRightCards()
        }
    })
} 