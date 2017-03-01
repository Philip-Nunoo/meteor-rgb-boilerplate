/* @flow */

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import Users from '/imports/api/users/collection';

import userResolvers from '/imports/api/users/graphql/resolvers';

import userMutations from '/imports/api/users/graphql/mutations';

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
    ...userMutations,
  },
  MutationResult: {
    errors(root) {
      return root.errors;
    },
  },
  ...userResolvers,
};
