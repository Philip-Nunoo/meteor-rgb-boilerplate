/* flow */

import { WebApp } from 'meteor/webapp';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionManager } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import typeDefs from '/imports/api/schema';
import resolvers from '/imports/api/resolvers';
import pubsub from '/imports/api/pubsub';

const WS_PORT = process.env.WS_PORT || 3131;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {},
});

const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// eslint-disable-next-line no-console
websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));

WebApp.httpServer.on('upgrade', (req, res) => {
  if (req.url === '/subscription_manager') {
    websocketServer.emit('upgrade', req, res);
  }
});

// eslint-disable-next-line no-new
new SubscriptionServer(
  { subscriptionManager },
  { server: websocketServer }
);
