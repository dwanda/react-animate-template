import oldBroswer from './1-oldBroswer'
import transforming from './2-transforming'
import newBroswer from './3-newBroswer'



//依次调用每一幕的动画函数
export default function mainAnimate (timeline){
    console.log(timeline)

    // oldBroswer(timeline)
    // transforming(timeline)
    newBroswer(timeline)
}
