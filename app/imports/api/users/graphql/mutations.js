/* @flow */

import Users from '../collection';

export default {
  editUserDetails(root: any, args:any, context: any = {}) {
    if (!context.userId) {
      return { errors: [{ message: 'Must be logged in' }] };
    }

    Users.update(context.userId, { $set: args.input });

    return { id: context.userId };
  },
};
