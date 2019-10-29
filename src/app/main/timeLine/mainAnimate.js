import oldBroswer from './1-oldBroswer'
import moving from './2-moving'

//依次调用每一幕的动画函数
export default function mainAnimate (timeline){
    oldBroswer(timeline)
    moving(timeline)
}
