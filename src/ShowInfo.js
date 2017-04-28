import React, { Component } from 'react';
import './style/style.css';
import star from './img/icons/star2.svg';
import Sidebar from './Sidebar';

class Show extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div>
      <Sidebar/>
      <div className="card">
        <div className="view overlay hm-white-slight">
            <img src="https://68.media.tumblr.com/33fc86b19e5b1f7cae39852b79ab2faa/tumblr_oc2fu71Vwk1uc58z4o1_500.jpg" alt=""/>
            <a href="#"><div className="mask"></div></a>
        </div>
        <div className="card-block">
            <h3 className="card-title">Dexter</h3>
            <hr />
            <div className="d-flex justify-content-center flex-row">

                <a href="#" className="btn btn-outline-warning"><img src={star} alt="" style={{width: '30px'}}/></a>
                <a href="#" className="btn btn-outline-primary">Read More</a>

            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Show;
