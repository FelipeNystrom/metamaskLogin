import React, { Component } from 'react';
import './listItem.css';

class ListItem extends Component {
  state = {
    checked: false
  };
  handleClick = e => {
    e.preventDefault();
    this.setState({ checked: !this.state.checked });
  };
  render() {
    return (
      <li
        onClick={this.handleClick}
        className={this.state.checked ? 'checked' : ''}
      >
        <input id="one" type="checkbox" />
        <label htmlFor="one">
          <span />
          <p>{this.props.children}</p>
          <ins>
            <i>{this.props.children}</i>
          </ins>
        </label>
      </li>
    );
  }
}

export default ListItem;
