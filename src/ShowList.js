import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react"
import Show from './Show';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  getPopular,
  searchTMDB,
  getAiringToday,
  getOnTheAir,
  getTopRated} from './helpers/tvDB'
import './style/ShowList.css';

@observer
class ShowList extends Component {
  @observable tvshows = [];
  constructor(props) {
    super(props);
  }

  async popular() {
    this.tvshows = await getPopular();
  }

  async tonight() {
    this.tvshows = await getAiringToday();
  }

  async onair() {
    this.tvshows = await getOnTheAir();
  }

  async toprated() {
    this.tvshows = await getTopRated();
  }

  componentWillMount() {
    if (this.props.type === 'popular') this.popular();
    else if (this.props.type === 'tonight') this.tonight();
    else if (this.props.type === 'onair') this.onair();
    else if (this.props.type === 'toprated') this.toprated();
  }

  render() {
    if (this.tvshows.length > 0) {
      var listItems = this.tvshows.map((data, i) => {
        return (<Show id='showItem' name={data.name} poster={data.poster} id={data.id} key={data.id}/>)
      });
    }

    return (
      <div id="showList">
        <div id="listBack">
          <div id="listTitle">
            <h2><strong>{this.props.title}</strong></h2>
          </div>
            <ReactCSSTransitionGroup className="d-flex align-content-between"
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>

              {listItems}

            </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default ShowList;