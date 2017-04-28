import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react"
import './style/style.css';
import Sidebar from './Sidebar';
import Show from './Show';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

@observer
class Shows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvshows : observable([]),
      number : observable()
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.search = this.search.bind(this);
  }

  toggleFavorite(){
  this.props.onFavoriteToggle("Priosn Break");
  }

  search(query){
    if (query === "")
    {
      this.state = {
        tvshows : observable([])
      };
      this.componentWillMount();
      return;
    }
    let tvshows = observable([]);

    var data = "{}";
    var responses = "";

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        responses = JSON.parse(this.responseText);
        var array = [];
        array = responses.results;
        var i;
        for (i = 0; i < responses.total_results; i++) {
          if (responses.results[i] != null && responses.results[i].poster_path != null)
            tvshows.push({name: responses.results[i].name, poster: responses.results[i].poster_path});
        }

      }
    });

    xhr.open("GET", "https://api.themoviedb.org/3/search/tv?api_key=35a6a172e166875d39a99cf68b63af6b&language=en-US&page=1&query="+query+"&page=1");

    xhr.send(data);

    this.setState({tvshows});
  }



  componentWillMount() {
      this.state = {
      tvshows : observable([])
      };
      var list = observable([]);

      var data = "{}";
      var responses = "";

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          responses = JSON.parse(this.responseText);
          var array = [];
          array = responses.results;
          var i;
          for (i = 0; i < array.length; i++) {
            //console.log(responses.results[i].name);
            list.push({name: responses.results[i].name, poster: responses.results[i].poster_path});
            //console.log(myData);
            //

          }

        }
      });

      xhr.open("GET", "https://api.themoviedb.org/3/tv/popular?page=1&language=en-US&api_key=35a6a172e166875d39a99cf68b63af6b");

      xhr.send(data);


      this.setState({tvshows : list});
  }

  render() {

    if (this.state.tvshows.length > 0) {
      var listItems = this.state.tvshows.map((data, i) => {
        return (<Show name={data.name} poster={data.poster} key={i}/>)
      });
    }

    return (
      <div>
      <Sidebar onSearch={this.search}/>

      <ReactCSSTransitionGroup id="mainpanel" className="d-flex align-content-between flex-wrap"
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>

        {listItems}

      </ReactCSSTransitionGroup>

      </div>
    );
  }
}

export default Shows;
