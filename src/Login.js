import React, { Component } from 'react'
import { login, resetPassword } from './helpers/auth'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMessage: null
    };
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <div className="login-page">
        <div>
          <h3>Login, please.</h3>
          <form className="form login-form" onSubmit={this.handleSubmit}>
              <input type="text" className="form" ref={(email) => this.email = email} placeholder="Email"/>
              <input type="password" className="form" placeholder="Password" ref={(pw) => this.pw = pw} />
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
              </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    )
  }
}
