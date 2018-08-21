import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class checkMM extends Component {
  state = {
    redirectToReferrer: false
  };

  componentDidUpdate() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (this.props.isLoggedIn) {
      this.setState({ redirectToReferrer: true });
    }
  };

  render() {
    const from = '/';
    const { metamaskError } = this.props;

    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h1>{metamaskError}</h1>
      </div>
    );
  }
}

export default checkMM;
