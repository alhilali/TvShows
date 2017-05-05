import React, { Component } from 'react';
import './style/style.css';

class Poster extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="card fullyClear">
        <div className="view overlay hm-white-slight">
            <img src={"https://image.tmdb.org/t/p/w300/" + this.props.poster} alt=""/>
                <div className="mask"></div>
        </div>
      </div>
    );
  }
}

export default Poster;
