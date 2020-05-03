import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { matchPath, register, unregister } from '../router';

/**
 * In general, there are only two ways for a user to update the URL:
 * 1) Clicking on an anchor tag;
 * 2) Clicking the back/forward button.
 *
 * Our router needs to be aware of the current URL and render UI
 * based on it.
 *
 * Let's start with back/forward button. Whenever a user clicks these buttons,
 * the popstate event is fired. Since Route component is responsible for
 * rendering UI based on the URL the user is currently in, it also should be able
 * to listen for this event and re-render the component.
 */

export default class Route extends Component {
  static propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func,
    render: PropTypes.func
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handlePop);
    register(this);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePop);
    unregister(this);
  }

  handlePop() {
    this.forceUpdate();
  }

  render() {
    const { path, exact, component, render } = this.props;
    const match = matchPath(window.location.pathname, { path, exact });

    if (!match) {
      return null;
    }

    if (component) {
      return React.createElement(component, { match });
    }

    if (render) {
      return render({ match });
    }

    return null;
  }
}
