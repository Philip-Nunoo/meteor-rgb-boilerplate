import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '/imports/shared/schemas.js';
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

    firstname: {
      type: String,
      optional: true,
    },

    lastname: {
      type: String,
      optional: true,
    },

    billing: {
      type: Billing,
      optional: true,
    },
  },
]);
