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
        this.getTime()

        let timeline1 = anime.timeline({
            direction: 'alternate',
            duration: 500,
            easing: 'easeInOutSine',
        });

        timeline1.add({
            targets: '.ani_test1',
            translateX: 270
        });
  
        timeline1.add({
          targets: '.ani_test1',
          translateX: {
            value: 250,
            duration: 800
          },
          rotate: {
            value: 360,
            duration: 1800,
            easing: 'easeInOutSine'
          },
          scale: {
            value: 2,
            duration: 1600,
            delay: 800,
            easing: 'easeInOutQuart'
          }
        });

        let timeline2 = anime.timeline({
            duration: 500,
            easing: 'easeInOutSine',
        });

        timeline2.add({
            targets: '.ani_mainBackground',
            backgroundColor: '#a7a7a7',
        });
        timeline2.add({
            targets: '.ani_mainBackground',
            backgroundColor: '#a7a7a7',
            height:'100%',
            easing: 'easeInOutQuad'
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className='ani_mainBackground'></div>
                <div className='ani_test1'></div>
                
                <div className='ani_Slider'>
                    <SliderBar></SliderBar>
                </div>
                {/* 测试用 */}
                <div className='ani_timeNumber'>当前时间:{this.state.timeValue}</div>
            </React.Fragment>
        )
    }
    
}
