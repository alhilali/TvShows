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
      tvshows : observable([])
    };
    this.search = this.search.bind(this);
  }


  search(query){
    if (query === "")
    {
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
        for (i = 0; i < array.length; i++) {
          if (responses.results[i].poster_path != null)
            tvshows.push({name: responses.results[i].name, poster: responses.results[i].poster_path});
        }

      }
    });

    xhr.open("GET", "https://api.themoviedb.org/3/search/tv?api_key=35a6a172e166875d39a99cf68b63af6b&language=en-US&page=1&query="+query+"&page=1");

    xhr.send(data);

    this.setState({tvshows});
  }



  listPop() {
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
    console.log(this.state.tvshows);

    return (
      <div>
      <Sidebar onSearch={this.search}/>
      <Shows showsList={this.state.tvshows}/>

      </div>
    );
  }
}

export default Shows;
