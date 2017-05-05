import React, { Component } from 'react';
import './style/style.css';
import './style/show.css'
import fullStar from './img/icons/star2.svg';
import emptyStar from './img/icons/star1.png';
import { firebaseAuth } from './config/constants'
import { Link } from 'react-router-dom'
import { setInfo, isFavorite, deleteShow, saveShow } from './helpers/tvDB'
import { observable } from 'mobx';
import { observer } from "mobx-react"


@observer
class Show extends Component {
  @observable cposter = this.props.poster;
  @observable name = this.props.name;
  @observable isFav = false;
  constructor(props) {
    super(props);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleUnFavorite = this.toggleUnFavorite.bind(this);
    this.state = {
      uid: -1
    };

  }

  async componentWillMount () {
    var bind = this
    this.isFav = await isFavorite(this.props.id)
    if (this.cposter === undefined || this.name === undefined) {
      setInfo(bind, this.props.id);
    }
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

  componentWillUnmount () {
    this.removeListener()
  }

  toggleFavorite(){
    saveShow(this.state.uid, this.name, this.props.id);
    this.isFav = true;
  }

  toggleUnFavorite(){
    deleteShow(this.state.uid, this.props.id);
    this.isFav = false;
  }

  hover (e) {
    e.target.src = fullStar;
  }

  hoverOut (e) {
    e.target.src = emptyStar;
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-left">
            {this.isFav
              ? <a id="favButn" onClick={this.toggleUnFavorite} ><img src={fullStar} alt="" style={{width: '25px'}}/></a>
              : <a id="favButn" onClick={this.toggleFavorite} ><img onMouseOver={this.hover} onMouseOut={this.hoverOut} src={emptyStar} alt="" style={{width: '25px'}}/></a>
            }
        </div>
        <div className="card">
          <div className="view overlay hm-white-slight">
              <img src={"https://image.tmdb.org/t/p/w300/" + this.cposter} alt=""/>
              <Link to={"/tv/"+this.props.id}>
                <div className="mask"></div>
              </Link>
          </div>
        </div>
            <div className="left">
              <h2 id="title">
                <Link to={"/tv/"+this.props.id}>
                  {this.name}
                </Link>
              </h2>
            </div>
      </div>
    );
  }
}

export default Show;
