import React, { Component, Fragment } from 'react';
import './addToList.css';
class addToList extends Component {
  state = {
    inputTitle: '',
    input: ''
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.fetchNewItem(this.state.input);
    this.setState({ input: '' });
  };

  checkKey = e => {
    if (e.key === 'Enter') {
      this.props.fetchNewItem(this.state.input);
      this.setState({ input: '' });
    }
  };

  render() {
    return (
      <Fragment>
        <form id="inputWrapper" onSubmit={this.handleSubmit}>
          <label htmlFor="requriement">
            Add Requirement
            <textarea
              type="text"
              onKeyPress={this.checkKey}
              onChange={this.handleChange}
              id="requriement"
              name="input"
              value={this.state.input}
              rows="4"
              cols="50"
              required
            />
          </label>
          <input type="submit" value="Add to list" />
        </form>
      </Fragment>
    );
  }
}

export default addToList;
