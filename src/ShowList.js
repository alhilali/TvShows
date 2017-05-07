import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react"
import Show from './Show';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  getPopular,
  getAiringToday,
  getOnTheAir,
  getTopRated,
  searchTMDB} from './helpers/tvDB'
import './style/ShowList.css';

@observer
class ShowList extends Component {
  @observable tvshows = [];

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

  async search(keyword) {
    this.tvshows = await searchTMDB(keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword) {
      this.search(nextProps.keyword)
      return;
    } else {
    }
  }

  componentWillMount() {
    if (this.props.type === 'popular') this.popular();
    else if (this.props.type === 'tonight') this.tonight();
    else if (this.props.type === 'onair') this.onair();
    else if (this.props.type === 'toprated') this.toprated();
    else if (this.props.type === 'search') this.search(this.props.keyword);
  }

  render() {
    if (this.tvshows.length > 0) {
      var listItems = this.tvshows.map((data, i) => {
        return (<Show name={data.name} poster={data.poster} id={data.id} key={data.id}/>)
      });
    }
    return (
      <div id="showList">
        <div id="listBack">
          <div id="listTitle">
            <h2><strong>{this.props.title}{this.props.type === 'search' ? <span>: {this.tvshows.length}</span> : <span></span>}</strong></h2>
          </div>
            <ReactCSSTransitionGroup className="d-flex align-content-between showList"
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
