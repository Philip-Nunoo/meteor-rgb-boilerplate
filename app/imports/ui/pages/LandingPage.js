/* flow */

import React, { PropTypes } from 'react';
import {
  Navbar,
  Grid,
  Nav,
  NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const LandingPage = ({ children }) =>
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">App</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <LinkContainer to="/sign-up" onlyActiveOnIndex>
          <NavItem eventKey={1}>
            Sign Up
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/sign-in" onlyActiveOnIndex>
          <NavItem eventKey={1}>
            Login
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
    <Grid>
      {children}
    </Grid>
  </div>;

LandingPage.propTypes = {
  children: PropTypes.node,
};

export default LandingPage;
