/* @flow */

import { Meteor } from 'meteor/meteor';
import schema from './schema';

Meteor.users.attachSchema(schema);

export default Meteor.users;
