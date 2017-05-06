import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react"
import { getPopular, searchTMDB } from './helpers/tvDB'
import ShowList from './ShowList';
import './style/Home.css';

@observer
class Home extends Component {
  @observable tvshows = [];
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query) {
      this.search(nextProps.query)
    } else {
      this.tvshows = [];
      this.setList();
    }
  }

  async setList() {
    this.tvshows = await getPopular();
  }

  async search(query)
  {
    let tvshows = observable([]);
    this.tvshows = await searchTMDB(query);
  }

  componentWillMount() {
    this.setList();
  }

  render() {
    return (
      <div id="greyBackground">
          <ShowList type='popular' title="Most Popular"/>
          <ShowList type='toprated' title="Top Rated"/>
          <ShowList type='tonight' title="New on TV Tonight"/>
          <ShowList type='onair' title="This Week"/>
      </div>
    );
  }
}

export default Home;
