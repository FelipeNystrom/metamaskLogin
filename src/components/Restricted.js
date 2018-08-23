import React, { Component } from 'react';
import List from './allThingList/list';
import './Restricted.css';

class Restricted extends Component {
  state = {
    userAlreadyExist: false
  };

  componentDidMount() {
    if (!this.state.userAlreadyExist) this.checkIfUserExists(this.props.user);
    if (!this.props.user) this.setState({ userAlreadyExist: false });
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
    console.log(doUserExists);
    if (doUserExists.length !== 0) this.setState({ userAlreadyExist: true });
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

  render() {
    const { user } = this.props;
    return (
      <div className="listView">
        <div className="flexUser">Welcome {user}</div>

        <div user={user} className="flexList">
          <List />
        </div>
      </div>
    );
  }
}

export default Restricted;
