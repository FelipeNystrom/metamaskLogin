import { Component } from 'react';
import web3 from '../../web3';

class PollForUser extends Component {
  componentDidMount() {
    // listen for changes in metamask account
    web3.currentProvider.publicConfigStore.on('update', this.checkIfMetaMask);
  }

  checkIfMetaMask = async () => {
    await web3.eth.getAccounts((err, accounts) => {
      if (err !== null) {
        console.error('An error occurred: ' + err);
      } else if (accounts.length === 0) {
        this.props.noMetaMask();
      } else {
        this.props.fetchUserAndLogin(accounts[0]);
      }
    });
  };

  render() {
    return null;
  }
}
export default PollForUser;
