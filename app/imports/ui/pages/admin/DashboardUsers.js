/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import selectn from 'selectn';
import moment from 'moment';
import { graphql } from 'react-apollo';
import {
  Label,
} from 'react-bootstrap';

import {
  Table,
  Panel,
  PanelTitle,
  PanelBody,
  PageHeader,
  PageTitle,
} from '/imports/ui/components/MrgbBootstrap';

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
      <PageHeader>
        <PageTitle>
          <h1>
            All Users
          </h1>
        </PageTitle>
      </PageHeader>
      <Panel light="light" fit>
        <PanelTitle>Users</PanelTitle>
        <PanelBody>
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
                  <td>{index + 1}</td>
                  <td>{user.emails[0].address}</td>
                  <td>
                    <Label bsStyle={user.emails[0].verified ? 'success' : 'warning'}>
                      {user.emails[0].verified ? 'verified' : 'false'}
                    </Label>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.profile && `${user.profile.firstName} ${user.profile.lastName}`}</td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
            )}
            </tbody>
          </Table>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default withQueries(DashboardUsers);
