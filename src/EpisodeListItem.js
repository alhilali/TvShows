import React, { Component } from 'react';
import './style/epList.css';
import star from './img/icons/star2.svg';
import { firebaseAuth } from './config/constants'
import { Link } from 'react-router-dom'
import { saveShow } from './helpers/auth'
import { episodeWatched, isWatched, episodeNotWatched } from './helpers/tvDB'
import { observable } from 'mobx';
import { observer } from "mobx-react"


@observer
class EpisodeListItem extends Component {
  @observable watched;
  constructor(props) {
    super(props);
    this.watchedEpisode = this.watchedEpisode.bind(this);
    this.unWatchEpisode = this.unWatchEpisode.bind(this);
  }

  async componentWillMount () {
    var bind = this
    this.watched = await isWatched(this.props.id, this.props.seasonNum, this.props.num)
  }

  watchedEpisode() {
    episodeWatched(this.props.id, this.props.seasonNum, this.props.num);
    this.watched = true;
  }

  unWatchEpisode() {
    episodeNotWatched(this.props.id, this.props.seasonNum, this.props.num);
    this.watched = false;
  }


  render() {
    return (
        <li>
          <div className="row epList">
            <div className="col-sm-7 epName">
              {this.props.num}<span id="spacer"/>

              <Link to={"/ep/"+this.props.id+"/"+this.props.seasonNum+"/"+this.props.num}>
              {this.props.name}
              </Link>
            </div>
            <div className='col-sm-4 epDate'>
              {this.props.date}
            </div>

            <div className="col-sm-1 watchBtn">
              {this.watched
                ? <a onClick={this.unWatchEpisode}>
                  <div className="inoc inoc-eye"></div>
                  </a>
                :
                  <a onClick={this.watchedEpisode}>
                  <div className="ic ic-eye"></div>
                  </a>
              }
            </div>
          </div>
        </li>
    );
  }
}

export default EpisodeListItem;
