/* flow */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["logout"] }] */

import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Dashboard extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  logout() {
    Meteor.logout(() =>
      browserHistory.push('/sign-in')
    );
  }

  constructor() {
    super();

    this.state = { user: 'User' };
    this.logout = this.logout.bind(this);
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <Navbar fluid style={{ padding: '10px 25px' }}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/" style={{ padding: '15px' }}>
                App Name
              </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavDropdown eventKey={1} title={user} id="basic-nav-dropdown">
              <LinkContainer onClick={this.logout} to="/sign-in">
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
