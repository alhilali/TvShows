import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './style/App.css';
import Sidebar from './Sidebar'
import Show from './Show'
import Shows from './Shows'
import Info from './ShowInfo'
import Login from './Login'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites : []
    };

    this.addToFavorites = this.addToFavorites.bind(this);
  }

  addToFavorites(name){

		var favorites = this.state.favorites;

		favorites.push({
			name: name
		});

		this.setState({
			favorites: favorites
		});

		localStorage.favorites = JSON.stringify(favorites);
	}


  render() {
    return (
      <Router>
      <div className="App">
      <Route path="/" component={Shows}/>
      <Route path="/login" component={Login}/>
      </div>
      </Router>
    );
  }
}

export default App;
