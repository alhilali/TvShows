import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import './style/shows.css'
import Sidebar from './Sidebar';
import Myshows from './Myshows';
import Home from './Home';
import Tv from './Tv';
import { Route, Redirect, browserHistory, Switch } from 'react-router-dom'
import { firebaseAuth } from './config/constants'
import Login from './Login'
import Register from './Register'
import Search from './Search'
import Show from './Show'
import { observable } from 'mobx';
import { observer } from "mobx-react"
import { searchTMDB } from './helpers/tvDB'
import ShowList from './ShowList'


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

@observer
class Shows extends Component {

  @observable keyword;
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      authed: true,
      query : 'null',
      isCollapsed: false,
    };
    this.props.history.push('/home');

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          uid: user.uid
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
    this.keyword = e;
  }

  toggle() {
    ReactDOM.findDOMNode(this.refs.sidebar).classList.toggle('collapsee');
  }

  render() {
    if (this.tvshowsSearch && this.tvshowsSearch.length > 0) {
      var listItems = this.tvshowsSearch.map((data, i) => {
        return (<Show className='show' name={data.name} poster={data.poster} id={data.id} key={data.id}/>)
      });
    }
    if (this.tvshowsSearch) console.log();
    return (

    <div className="mainContainer">
      <div ref="sidebar"  className="box2">
        <Sidebar authed={this.state.authed} onSearch={this.onChange} toggle={this.toggle}/>
      </div>
      <div ref="main" className="box1">
        <Switch>
        <PrivateRoute authed={this.state.authed} path='/home' component={Home} query={this.keyword} />
        <PrivateRoute authed={this.state.authed} path='/myshows' component={Myshows} query={this.state.query}/>
        <PublicRoute authed={this.state.authed} path='/login' component={Login} />
        <PrivateRoute authed={this.state.authed} path='/tv/:id' component={Tv} />
        <PublicRoute authed={this.state.authed} path='/register' component={Register} />
        <Route path='/search:keyword' component={Search} />
        </Switch>

      </div>
    </div>
    );
  }
}

export default Shows;
