import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react"
import './style/style.css';
import Sidebar from './Sidebar';
import Show from './Show';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect } from 'react-router-dom'
import { logout, getCurrentUser } from './helpers/auth'
import { getFavorites, getPoster } from './helpers/tvDB'
import { database, firebaseAuth, ref } from './config/constants'
import { Login } from './Login'
import { Register } from './Register'

@observer
class Myshows extends Component {
  @observable tvshows = [];
  @observable current = [];
  constructor(props) {
    super(props);
    this.state = {
      favorites : observable([])
    };

    this.search = this.search.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query) {
      this.search(nextProps.query)
    } else {
      this.tvshows = this.current;
    }
  }

   search(query){
    let filterdList = this.tvshows;
    this.tvshows = filterdList.filter(
      (show) => {
        return (show.name.toLowerCase().indexOf(query) !== -1);
      }
    )
  }

  readFavorites() {
    let list = observable([])
    database.ref('/users/' + firebaseAuth().currentUser.uid + '/favorites/')
    .orderByChild("id")
    .on("child_added", function(snap) {
      list.push({
        id : snap.val().id,
        name : snap.val().name
      });

    })

    this.tvshows = list;
    this.current = list;
  }


  componentWillMount() {
    this.readFavorites();
    var bind = this;

   database.ref('/users/' + firebaseAuth().currentUser.uid + '/favorites/')
   .orderByChild("id")
   .on("child_removed", function(snap) {
     bind.readFavorites();
   })
  }

  render() {
    if (this.tvshows.length > 0) {
      var listItems = this.tvshows.map((data, i) => {
        return (<Show className='show' name={data.name} poster={data.poster} id={data.id} key={data.id}/>)
      });
    }

    return (
      <div className="mainContainer">
        <ReactCSSTransitionGroup id="mainpanel" className="d-flex align-content-between flex-wrap"
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          {listItems}

        </ReactCSSTransitionGroup>
          <div className="">
          {
            this.tvshows.length == 0
            ? <h2 className=""><strong>No favorites :(</strong></h2>
            : <div/>
          }
          </div>
      </div>
    );
  }
}

export default Myshows;
