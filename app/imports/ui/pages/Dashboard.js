/* flow */

import React, { PropTypes } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Dashboard = ({ children }) =>
  <div>
    <Navbar fluid style={{ padding: '0px 20px' }}>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/" style={{ padding: '15px' }}>
            App Name
          </a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <LinkContainer to="/dashboard" onlyActiveOnIndex>
          <NavItem eventKey={1}>
            Logout
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
    <Grid>
      {children}
    </Grid>
  </div>;

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;
