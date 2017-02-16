/* @flow */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Tracker } from 'meteor/tracker';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

type Props = {
  children?: React.Element<*>,
};

class Dashboard extends React.Component {
  computation: { stop: () => {} };

  constructor(props: Props) {
    super(props);

    this.computation = Tracker.autorun(() => {
      if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        browserHistory.push('/dashboard');
      }
    });
  }

  componentWillUnmount() {
    this.computation.stop();
  }

  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                App Name
              </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavDropdown eventKey={1} title="Profile" id="basic-nav-dropdown">
              <LinkContainer
                onClick={() => {
                  Meteor.logout();
                  browserHistory.push('/sign-in');
                }}
                to="/sign-in"
              >
                <MenuItem eventKey={1.1}>Logout</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

export default Dashboard;
