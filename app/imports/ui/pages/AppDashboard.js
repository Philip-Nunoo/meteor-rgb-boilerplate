/* @flow */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["logout"] }] */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Tracker } from 'meteor/tracker';

type Props = {
  children?: React.Element<*>,
};

class Dashboard extends React.Component {
  computation: { stop: () => {} };

  constructor(props: Props) {
    super(props);

    this.computation = Tracker.autorun(() => {
      if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
        browserHistory.push('/admin');
      }
    });

    this.state = { user: 'User' };
  }

  componentWillUnmount() {
    this.computation.stop();
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}

export default Dashboard;
