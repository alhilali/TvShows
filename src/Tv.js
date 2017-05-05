import React, { Component } from 'react';
import './style/tv.css';
import './style/style.css';
import star from './img/icons/star2.svg';
import { firebaseAuth } from './config/constants'
import { Link } from 'react-router-dom'
import { saveShow } from './helpers/auth'
import { setAllInfo, setInfo, getBackground, isFavorite } from './helpers/tvDB'
import { observable } from 'mobx';
import { observer } from "mobx-react"
import Season from './Season'
import Poster from './Poster'
import TvInfoBar from './TvInfoBar'


@observer
class Tv extends Component {
  @observable poster = this.props.poster;
  @observable name = this.props.name;
  @observable background;
  @observable airDate;
  @observable overview;
  @observable numSeasons;
  @observable currentSeason = 1;
  @observable network;
  @observable running;

  constructor(props) {
    super(props);
    this.state = {
      uid: -1
    };
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          uid: user.uid,
        })
      } else {
        this.setState({
          uid: -1,
        })
      }
    })
  }

  async initData() {
    const info = await setAllInfo(this.props.match.params.id);
    this.poster = info.poster;
    this.name = info.name;
    this.background = info.background;
    this.airDate = info.airDate;
    this.overview = info.overview;
    this.numSeasons = info.numSeasons;
    this.network = info.network;
    this.running = info.running;

  }

  componentWillMount () {
    //this.background = await getBackground(this.props.match.params.id);
    this.initData();
  }

  componentWillUnmount () {
    this.removeListener()
  }


  render() {
    var style = {
      background: 'url(https://image.tmdb.org/t/p/original/'+this.background + ')'
    };

    return (
        <div>
          <div className="topBackground" style={style}>
              <div className="showName">
                  <h1> {this.name} </h1>
              </div>
          </div>
          <TvInfoBar overview={this.overview} numSeasons={this.numSeasons}
           network={this.network} running={this.running}/>
          <div className="flex-container flex-wrap justify-content-center">
            <Season id={this.props.match.params.id}/>
          </div>
        </div>
    );
  }
}

export default Tv;
