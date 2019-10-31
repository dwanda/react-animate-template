import oldBroswer from './1-oldBroswer'
import uploading from './2-uploading'
import transforming from './3-transforming'


//依次调用每一幕的动画函数
export default function mainAnimate (timeline){
    console.log(timeline)

    oldBroswer(timeline)
    // uploading(timeline)
    transforming(timeline)
}
