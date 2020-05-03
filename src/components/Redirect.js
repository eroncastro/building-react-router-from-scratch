import { Component } from 'react';
import PropTypes from 'prop-types';

import { historyPush, historyReplace } from '../router';

export default class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    push: PropTypes.bool.isRequired
  };

  static defaultProps = {
    push: false
  };

  componentDidMount() {
    const { push, to } = this.props;

    push ? historyPush(to) : historyReplace(to);
  }

  render() {
    return null;
  }
};
