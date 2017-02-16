/* @flow */

import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AutoForm, QuickField } from 'meteor/mfactory:autoform-react';
import {
  Grid,
  Row,
  Col,
  Button,
  Clearfix,
  Panel,
} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

const schema = new SimpleSchema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  username: {
    type: String,
  },

  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },

  password: {
    type: String,
    autoform: {
      type: 'password',
    },
  },
});

type FormData = {
  email: string,
  password: string,
  username: string,
  firstName: string,
  lastName: string,
};

type Props = {
  location: {
    state: {
      nextPathname: string,
    },
  },
};

const styles = {
  container: {
    paddingTop: 50,
    minHeight: '100%',
  },
};

class SignUp extends React.Component {
  state: {
    emailAlreadyExists: boolean,
  };

  onSubmit: (data: FormData) => null;

  constructor(props: Props) {
    super(props);

    this.state = {
      emailAlreadyExists: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password, username, ...details }: FormData) {
    const profile = { firstName: details.firstName, lastName: details.lastName };
    Accounts.createUser({ email, username, password, profile }, (err) => {
      if (!err) {
        const { state } = this.props.location;

        if (state && state.nextPathname) {
          browserHistory.push(state.nextPathname);
        } else {
          browserHistory.push('/dashboard');
        }
      } else if (err.reason === 'Email already exists.') {
        this.setState({ emailAlreadyExists: true });
      }
    });
  }

  render() {
    const { emailAlreadyExists } = this.state;

    return (
      <div style={styles.container} >
        <Grid>
          <Row>
            <Col md={5} className="center-block" style={{ float: 'none' }}>
              <Panel style={{ marginTop: 10 }}>

                <AutoForm schema={schema} onSubmit={this.onSubmit}>
                  <QuickField name="firstName" />
                  <QuickField name="lastName" />
                  <QuickField name="username" />
                  <QuickField
                    name="email"
                    errorMessage={emailAlreadyExists ? 'Email already exists.' : undefined}
                  />
                  <QuickField name="password" />

                  <div style={{ fontSize: 12 }}>
                    By creating an account, you agree to our
                    <Link to="">Terms of Use</Link> and&nbsp;
                    <Link to="">Privacy Policy</Link>.
                  </div>
                  <Button
                    type="submit"
                    bsStyle="success"
                    className="pull-right"
                  >
                    Sign Up Now
                  </Button>

                  <Clearfix />
                </AutoForm>
              </Panel>
              <Panel style={{ marginTop: 10, textAlign: 'center' }}>
                <b>Already have an account? <Link to="/sign-in">Log in.</Link></b>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SignUp;
