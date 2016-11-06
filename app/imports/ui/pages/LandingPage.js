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
            Signup
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
