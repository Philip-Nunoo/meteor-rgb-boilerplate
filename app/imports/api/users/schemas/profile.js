/* @flow */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});
