/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import selectn from 'selectn';
import { graphql } from 'react-apollo';
import {
  Table,
} from 'react-bootstrap';
import moment from 'moment';

const formatDate = (date, format = 'D MMM YYYY') => moment(date).format(format);

const usersQuery = gql`
  query Users {
    users {
      id
      emails {
        address
        verified
      }
      username
      profile {
        firstName
        lastName
      }
      createdAt
      updatedAt
      roles
    }
  }
`;

const withQueries = graphql(usersQuery);

type Props = {
  data: {
    loading: boolean,
    users: [{
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
    }],
  },
};

const DashboardUsers = ({ ...props }: Props) => {
  const { data } = props;
  const users = selectn('users', data) || [];

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Username</th>
            <th>Name</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>{!data.loading &&
          users.map((user, index) =>
            <tr key={index}>
              <td />
              <td>{user.emails[0].address}</td>
              <td>{user.emails[0].verified ? 'true' : 'false'}</td>
              <td>{user.username}</td>
              <td>{user.profile && `${user.profile.firstName} ${user.profile.lastName}`}</td>
              <td>{formatDate(user.createdAt)}</td>
            </tr>
        )}
        </tbody>
      </Table>
    </div>
  );
};

export default withQueries(DashboardUsers);
