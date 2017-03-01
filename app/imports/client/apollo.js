/* @flow */
/* global window */

import { Meteor } from 'meteor/meteor';
import ApolloClient from 'apollo-client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { meteorClientConfig } from 'meteor/apollo';

import addGraphQLSubscriptions from './subscriptions';

// export default new ApolloClient(meteorClientConfig());

// const wsClient = new Client('ws://localhost:8080');
const WS_PORT = process.env.WS_PORT || 3131;

const isSecure = /^https/.test(window.location.href);
const wsProtocol = isSecure ? 'wss' : 'ws';
let url = `${Meteor.absoluteUrl().replace(/^https?/, wsProtocol)}/subscription_manager`;
if (WS_PORT === 3131) { // set dev url
  url = `${wsProtocol}://localhost:${WS_PORT}/subscription_manager`;
}

const wsClient = new SubscriptionClient(url);

let onConnectionReturned;

wsClient.on('connect', () => {
  if (typeof onConnectionReturned === 'function') {
    onConnectionReturned();
  }
  onConnectionReturned = null;
});

wsClient.on('disconnect', () => {
  wsClient.connect();
  onConnectionReturned = () => window.location.reload();
});

const meteorConfig = meteorClientConfig();
const networkInterface = meteorConfig.networkInterface;

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export default new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});
