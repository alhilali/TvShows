import React, { Component } from 'react'
import { auth } from './helpers/auth'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div className="login-page">
        <form className="form login-form" onSubmit={this.handleSubmit}>
            <input type="text" className="form" ref={(email) => this.email = email} placeholder="Email"/>
            <input type="password" className="form" placeholder="Password" ref={(pw) => this.pw = pw} />
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
}
