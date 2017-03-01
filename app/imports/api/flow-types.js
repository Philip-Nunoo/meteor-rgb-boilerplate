/* @flow */

export type User = {
  id: string,
  username: string,
  emails: [{
    address: string,
    verified: boolean,
  }],
  profile: {
    firstName: string,
    lastName: string,
  },
  createdAt: string,
  updatedAt: string,
};
