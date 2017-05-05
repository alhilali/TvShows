import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import './style/App.css';
import { logout } from './helpers/auth'
import { firebaseAuth } from './config/constants'
import { Login } from './Login'
import { Register } from './Register'
import Sidebar from './Sidebar';
import Show from './Show';
import Shows from './Shows';
import Myshows from './Myshows';
import Home from './Home';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


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
        ? <Component {...props}/>
        : <Redirect to={{pathname: '/home', state: {from: props.location}}} />}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      query : ''
    };
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



  render() {
    return (
      <Router >
      <div className="App" style={{ display: 'flex row' }}>
      <Route path="/" component={Shows}/>
      </div>
      </Router>
    );
  }
}

export default App;
