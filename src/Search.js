import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react"
import Show from './Show';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { searchTMDB } from './helpers/tvDB'
import './style/ShowList.css';

@observer
class ShowList extends Component {
  @observable tvshows = [];
  constructor(props) {
    super(props);
    console.log(props);
  }

  async componentWillMount() {
    this.tvshows = await searchTMDB(this.props.match.params.keyword);
  }

  render() {
    if (this.tvshows.length > 0) {
      var listItems = this.tvshows.map((data, i) => {
        return (<Show name={data.name} poster={data.poster} id={data.id} key={data.id}/>)
      });
    }

    return (
      <div id="showList">
        <div id="listBack">
          <div id="listTitle">
            <h2><strong></strong></h2>
          </div>
            <ReactCSSTransitionGroup className="d-flex align-content-between showList"
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>

              {listItems}

            </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default ShowList;
