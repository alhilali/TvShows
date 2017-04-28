import React, { Component } from 'react';
import './style/style.css';
import star from './img/icons/star2.svg';



class Show extends Component {
  constructor(props) {
    super(props);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite(){
  this.props.onFavoriteToggle("Priosn Break");
  }

  render() {
    return (
      <div className="card">
        <div className="view overlay hm-white-slight">
            <img src={"https://image.tmdb.org/t/p/w300/" + this.props.poster} alt=""/>
            <a href="#">
                <div className="mask"></div>
            </a>
        </div>
        <div className="card-block">
            <h3 className="card-title">{this.props.name}</h3>
            <hr />
            <div className="d-flex justify-content-center flex-row">
                <button href="#" className="btn btn-outline-warning"><img src={star} alt="" style={{width: '30px'}}/></button>
                <a href="#" className="btn btn-outline-primary">Read More</a>

            </div>
        </div>
      </div>
    );
  }
}

export default Show;
