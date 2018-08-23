import React, { Component, Fragment } from 'react';
import AddToList from './addToList.js';
import ListItem from './listItem';
import ListWindow from './listWindow';
import './list.css';

class List extends Component {
  state = {
    listItemContent: [],
    listTitle: 'List title'
  };

  fetchNewItem = newItem => {
    this.setState(prevState => {
      return { listItemContent: [...prevState.listItemContent, newItem] };
    });
  };

  handleTitle = e => {
    e.preventDefault();
    this.setState({ listTitle: e.target.value });
  };

  handleDisable = e => {
    e.preventDefault();
    this.setState({ inputDisabled: true });
  };

  render() {
    const { listItemContent, listTitle } = this.state;
    const generateListItems = listItemContent.map((content, i) => {
      return <ListItem key={i}>{content}</ListItem>;
    });
    return (
      <Fragment>
        <div className="list">
          <div className="listTitle">
            <input
              className="listTitleInput"
              value={listTitle}
              onChange={this.handleTitle}
              name={listTitle}
            />
          </div>
          <ListWindow>{generateListItems}</ListWindow>
          <AddToList fetchNewItem={this.fetchNewItem} />
        </div>
      </Fragment>
    );
  }
}

export default List;
