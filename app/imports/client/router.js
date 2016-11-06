/* flow */

import { Meteor } from 'meteor/meteor';
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
import AuthPage from '/imports/ui/pages/AuthPage';
import SignUp from '/imports/ui/pages/SignUp';
import SignIn from '/imports/ui/pages/SignIn';
import Dashboard from '/imports/ui/pages/Dashboard';
import DashboardIndex from '/imports/ui/pages/DashboardIndex';

const requireAuth = (nextState, replaceState) => {
  if (!Meteor.userId()) {
    replaceState({
      pathname: '/sign-in',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export default () =>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route component={LandingPage}>
        <IndexRoute component={LandingPageIndex} />
      </Route>
      <Route component={AuthPage} >
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </Route>
      <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}>
        <IndexRoute component={DashboardIndex} />
      </Route>
    </Route>
  </Router>;
