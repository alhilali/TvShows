import React, { Component } from 'react';
import './style/tvInfo.css';

class TvInfoBar extends Component {

  render() {
    return (
      <div className="info">
        <div className="basic-infos">
            <span>Sunday at <time dateTime="9:00 PM">9:00 PM</time></span>
            <span className="separator">•</span>
            <span>{this.props.network}</span>
            <span className="separator">•</span>
            <span>
            {this.props.numSeasons} &nbsp;
            {this.props.numSeasons > 1
              ? <span>seasons</span>
              : <span>season</span>
            } </span>
            <span className="separator">•</span>
            {this.props.running
              ? <span>Still Running</span>
              : <span>Finished</span>
            }
          </div>
          <div className="overview">
            {this.props.overview}
          </div>
      </div>
    );
  }
}

export default TvInfoBar;
