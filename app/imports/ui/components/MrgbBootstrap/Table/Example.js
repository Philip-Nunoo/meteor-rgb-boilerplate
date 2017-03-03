/* @flow */

import React from 'react';
import Table from './components';
import { Panel, PanelTitle } from '../Panel';

const Users = [
  {
    _id: '58b8ac93797af68135f45053',
    index: 0,
    age: 30,
    firstName: 'Bass',
    lastName: 'Sherman',
    gender: 'male',
    email: 'basssherman@enormo.com',
    phone: '+1 (932) 559-3327',
    registered: '2015-08-19T12:50:44 -00:00',
    class: 'active',
  },
  {
    _id: '58b8ac93b8241980e0181b4c',
    index: 1,
    age: 23,
    firstName: 'Powell',
    lastName: 'Chang',
    gender: 'male',
    email: 'powellchang@enormo.com',
    phone: '+1 (927) 475-3217',
    registered: '2016-02-09T04:34:55 -00:00',
  },
  {
    _id: '58b8ac93d52ea67663ab42cb',
    index: 2,
    age: 27,
    firstName: 'Paige',
    lastName: 'Garcia',
    gender: 'female',
    email: 'paigegarcia@enormo.com',
    phone: '+1 (824) 572-3332',
    registered: '2015-09-26T09:16:53 -00:00',
    class: 'success',
  },
  {
    _id: '58b8ac93d14b55ed0b52b303',
    index: 3,
    age: 39,
    firstName: 'Tameka',
    lastName: 'Dorsey',
    gender: 'female',
    email: 'tamekadorsey@enormo.com',
    phone: '+1 (817) 410-2314',
    registered: '2016-03-01T05:57:01 -00:00',
  },
  {
    _id: '58b8ac9366d7545934400c65',
    index: 4,
    age: 31,
    firstName: 'Earline',
    lastName: 'Levy',
    gender: 'female',
    email: 'earlinelevy@enormo.com',
    phone: '+1 (936) 450-2061',
    registered: '2017-01-30T12:01:25 -00:00',
    class: 'info',
  },
  {
    _id: '58b8ac93990bfae9cd97bc45',
    index: 5,
    age: 26,
    firstName: 'Rena',
    lastName: 'Yang',
    gender: 'female',
    email: 'renayang@enormo.com',
    phone: '+1 (830) 512-2044',
    registered: '2015-04-23T12:16:34 -00:00',
  },
  {
    _id: '58b8ac93f4d0f45abd52c814',
    index: 6,
    age: 38,
    firstName: 'Barnett',
    lastName: 'Callahan',
    gender: 'male',
    email: 'barnettcallahan@enormo.com',
    phone: '+1 (959) 586-3358',
    registered: '2016-02-04T02:44:08 -00:00',
    class: 'warning',
  },
];

export default () =>
  <div>
    <h4>Table</h4>
    <div className="row">
      <div className="col-md-6">
        <Panel>
          <PanelTitle>Basic Example</PanelTitle>
          <Table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user =>
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </div>
      <div className="col-md-6">
        <Panel>
          <PanelTitle>Striped</PanelTitle>
          <Table striped>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user =>
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <Panel>
          <PanelTitle>Bordered table</PanelTitle>
          <Table bordered>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user =>
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </div>
      <div className="col-md-6">
        <Panel>
          <PanelTitle>Hover table</PanelTitle>
          <Table hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user =>
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <Panel>
          <PanelTitle>Condensed table</PanelTitle>
          <Table condensed>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user =>
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </div>
      <div className="col-md-6">
        <Panel>
          <PanelTitle>Contextual table</PanelTitle>
          <Table hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user =>
                <tr key={user._id} className={user.class && user.class}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <Panel>
          <PanelTitle>Responsive table</PanelTitle>
          <Table responsive>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user =>
                <tr key={user._id} className={user.class && user.class}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </div>
    </div>
  </div>;
