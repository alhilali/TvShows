import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react"
import './style/myshows.css';
import Show from './Show';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { database, firebaseAuth } from './config/constants'
import { getFavorites } from './helpers/tvDB'

@observer
class Myshows extends Component {
  @observable tvshows = [];
  @observable current = [];
  constructor(props) {
    super(props);
  }

  async readFavorites() {
    let list = observable([])
    list = await getFavorites();

    this.tvshows = list;
    this.current = list;
    return list;
  }

  setValues() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.readFavorites();
      } else {
      }
    })
  }


  async componentWillMount() {
    this.setValues();
    this.readFavorites();
    var bind = this;

    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
         database.ref('/users/' + user.uid + '/favorites/')
         .orderByChild("id")
         .on("child_removed", function(snap) {
           bind.readFavorites();
       })
      } else {
      }
    })
  }

  render() {
    //this.readFavorites();
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
