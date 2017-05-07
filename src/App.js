import React, { Component } from 'react';
import {BrowserRouter as Router, browserHistory, Route} from 'react-router-dom'
import './style/App.css';
import Shows from './Shows';
import Myshows from './Myshows';
import { Provider } from 'mobx-react';
import stores from './stores'


const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

class App extends Component {
  render() {
    return (
      <Provider user={stores.user}>
        <Router history={browserHistory} >
          <div className="App" style={{ display: 'flex row' }}>
            <Route path="/" component={Shows}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
