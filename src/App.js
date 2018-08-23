import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Restricted from './components/Restricted';
import LoginMetamask from './components/web3-metamask/loginMetamask';
import web3 from './web3';

class App extends Component {
  state = {
    isLoggedIn: false,
    checkingForMetaMask: 'Loading...',
    user: '',
    metamaskError: ''
  };
  componentDidMount() {
    web3.currentProvider.publicConfigStore.on('update', this.checkIfMetaMask);
  }

  componentDidUpdate(prevState) {
    if (prevState.user !== this.state.user) {
      this.checkIfMetaMask();
    }
  }

  checkIfMetaMask = async () => {
    await web3.eth.getAccounts((err, accounts) => {
      if (err !== null) {
        console.error('An error occurred: ' + err);
      } else if (accounts.length === 0) {
        this.noMetaMask();
      } else {
        this.fetchUserAndLogin(accounts[0]);
      }
    });
  };

  noMetaMask = () => {
    this.setState(prevState => {
      return {
        prevState,
        metamaskError: 'Please log in on your metamask account',
        checkingForMetaMask: '',
        isLoggedIn: false,
        user: ''
      };
    });
  };

  fetchUserAndLogin = userInput => {
    this.setState(prevState => {
      if (prevState.user !== userInput || this.state.user === '') {
        return {
          user: userInput,
          checkingForMetaMask: '',
          isLoggedIn: true
        };
      }
    });
  };

  render() {
    const centerLoading = {
      margin: 'auto auto'
    };
    const { isLoggedIn, user, metamaskError, checkingForMetaMask } = this.state;
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
        {checkingForMetaMask ? (
          <h1 style={centerLoading}>{checkingForMetaMask}</h1>
        ) : (
          <Router>
            <Fragment>
              <PrivateRoute
                render={() => {
                  return <Restricted user={user} />;
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
        )}
      </div>
    );
  }
}

export default App;
