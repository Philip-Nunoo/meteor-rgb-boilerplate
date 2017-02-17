import userSchema from './users/graphql/schema';

export default [
  userSchema,
  `
type Query {
  viewer: User
  user(id: String!): User
  users: [User]
}

type MutationError {
  key: String
  message: String!
}

type MutationResult {
  id: String
  errors: [MutationError]
}

type Mutation {
  editUserDetails(input: EditUserDetailsInput!): MutationResult!
}

schema {
  query: Query
  mutation: Mutation
}
`];
