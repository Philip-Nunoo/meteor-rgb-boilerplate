/* @flow */

import { Meteor } from 'meteor/meteor';

import Users from './users/collection';

import userResolvers from './users/graphql/resolvers';

export default {
  Query: {
    async viewer(root, args, context = {}) {
      if (context.userId) {
        return Users.findOne(context.userId);
      }
      return undefined;
    },
    async user(root, args) {
      return await Users.findOne(args.id);
    },
  },
  Mutation: {
    async editUserDetails(root, args, context = {}) {
      if (!context.userId) {
        return { errors: [{ message: 'Must be logged in' }] };
      }

      Meteor.users.update(context.userId, { $set: args.input });

      return { id: context.userId };
    },
  },
  MutationResult: {
    errors(root) {
      return root.errors;
    },
  },
  ...userResolvers,
};
