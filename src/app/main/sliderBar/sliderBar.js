import React, { Component } from 'react'
import styles from './slider.module.css'

export default class sliderBar extends Component {
    moveBar(){
        
    }
    
    render() {
        return (
            <div className={styles.sliderMain}>
                <div className={styles.sliderBar}>
                    <div className={styles.sliderRail}></div>
                    <div className={styles.sliderTrack}></div>
                    <div className={styles.sliderMark}></div>
                </div>
            </div>
        )
    }
}
