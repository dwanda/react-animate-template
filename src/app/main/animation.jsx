import React, { Component } from 'react'
import anime from 'animejs/lib/anime.es.js';
import './aniStyle.css'
import './timeLine/newBroswer/newBroswerStyle.css'
import SliderBar from './sliderBar/sliderBar'
import mainAnimate from './timeLine/mainAnimate'
import { expandCards } from './timeLine/newBroswer/extendCards'


export default class main extends Component {
    state = {
        timeValue:0,
        totalTime:0
    }
    componentDidMount(){
        this.mainTimeline = anime.timeline({
            easing: 'easeInOutSine',
            update: ()=>{
                this.setState({
                    timeValue:this.mainTimeline.progress
                })
            },
            autoplay: false,
        });
        mainAnimate(this.mainTimeline)
        
        let backgroundTimeline = anime.timeline({
            duration: 500,
            easing: 'easeInOutSine',
            complete: ()=>{
                this.mainTimeline.play()
            }
        });

        backgroundTimeline.add({
            targets: '.ani_mainBackground',
            height:'100%',
            easing: 'easeInOutQuad'
        });
        backgroundTimeline.add({
            targets: '.ani_Slider',
            easing: 'easeInOutQuad',
            opacity:1
        });
    }

    pauseAnimation = ()=>{
        this.mainTimeline.pause()
    }

    playAnimation = ()=>{
        this.mainTimeline.play()
    }

    restartAnimation = ()=>{
        this.mainTimeline.restart()
    }

    seekAnimation = (time)=>{
        //除以滚动条对于100的倍数，乘上总共有多少秒*10
        this.mainTimeline.seek(time/5*(this.mainTimeline.duration/100))
    }

    makeFakeLoadingText=()=>{
        let fakeLoading = []
        for(let i=0; i<40; i++){
            fakeLoading.push(<div key={i+'fakeLoading'} className='ani_oldBroswer_loadingDot'>......</div>)
        }
        return fakeLoading
    }

    render() {
        return (
            <div className='ani_allMain'>
                <div className='ani_mainBackground'></div>

                {/* 
                    dom都写在这里是因为方便调整样式，代码提示也方便。
                    class不用cssModule是因为想让anime直接搜索class名字识别好了。
                    第一幕:旧浏览器 */}
                <div className='ani_oldBroswer_Main'>
                    <div className='ani_oldBroswer_insideBar'>
                        <div>E:\WINDOWS\system32\cmd.exe</div>
                        <div className='ani_oldBroswer_closeButton' title='别点啦，这个只是装饰'>
                            <span className='ani_oldBroswer_closeText'>x</span>
                        </div>
                    </div>
                    <div className='ani_oldBroswer_content'> 
                        <div className='ani_oldBroswer_codeLine'>
                            <div className='ani_oldBroswer_codeInside'> 
                                Microsoft Windows [版本 6.1.7601]
                            </div>
                        </div>
                        <div className='ani_oldBroswer_codeLine'>
                            <div className='ani_oldBroswer_codeInside'> 
                                版权所有 (c) 2019 Microsoft Corporation。保留所有权利。
                            </div>
                        </div>
                        <div className='ani_oldBroswer_codeLine'>
                            <div className='ani_oldBroswer_codeInside'> 
                                C:\Users\DeskTop>
                                <span className='ani_oldBroswer_openText'>
                                    <span style={{display:'block',width:'300px'}}>打开我的浏览器</span>
                                </span>
                                <span className='ani_oldBroswer_loadingLine'></span>
                            </div> 
                        </div>
                        <div className='ani_oldBroswer_loadingText'>
                            {
                                this.makeFakeLoadingText()
                            }
                        </div>
                    </div>
                </div>

                {/* 第二幕：加载转场 */}
                <canvas className='ani_oldBroswer_transToNew'></canvas>

                {/* 第三幕：故障效果 */}
                <div className='threeJs_aniBox'></div>

                {/* 第四幕：新播放器 */}
                <div className='ani_newBroswer_OutsideBox'>
                    <div className='ani_newBroswer_InsideBox'>
                        <div className='ani_newBroswer_LeftsideBar'>
                            <div className='ani_newBroswer_LeftsideBarContent'>
  
                                <img src={ require('../../static/icon/avatar.jpg') } alt='avatar' className='ani_newBroswer_User ele'  />
                                <img src={ require('../../static/icon/company.png') }  alt='companyIcon' className='ani_newBroswer_Icon_Company ele'/>
                                <img src={ require('../../static/icon/skill_entity.png') }  alt='companyIcon' className='ani_newBroswer_Icon_Head ele'/>
                            </div>
                        </div>
                        <div className='ani_newBroswer_RightSideBox'>
                            <div className='ani_newBroswer_UserInfo'>
                                <div>测试标题</div>
                            </div>
                            <div className='ani_newBroswer_InformationCard'>
                                <img src={ require('../../static/icon/username.png') } alt='fakeImg' className='ani_newBroswer_FakeImg'/>
                            </div>

                            <div className='ani_newBroswer_DataCard'>
    
                            </div>

                            <div className='ani_newBroswer_ExtendCard1' onClick={()=>{ expandCards('ani_newBroswer_ExtendCard1') }}>
                                 
                            </div>
                            <div className='ani_newBroswer_ExtendCard2' onClick={()=>{ expandCards('ani_newBroswer_ExtendCard2') }}>
                                 
                            </div>
                            
                            <div className='ani_newBroswer_Content_Right'>
                                <div className='ani_newBroswer_InformationText1'>测试信息字体</div>

                                <div className='ani_newBroswer_InformationText2'>测试信息字体</div>

                                <div className='ani_newBroswer_PeopleBox'></div>
                                <embed  src={ require('../../static/icon/smile.svg')} className='ani_newBroswer_PeopleImg' width="240" height="240"  />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 播放器 */}
                <div className='ani_Slider'>
                    <SliderBar
                        pauseAnimation={this.pauseAnimation}
                        playAnimation={this.playAnimation}
                        restartAnimation={this.restartAnimation}
                        seekAnimation={this.seekAnimation}
                        timeValue={this.state.timeValue}
                    >
                    </SliderBar>
                </div>
            </div>
        )
    }
}
