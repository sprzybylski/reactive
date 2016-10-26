import React, { PropTypes } from 'react';
import { List } from 'immutable';

const Messages = props => (
  <ul className="Messages list-group">
    {props.messages.map((msg, index) =>
      <li key={index} className="list-group-item">
        <span>{msg}</span> <a onClick={() => props.deleteMessage(index)}>del</a>
      </li>
    )}
  </ul>
);

Messages.propTypes = {
  messages: PropTypes.instanceOf(List).isRequired,
};

export default Messages;
