import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react"
import { getPopular, searchTMDB } from './helpers/tvDB'
import ShowList from './ShowList';
import './style/Home.css';

@observer
class Home extends Component {
  @observable tvshows = [];
  @observable keyword;
  @observable searchOn = false;

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query) {
      this.keyword = nextProps.query;
      console.log(nextProps.query);
      this.searchOn = true;
    } else {
    }
  }

  componentDidUpdate() {
    if (this.props.query === '') this.searchOn = false;
  }

  render() {
    return (
      <div id="greyBackground">
          {this.searchOn
          ? <ShowList type='search' title="Search Results" keyword={this.keyword}/>
          : <div></div>
          }
          <ShowList type='popular' title="Most Popular"/>
          <ShowList type='toprated' title="Top Rated"/>
          <ShowList type='tonight' title="New on TV Tonight"/>
          <ShowList type='onair' title="This Week"/>
      </div>
    );
  }
}

export default Home;
