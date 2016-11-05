/* @flow */
/* eslint-disable import/prefer-default-export */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BaseSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
      return undefined;
    },
  },

  updatedAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      }
      return undefined;
    },
  },
});
