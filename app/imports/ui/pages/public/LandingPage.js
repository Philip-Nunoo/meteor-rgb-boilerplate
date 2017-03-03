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
  <div style={{ minHeight: '100%' }}>
    <div className="footer-handler">
      <Navbar fluid fixedTop className="navbar-public">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Mechanico</a>
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
      <Grid style={{ paddingTop: 50 }}>
        {children}
      </Grid>
    </div>
    <footer className="footer">
      Copyright &copy; 2017 Mechanico
    </footer>
  </div>;

LandingPage.propTypes = {
  children: PropTypes.node,
};

export default LandingPage;
