/* @flow */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '/imports/shared/schemas.js';
import Profile from './schemas/profile';
import Billing from './schemas/billing';

export default new SimpleSchema([
  BaseSchema,
  {
    emails: {
      type: [Object],
    },

    'emails.$.address': {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },

    'emails.$.verified': {
      type: Boolean,
      optional: true,
    },

    services: {
      type: Object,
      optional: true,
      blackbox: true,
    },

    profile: {
      type: Profile,
      optional: true,
    },

    billing: {
      type: Billing,
      optional: true,
    },

    roles: {
      type: [String],
      blackbox: true,
      optional: true,
    },
  },
]);
