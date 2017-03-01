/* @flow */

import cors from 'cors';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '/imports/api/schema';
import resolvers from '/imports/api/resolvers';

import '/imports/server';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const whitelist = [
  // Allowed domains
  // TODO: whitelist domains
  // 'http://your.web.ip.address',
];

const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};

createApolloServer({
  schema,
}, {
  configServer(graphQLServer) {
    graphQLServer.use(cors(corsOptions));
  },
});
