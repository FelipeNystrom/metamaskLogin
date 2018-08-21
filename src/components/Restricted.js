import React, { Component } from 'react';
import Checklist from './Checklist';
import ChecklistInput from './ChecklistInput';
import './Restricted.css';

class Restricted extends Component {
  state = {
    req: []
  };

  queryDB = async user => {
    const url = `http://localhost:5000/api/user/${user}`;

    const result = await fetch(url, {
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
    console.log(result);
  };

  fetchNewReq = newReq => {
    this.setState(prevState => {
      return { req: [...prevState.req, newReq] };
    });
  };

  render() {
    const { name } = this.props;
    const { req } = this.state;
    return (
      <div className="listView">
        <div className="flexUser">Welcome {name}</div>
        <div className="flexInput">
          <ChecklistInput fetchNewReq={this.fetchNewReq} />
        </div>

        <div className="flexList">
          <Checklist listItemContent={req} />
        </div>
      </div>
    );
  }
}

export default Restricted;
