import React, { Component, Fragment } from 'react';
import './ChecklistInput.css';

class ChecklistInput extends Component {
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
    this.props.fetchNewReq(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <Fragment>
        <form id="inputWrapper" onSubmit={this.handleSubmit}>
          <h2>requriments</h2>
          <label htmlFor="requriement">
            Requriment specified
            <textarea
              type="text"
              onChange={this.handleChange}
              id="requriement"
              name="input"
              value={this.state.input}
              rows="4"
              cols="50"
              required
            />
          </label>
          <input type="submit" value="New Requirement" />
        </form>
      </Fragment>
    );
  }
}

export default ChecklistInput;
