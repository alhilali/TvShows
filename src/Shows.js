import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import './style/shows.css'
import Sidebar from './Sidebar';
import Show from './Show';
import Myshows from './Myshows';
import Home from './Home';
import Tv from './Tv';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect } from 'react-router-dom'
import { logout } from './helpers/auth'
import { firebaseAuth } from './config/constants'
import Login from './Login'
import Register from './Register'


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} {...rest} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} {...rest} />
        : <Redirect to='/home'/>}
    />
  )
}

class Shows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      query : '',
      isCollapsed: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true
        })
      } else {
        this.setState({
          authed: false,
        })
      }
    })
  }


  componentWillUnmount () {
    this.removeListener()
  }

  onChange = (e) => {
    this.setState({query: e})
  }

  toggle(val) {
    if (val) {
      ReactDOM.findDOMNode(this.refs.sidebar).style.marginLeft = '0px';
      return false;
    } else {
      ReactDOM.findDOMNode(this.refs.sidebar).style.marginLeft = '-220px'
      //ReactDOM.findDOMNode(this.refs.sidebar).style.marginRight = '-55px'
      //ReactDOM.findDOMNode(this.refs.sidebar).styles.width = '10px'
      return true;
    }
  }

  render() {
    return (

    <div className="mainContainer">
      <div ref="sidebar"  className="box2">
        <Sidebar authed={this.state.authed} onSearch={this.onChange} toggle={this.toggle}/>
      </div>
      <div ref="main" className="box1">

        <PrivateRoute authed={this.state.authed} path='/home' component={Home} query={this.state.query} />
        <PrivateRoute authed={this.state.authed} path='/myshows' component={Myshows} query={this.state.query} />
        <PublicRoute authed={this.state.authed} path='/login' component={Login} />
        <PrivateRoute authed={this.state.authed} path='/tv/:id' component={Tv} />
        <PublicRoute authed={this.state.authed} path='/register' component={Register} />


      </div>
    </div>
    );
  }
}

export default Shows;
