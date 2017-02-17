/* @flow */

import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';
import schema from '../schema';

const userResolvers = SchemaBridge.resolvers(schema, 'User');

userResolvers.User.id = ({ _id }) => _id;

export default userResolvers;
