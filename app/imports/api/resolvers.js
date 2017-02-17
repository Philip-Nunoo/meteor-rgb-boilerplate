/* @flow */

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

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
    async users(root, args, context = {}) {
      return Roles.userIsInRole(context.userId, 'admin') ?
      await Meteor.users.find().fetch() : [];
    },
  },
  Mutation: {
    editUserDetails(root, args, context = {}) {
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
