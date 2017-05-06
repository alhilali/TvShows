import React, { Component } from 'react';
import './style/season.css';
import { getSeason, getNumOfSeasons } from './helpers/tvDB'
import { observable } from 'mobx';
import { observer } from "mobx-react"
import EpisodeListItem from './EpisodeListItem'
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


@observer
class Season extends Component {
  @observable episodes = [];
  @observable numSeasons;
  @observable currentSeason;
  constructor(props) {
    super(props);
    this.activeDropdown = this.activeDropdown.bind(this);
    this.changeSeason = this.changeSeason.bind(this);
  }

  async initData() {
    this.numSeasons = await getNumOfSeasons(this.props.id);
    this.currentSeason = this.numSeasons;
    this.episodes = await getSeason(this.props.id, this.numSeasons);
  }

  componentWillMount () {
    this.initData();
  }

  // componentDidUpdate() {
  //   for (var i = 1; i < this.episodes.length; i+2) {
  //     var node = ReactDOM.findDOMNode(this.refs.list+i);
  //     if (node) node.classList.toggle('odd');
  //   }
  // }

  activeDropdown () {
    ReactDOM.findDOMNode(this.refs.dropdown).classList.toggle('active');
  }

  async changeSeason (event) {
    //this.props.changeSeason(event.target.id)
    this.currentSeason = event.target.id;
    const info = await getSeason(this.props.id, this.currentSeason);
    this.episodes = info;
  }


  render() {
    var listItems = this.episodes.map((data, i) => {
      return (
            <EpisodeListItem ref={"list"+data.num} key={this.props.id+data.date+data.num} id={this.props.id}
            num={data.num} name={data.name} date={data.date}
            seasonNum={this.currentSeason}/>
            )
    })
    var dropdownList = []
    for (var i = 1; i <= this.numSeasons; i++) {
      dropdownList.push(<li id={i} key={i}><a id={i} onClick={this.changeSeason}><h6 id={i}>{i}</h6></a></li>)
    };
    return (
    <div className="seasonList">
        <div className='row seasonNumber'>
          <h2>Season</h2>
          <div ref="dropdown" onClick={this.activeDropdown} className="wrapper-dropdown">
            <h2>
            {this.currentSeason}
            </h2>
            <ul className="dropdown">
              {dropdownList}
            </ul>
          </div>
        </div>
        <ul className='episodesList'>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          {listItems}

        </ReactCSSTransitionGroup>
        </ul>
    </div>
    );
  }
}

export default Season;
