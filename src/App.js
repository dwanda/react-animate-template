import styles from './App.module.css';
import React, { Component } from 'react'
import AniPage from './app/main/animation'
// import ThreeTest from './app/threeTest/main'

export default class App extends Component {
  componentDidMount(){

  }
  render() {
    return (
      <div className={styles.main}>
        <AniPage/>
      </div>
    )
  }
}