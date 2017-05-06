import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import './style/sidebar.css'
import { Link } from 'react-router-dom'
import { logout } from './helpers/auth'


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed : false
    }
    this.collapse = this.collapse.bind(this);
  }

  onChange(event) {
    this.props.onSearch(event.target.value);
  }

  activateMyshows () {
  }

  activateHome () {
  }

  collapse () {
    let result;
    if (this.state.isCollapsed) {
      ReactDOM.findDOMNode(this.refs.sidebar).style.left = '0px';
      result = false;
    } else {
      ReactDOM.findDOMNode(this.refs.sidebar).style.left = '-220px'
      result = true;
    }
    this.props.toggle()
    this.setState({isCollapsed : result});
  }

  render() {
    return (
        <nav ref="sidebar" className="navbar navbar-dark red bg-primary">
            <div className="container">
                <div id="collapseBtn">
                  <a onClick={this.collapse} href="#">
                    <div className="toggleBtn">
                    {this.state.isCollapsed
                      ? <span>&gt;</span>
                      : <span>&lt;</span>
                    }
                    </div>
                  </a>
                </div>
                <a className="navbar-brand" href="#">
                    <strong>TV</strong>
                </a>
                <ul className="navbar-nav mr-auto">
                    <li ref="home" className="nav-item">
                        <Link onClick={this.activateHome} to="/home" className="nav-link">Home</Link>
                    </li>
                    <li ref="myshows" className="nav-item">
                        <Link onClick={this.activateMyshows} to="/myshows" className="nav-link">My Shows</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">Watch Next</a>
                    </li>
                    <li className="nav-item">
                    {this.props.authed
                      ? <a onClick={() => {
                          logout()
                        }} className="nav-link">Logout</a>
                    : <span>
                      <Link to="/login" className="nav-link">Login</Link>
                      <Link to="/register" className="nav-link">Register</Link>
                      </span>
                    }
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
