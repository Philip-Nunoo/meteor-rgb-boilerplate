/* @flow */

import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';
import schema from '../schema';

const userSchema = SchemaBridge.schema(schema, 'User', { wrap: false });

export default `
  ${userSchema.objects}

  type User {
    ${userSchema.fields}
  }

  input EditUserDetailsInput {
    firstname: String!
    lastname: String!
  }
`;
