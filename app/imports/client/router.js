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
  AdminDashboardUsers,
  AdminDashboardFontIcons,
  AdminDashboardForms,
} from '/imports/ui/pages/admin';

import AdminPanelExample from '/imports/ui/components/MrgbBootstrap/Panel';

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
          <Route path="/admin/users" component={AdminDashboardUsers} />
          <Route path="/admin/icons" component={AdminDashboardFontIcons} />
          <Route path="/admin/forms" component={AdminDashboardForms} />
          <Route path="/admin/panels" component={AdminPanelExample} />
        </Route>
      </Route>
    </Route>
  </Router>;
