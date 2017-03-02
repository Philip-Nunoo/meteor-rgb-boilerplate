/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import selectn from 'selectn';
import { graphql } from 'react-apollo';
import {
  Table,
} from 'react-bootstrap';
import moment from 'moment';

import type { User } from '/imports/api/flow-types';

const formatDate = (date, format = 'D MMM YYYY') =>
  moment(date, 'ddd MMM DD YYYY HH:mm:ss').format(format);

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
    users: [User],
  },
};

const DashboardUsers = ({ ...props }: Props) => {
  const { data } = props;
  const users = selectn('users', data) || [];

  return (
    <div>
      <hr />
      <div className="mrg-panel light fit bordered">
        <div className="mrg-panel-title">Users</div>
        <div className="mrg-panel-body">
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
      </div>
    </div>
  );
};

export default withQueries(DashboardUsers);
