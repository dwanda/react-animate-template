import React, { Component } from 'react'
import anime from 'animejs/lib/anime.es.js';
import './aniStyle.css'

import SliderBar from './sliderBar/sliderBar'

export default class main extends Component {

    state = {
        timeValue:0,
    }

    getTime(){
        // seekProgressEl.oninput = function() {
        //     animation.seek(animation.duration * (seekProgressEl.value / 100));
        // };
    }

    componentDidMount(){
        this.timeline1 = anime.timeline({
            easing: 'easeInOutSine',
            direction: 'normal',
            update: ()=>{
                this.setState({
                    timeValue:this.timeline1.progress
                })
            },
            autoplay: false,
        });
        this.timeline1.add({
          targets: '.ani_test1',
          translateX: {
            value: 750,
            duration: 1800
          },
          translateY: {
            value: 350,
            duration: 1800
          },
          rotate: {
            value: 360,
            duration: 2800,
            easing: 'easeInOutSine'
          },
          scale: {
            value: 2,
            duration: 1600,
            delay: 800,
            easing: 'easeInOutSine'
          },
          opacity:1
        });

        this.timeline1.add({
            targets: '.ani_test2',
            translateX: {
              value: -350,
              duration: 1800
            },
            translateY: {
              value: 350,
              duration: 1800
            },
            opacity:1,
          },'-=2800');

        let timeline2 = anime.timeline({
            duration: 500,
            easing: 'easeInOutSine',
            complete: ()=>{
                console.log('加载背景功能完成')
                this.timeline1.play()
            }
        });

        timeline2.add({
            targets: '.ani_mainBackground',
            height:'100%',
            easing: 'easeInOutQuad'
        });
        timeline2.add({
            targets: '.ani_Slider',
            easing: 'easeInOutQuad',
            opacity:1
        });
    }

    pauseAnimation = ()=>{
        this.timeline1.pause()
    }

    playAnimation = ()=>{
        this.timeline1.play()
    }

    restartAnimation = ()=>{
        this.timeline1.restart()
    }

    seekAnimation = (time)=>{
        //除以滚动条对于100的倍数，乘上28
        this.timeline1.seek(time/5*28)
    }

    render() {
        return (
            <React.Fragment>
                <div className='ani_mainBackground'></div>
                <div className='ani_test1'></div>
                <div className='ani_test2'></div>

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

                <div className='ani_timeNumber' >当前时间:{this.state.timeValue}</div>
            </React.Fragment>
        )
    }
    
}
