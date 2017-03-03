/* @flow */

import React from 'react';
import { Link } from 'react-router';

export default () =>
  <div>
    <h1>404</h1>
    <h4>Houston, we have a problem.</h4>
    <p>Actually, the page you are looking for does not exist.</p>
    <Link to="/">Return home</Link>
  </div>;
