import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';

export default new ApolloClient(meteorClientConfig());
