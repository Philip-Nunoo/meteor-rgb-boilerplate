import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

import App from '/imports/ui/pages/App';
import LandingPage from '/imports/ui/pages/LandingPage';
import LandingPageIndex from '/imports/ui/pages/LandingPageIndex';

export default () =>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route component={LandingPage}>
        <IndexRoute component={LandingPageIndex} />
      </Route>
    </Route>
  </Router>;
