import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Restricted from './components/Restricted';
import LoginMetamask from './components/web3-metamask/loginMetamask';
import PollForUser from './components/web3-metamask/PollForUser';

class App extends Component {
  state = {
    isLoggedIn: false,
    user: '',
    metamaskError: ''
  };

  noMetaMask = () => {
    this.setState(prevState => {
      return {
        prevState,
        metamaskError: 'Please log in on your metamask account',
        isLoggedIn: false,
        user: ''
      };
    });
  };

  fetchUserAndLogin = userInput => {
    this.setState(prevState => {
      if (prevState.user !== this.state.user || this.state.user === '') {
        return {
          prevState,
          user: userInput,
          isLoggedIn: true
        };
      }
    });
  };

  render() {
    const { isLoggedIn, user, metamaskError } = this.state;
    // auth middleware to check login
    const PrivateRoute = ({ render: Component, ...rest }) => (
      <Route
        {...rest}
        exact
        path="/"
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              exact
              to={{
                pathname: '/login'
              }}
            />
          )
        }
      />
    );
    return (
      <div className="App">
        <PollForUser
          noMetaMask={this.noMetaMask}
          fetchUserAndLogin={this.fetchUserAndLogin}
        />
        <Router>
          <Fragment>
            <PrivateRoute
              render={() => {
                return <Restricted name={user} />;
              }}
            />
            <Route
              exact
              path="/login"
              render={() => {
                return (
                  <LoginMetamask
                    isLoggedIn={isLoggedIn}
                    metamaskError={metamaskError}
                  />
                );
              }}
            />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
