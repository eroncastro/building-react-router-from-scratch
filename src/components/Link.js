import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { historyPush, historyReplace } from '../router';

export default class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    replace: PropTypes.bool
  };

  handleClick(event) {
    const { replace, to } = this.props;
    event.preventDefault(); // avoid causing a page refresh

    replace ? historyReplace(to) : historyPush(to);
  }

  render() {
    const { to, children } = this.props;

    return (
      <a href={to} onClick={this.handleClick.bind(this)}>
        {children}
      </a>
    );
  }
};
