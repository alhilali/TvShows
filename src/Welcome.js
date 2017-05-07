import React, { Component } from 'react';
import './style/Welcome.css';
import logo from './img/icons/logo.png'

class Welcome extends Component {
  constructor(props) {
    super(props);
    console.log("here");
  }

  render() {
    return (
      <div className='welcomeContent'>
          <div className='title'>
            <img src={logo} alt="logo" style={{width: '105px'}}/>
            <h1>Welcome to Track<span id='tv'>Tv</span>!</h1>
          </div>
          <div className=''>
            <h6>Start adding your favorite shows.</h6>
          </div>
      </div>
    );
  }
}

export default Welcome;
