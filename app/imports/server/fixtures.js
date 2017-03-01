/* @flow */

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

const users = [{
  email: 'admin@mtrgb.com',
  password: 'password',
  username: 'admin',
  profile: {
    firstName: 'Admin',
    lastName: 'User',
  },
  roles: ['admin'],
}];

users.forEach(({ email, username, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, username, password, profile });
    Roles.addUsersToRoles(userId, roles);
    // eslint-disable-next-line no-console
    console.log('Created Admin Successfully');
  }
});
