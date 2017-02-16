/* flow */

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

import App from '/imports/ui/pages/App';
import AppDashboard from '/imports/ui/pages/AppDashboard';

import {
  LandingPage,
  LandingPageIndex,
} from '/imports/ui/pages/public';

import {
  AuthPage,
  SignUp,
  SignIn,
} from '/imports/ui/pages/auth';

import {
  UserDashboard,
  UserDashboardIndex,
} from '/imports/ui/pages/user';

import {
  AdminDashboard,
  AdminDashboardIndex,
} from '/imports/ui/pages/admin';

const requireAuth = (nextState, replaceState) => {
  Tracker.autorun(() => {
    if (!Meteor.userId()) {
      replaceState({
        pathname: '/sign-in',
        state: { nextPathname: nextState.location.pathname },
      });
      return;
    }
  });
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
      <Route component={AppDashboard} onEnter={requireAuth}>
        <Route path="/dashboard" component={UserDashboard}>
          <IndexRoute component={UserDashboardIndex} />
        </Route>
        <Route path="/admin" component={AdminDashboard}>
          <IndexRoute component={AdminDashboardIndex} />
        </Route>
      </Route>
    </Route>
  </Router>;
