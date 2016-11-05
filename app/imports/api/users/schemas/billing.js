/* @flow */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  company: {
    type: String,
    optional: true,
  },

  address1: {
    type: String,
  },

  address2: {
    type: String,
    optional: true,
  },

  city: {
    type: String,
  },

  state: {
    type: String,
  },

  zip: {
    type: String,
  },

  taxID: {
    type: String,
    optional: true,
  },
});
