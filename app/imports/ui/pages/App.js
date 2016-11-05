/* @flow */

import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

const styles = {
  container: {
    height: '100%',
  },
};

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  computation: {
    stop: () => {},
  };
  constructor() {
    super();

    this.computation = Tracker.autorun((c) => {
      if (!Meteor.userId() && !c.firstRun) {
        browserHistory.push('/sign-in');
      }
    });
  }

  componentWillUnmount() {
    this.computation.stop();
  }

  render() {
    return (
      <div style={styles.container}>{this.props.children}</div>
    );
  }
}
