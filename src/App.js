import styles from './App.module.css';
import React, { Component } from 'react'
import AniPage from './app/main/animation'

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