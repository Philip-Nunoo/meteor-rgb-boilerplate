/* @flow */
/* eslint-disable import/prefer-default-export */

export const country = {
  type: String,
  allowedValues: [
    'uk',
    'usa',
  ],
  autoform: {
    afFieldInput: {
      type: 'select',
      options: [
        { label: 'United States', value: 'usa' },
        { label: 'United Kingdom', value: 'uk' },
      ],
      firstOption: '',
    },
  },
};
