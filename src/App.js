import './App.css';
import test from './app/src/style1.txt'

import React, { Component } from 'react'

export default class App extends Component {

  componentDidMount(){
    console.log(test)
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}