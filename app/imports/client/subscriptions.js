/* @flow */

import { print } from 'graphql-tag/bundledPrinter';

const addGraphQLSubscriptions = (networkInterface: any, wsClient: any) =>
  Object.assign(networkInterface, {
    subscribe: (request, handler) => wsClient.subscribe({
      query: print(request.query),
      variables: request.variables,
    }, handler),
    unsubscribe: (id) => {
      wsClient.unsubscribe(id);
    },
  }
);

export default addGraphQLSubscriptions;
