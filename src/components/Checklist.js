import React from 'react';
import ListItem from './List-item';
import './Checklist.css';

function List(props) {
  const { listItemContent } = props;

  const generateListItems = listItemContent.map((content, i) => {
    return <ListItem key={i}>{content}</ListItem>;
  });
  return <ul>{generateListItems}</ul>;
}

export default List;
