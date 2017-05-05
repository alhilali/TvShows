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
class Episode extends Component {
  @observable name = this.props.name;
  @observable background;
  @observable airDate;
  @observable overview;
  @observable numSeasons;
  @observable currentSeason = 1;

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
          <TvInfoBar overview={this.overview} numSeasons={this.numSeasons}/>
          <div className="flex-container flex-wrap justify-content-center">
            <Season id={this.props.match.params.id}/>
          </div>
        </div>
    );
  }
}

export default Episode;
