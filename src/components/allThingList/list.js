import React, { Component, Fragment } from 'react';
import AddToList from './addToList.js';
import ListItem from './listItem';
import ListWindow from './listWindow';
import './list.css';

class List extends Component {
  state = {
    listItemContent: [],
    listTitle: 'List title',
    createList: false
  };
  handleCreateList = e => {
    e.preventDefault();
    this.setState({ createList: true });
  };

  handleSaveList = e => {
    e.preventDefault();
    this.setState({ createList: false });
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
    const { listItemContent, listTitle, createList } = this.state;
    const generateListItems = listItemContent.map((content, i) => {
      return <ListItem key={i}>{content}</ListItem>;
    });
    return (
      <Fragment>
        <form className="list">
          {createList ? (
            <button
              onClick={this.handleSaveList}
              className="button saveNewList"
            >
              Save List
            </button>
          ) : (
            <button
              onClick={this.handleCreateList}
              className="button createNewList"
            >
              Create New List
            </button>
          )}

          {createList ? (
            <Fragment>
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
            </Fragment>
          ) : (
            ''
          )}
        </form>
      </Fragment>
    );
  }
}

export default List;
