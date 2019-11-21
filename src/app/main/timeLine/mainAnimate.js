import oldBroswer from './1-oldBroswer'
import glitchCards from './2-glitchCards'
import transforming from './3-transforming'
import newBroswer from './4-newBroswer'


//依次调用每一幕的动画函数
export default function mainAnimate (timeline){
    // console.log(timeline)

    // oldBroswer(timeline)
    // glitchCards(timeline)
    // transforming(timeline)
    newBroswer(timeline)
}
