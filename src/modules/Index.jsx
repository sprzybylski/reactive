import React, { PropTypes } from 'react';
import { Link, locationShape } from 'react-router';
import DevTools from 'mobx-react-devtools';
import classnames from 'classnames';
import { connect } from 'react-redux';

const Index = props => (
  <div id="Index">
    {process.env.NODE_ENV !== 'production' && <DevTools />}
    <nav className="navbar navbar-fixed-top navbar-inverse">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">
          Reactive
        </Link>
      </div>
      <ul className="nav navbar-nav">
        <li className={classnames({ active: props.location.pathname.includes('/reduxchat') })}>
          <Link to="/reduxchat">Redux Chat ({props.count})</Link>
        </li>
        <li className={classnames({ active: props.location.pathname.includes('/mobxchat') })}>
          <Link to="/mobxchat">Mobx Chat</Link>
        </li>
      </ul>
    </nav>
    <div id="App" className="container-fluid">
      {props.children}
    </div>
  </div>
);

Index.propTypes = {
  children: PropTypes.node.isRequired,
  location: locationShape.isRequired,
};

export default connect(state => ({
    count: state.chat.messages.size,
}))(Index);