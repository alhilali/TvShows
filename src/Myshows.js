import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react"
import './style/myshows.css';
import Show from './Show';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { database, firebaseAuth } from './config/constants'

@observer
class Myshows extends Component {
  @observable tvshows = [];
  @observable current = [];
  @observable user;
  constructor(props) {
    super(props);
    this.setUser = this.setUser.bind(this)
  }

  readFavorites() {
    let list = observable([])
    database.ref('/users/' + this.user.uid + '/favorites/')
    .orderByChild("id")
    .on("child_added", function(snap) {
      list.push({
        id : snap.val().id,
        name : snap.val().name
      });

    })

    this.tvshows = list;
    this.current = list;
    return list;
  }

  async setUser() {
    var bind = this
    var wait = await firebaseAuth().onAuthStateChanged(function(user) {
      if (user) {
        bind.user = user;
      } else {
        // No user is signed in.
      }
    });

  }

  componentDidMount () {
    this.readFavorites();
    console.log("here");

  }


  async componentWillMount() {
    await this.setUser();
    //this.user = await firebaseAuth().currentUser;
    //console.log(this.user);
    this.readFavorites();
    var bind = this;


   database.ref('/users/' + this.user.uid + '/favorites/')
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
      <div className="myShows">
        <div id="myshowstitle">
          <h2><strong>My Shows: {this.tvshows.length}
          {this.tvshows.length > 1
            ? <span> titles</span>
            : <span> title</span>
          }</strong></h2>
        </div>
        <ReactCSSTransitionGroup id="mainpanel" className="d-flex align-content-between flex-wrap"
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          {listItems}

        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Myshows;
