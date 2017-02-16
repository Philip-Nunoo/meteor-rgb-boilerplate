/* flow */

import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';
import {
  Navbar,
  Grid,
} from 'react-bootstrap';

const styles = {
  container: {
    height: '100%',
  },
};

export default class AuthPage extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  computation: {
    stop: () => {},
  };
  constructor() {
    super();

    this.computation = Tracker.autorun(() => {
      if (Meteor.userId()) {
        browserHistory.push('/dashboard');
      }
    });
  }

  componentWillUnmount() {
    this.computation.stop();
  }

  render() {
    return (
      <div style={styles.container}>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">App</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}
