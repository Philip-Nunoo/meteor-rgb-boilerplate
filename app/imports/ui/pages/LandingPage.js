/* flow */

import React, { PropTypes } from 'react';
import {
  Navbar,
  Grid,
} from 'react-bootstrap';

const LandingPage = ({ children }) =>
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">App</a>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
    <Grid>
      {children}
    </Grid>
  </div>;

LandingPage.propTypes = {
  children: PropTypes.node,
};

export default LandingPage;
