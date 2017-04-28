import React, { Component } from 'react';
import './style/style.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Sidebar extends Component {
  constructor(props) {
    super(props)

  }

  onChange(event) {
    this.props.onSearch(event.target.value);
  }
  render() {
    return (
      <nav className="navbar navbar-dark red bg-primary">
          <div className="container">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand" href="#">
                  <strong>TV</strong>
              </a>
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                      <Link to="/home" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link">My Shows</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link">Watch Next</a>
                  </li>
              </ul>
              <form className="form-inline waves-effect waves-light">
                  <input onChange={this.onChange.bind(this)} className="form-control" type="text" placeholder="Search" />
              </form>
          </div>
      </nav>
    );
  }
}

export default Sidebar;
