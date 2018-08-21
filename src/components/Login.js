import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    redirectToReferrer: false,
    loginError: ''
  };

  componentDidMount() {
    console.log(window.web3.eth.getAccounts() === undefined);
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const result = await this.checkLogin(username, password);
    if (result.status === 202) {
      this.props.fetchUserAndLogin(result.username);
      this.setState({
        username: '',
        password: '',
        redirectToReferrer: true,
        loginError: ''
      });
    }
  };

  checkLogin = async (username, password) => {
    let resultObject = {};

    const url = 'http://localhost:5000/';

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: 'cors',
      body: JSON.stringify({})
    });

    const userName = await result.json();

    resultObject.status = await result.status;
    resultObject.username = userName;

    return resultObject;
  };

  render() {
    const { username, password, redirectToReferrer, loginError } = this.state;
    const { from } = { from: { pathname: '/' } };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <form id="loginForm" onSubmit={this.handleSubmit}>
        <h2>login</h2>
        <label>
          Username
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            value={username}
            placeholder="Username"
          />
        </label>
        <label>
          Password
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
          />
        </label>
        <label>
          <input type="submit" value="submit" />
        </label>
      </form>
    );
  }
}

export default Login;
