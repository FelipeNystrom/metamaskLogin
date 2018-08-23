import React, { Component } from 'react';
import ListDashboard from './allThingList/listDashboard';
import List from './allThingList/list';
import './Restricted.css';

class Restricted extends Component {
  state = {
    userAlreadyExist: false,
    createList: false
  };

  componentDidMount() {
    if (!this.state.userAlreadyExist) this.checkIfUserExists(this.props.user);
    if (!this.props.user) this.setState({ userAlreadyExist: false });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user !== this.props.user &&
      this.state.userAlreadyExist === true
    ) {
      this.setState({ userAlreadyExist: false });
      this.checkIfUserExists(this.props.user);
    }
  }

  checkIfUserExists = async user => {
    const checkUserUrl = `http://localhost:5000/api/user/find`;

    let response = await fetch(checkUserUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: 'cors',
      body: JSON.stringify({
        user: user
      })
    });

    const doUserExists = await response.json();
    if (doUserExists.length !== 0) {
      this.setState({ userAlreadyExist: true });
    }
    if (doUserExists.length === 0) {
      this.createUser(user);
      this.setState({ userAlreadyExist: true });
    }
  };

  createUser = async user => {
    const createUserUrl = `http://localhost:5000/api/user/create`;
    const response = await fetch(createUserUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: 'cors',
      body: JSON.stringify({
        user: user
      })
    });

    const isUserCreated = await response.json();
    console.log(isUserCreated);
  };

  handleCreateList = e => {
    e.preventDefault();
    this.setState({ createList: true });
  };

  handleSaveList = e => {
    e.preventDefault();
    this.setState({ createList: false });
  };

  render() {
    const { user } = this.props;
    const { createList } = this.state;

    return (
      <div className="mainView">
        <div className="mainNav">
          <span>Welcome {user}</span>
          {createList ? (
            <button onClick={this.handleSaveList} className="saveNewList">
              Save List
            </button>
          ) : (
            <button onClick={this.handleCreateList} className="createNewList">
              Create New List
            </button>
          )}
        </div>

        <div className="flexList">
          {createList ? <List user={user} /> : <ListDashboard />}
        </div>
      </div>
    );
  }
}

export default Restricted;
