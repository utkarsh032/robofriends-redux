import React, { Component } from 'react'
import CounterButton from './CounterButton'

class Header extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false
  }
  render () {
    return (
      <div>
        <h1 className='f1'>RoboFriends</h1>
        <CounterButton />
      </div>
    )
  }
}

export default Header
