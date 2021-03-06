/* @flow */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Tracker } from 'meteor/tracker';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { DashboardStyle as styles } from './styles';
import { SideNavs } from './config';

type Props = {
  children?: React.Element<*>,
};

class Dashboard extends React.Component {
  computation: { stop: () => {} };

  constructor(props: Props) {
    super(props);

    this.computation = Tracker.autorun(() => {
      if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        browserHistory.push('/dashboard');
      }
    });
  }

  componentWillUnmount() {
    this.computation.stop();
  }

  render() {
    return (
      <div style={styles.container}>
        <Navbar fluid fixedTop className="navbar-admin">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                App Name
              </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavDropdown eventKey={1} title="Profile" id="basic-nav-dropdown">
              <LinkContainer
                onClick={() => {
                  Meteor.logout();
                  browserHistory.push('/sign-in');
                }}
                to="/sign-in"
              >
                <MenuItem eventKey={1.1}>Logout</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Grid fluid>
          <Row>
            <Col sm={3} md={2} className="sidebar">
              <Nav className="nav-sidebar">
                {SideNavs.map((item, index) => {
                  const renderItem = !item.heading ?
                    (<LinkContainer
                      key={index}
                      to={item.route}
                      onlyActiveOnIndex={item.onlyActiveOnIndex}
                    >
                      <MenuItem eventKey={`1.${index}`}>
                        <i className={item.icon} />
                        <span className="title">{item.name}</span>
                      </MenuItem>
                    </LinkContainer>)
                  :
                    (<li className="heading">
                      <h3 className="uppercase">{item.name}</h3>
                    </li>)
                  ;

                  return renderItem;
                }
                )}
              </Nav>
            </Col>
            <Col sm={9} smOffset={3} md={10} mdOffset={2} className="main" style={{ paddingTop: 72 }}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
