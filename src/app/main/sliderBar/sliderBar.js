import React, { Component } from 'react'
import styles from './slider.module.css'

export default class sliderBar extends Component {
    state = {
        maxValue:500,
        selectValue:0,
        originClickX:0,
        originSelectValue:0,
    }
    componentDidUpdate(prevProps){
        if(this.props.timeValue !== prevProps.timeValue){
            this.setState({
                selectValue:this.props.timeValue*5
            })
        }
    }
    mouseDown = (event)=>{
        event.preventDefault()
        document.addEventListener('mousemove',this.mouseMove)
        document.addEventListener('mouseup',this.mouseUp)
        this.setState({
            originClickX:event.screenX,
            originSelectValue:this.state.selectValue
        })
        this.props.pauseAnimation()
    }
    mouseMove = (event)=>{
        let relativeX = event.screenX -this.state.originClickX ;
        let changeValue = this.state.originSelectValue +relativeX
        
        this.seekPlayPosition(changeValue)
    }
    mouseUp = ()=>{
        document.removeEventListener('mousemove',this.mouseMove)
        document.removeEventListener('mouseup',this.mouseUp)
    }
    seekPlayPosition = (changeValue)=>{
        if(changeValue<0){
            changeValue = 0
        }
        else if(changeValue > this.state.maxValue){
            changeValue = this.state.maxValue
        }
        this.props.seekAnimation(changeValue)
    }

    trackListen = (event)=>{
        this.props.pauseAnimation()
        
        let changeValue = event.screenX - event.target.parentElement.getBoundingClientRect().left
        this.seekPlayPosition(changeValue)
    }

    pauseAnimation = ()=>{ this.props.pauseAnimation() }
    playAnimation = ()=>{ this.props.playAnimation() }
    restartAnimation = ()=>{ this.props.restartAnimation() }

    render() {
        return (
            <div className={styles.sliderMain}>
                <div className={styles.buttonBox}>
                    <button className={styles.insideButton} onClick={this.playAnimation}>播放</button>
                    <button className={styles.insideButton} onClick={this.pauseAnimation}>暂停</button>
                    <button className={styles.insideButton} onClick={this.restartAnimation}>重放</button>
                </div>

                <div style={{'width':this.state.maxValue+'px'}}>
                    <div className={styles.sliderBar}>
                        <div className={styles.sliderRail} onMouseDown={this.trackListen}></div>
                        <div className={styles.sliderTrack} onMouseDown={this.trackListen} style={{'width':this.state.selectValue+'px'}}></div>
                        <div className={styles.sliderMark} onMouseDown={this.mouseDown} style={{'left':this.state.selectValue+'px'}}></div>
                    </div>
                </div>
            </div>
        )
    }
}
