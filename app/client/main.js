/* @flow */
/* global document */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from '/imports/client/apollo';
import Router from '/imports/client/router';

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>,
    document.getElementById('app'));
});
