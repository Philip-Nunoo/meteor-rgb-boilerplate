/* @flow */

import { Meteor } from 'meteor/meteor';
import React from 'react';
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

class SignIn extends React.Component {
  state: {
    errorMessage: ?string,
  };

  onSubmit: (data: { email: string, password: string }) => null;

  constructor(props: Props) {
    super(props);

    this.state = { errorMessage: null };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password }: { email: string, password: string }) {
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          errorMessage: err && err.reason,
        });
      } else {
        const { state } = this.props.location;

        if (state && state.nextPathname) {
          browserHistory.push(state.nextPathname);
        } else {
          browserHistory.push('/dashboard');
        }
      }
    });
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <div style={styles.container} >
        <Grid>
          <Row>
            <Col md={5} className="center-block" style={{ float: 'none' }}>

              <Panel style={{ marginTop: 10 }}>
                <AutoForm schema={schema} onSubmit={this.onSubmit}>

                  <QuickField name="email" />
                  <QuickField name="password" />

                  {errorMessage &&
                    <div className="text-danger">{errorMessage}</div>
                  }

                  <div className="pull-left">
                    <Link to="">Forgot Password?</Link>
                  </div>

                  <Button
                    type="submit"
                    bsStyle="success"
                    className="pull-right"
                  >
                    Log In
                  </Button>

                  <Clearfix />
                </AutoForm>
              </Panel>

              <Panel style={{ marginTop: 10, textAlign: 'center' }}>
                <b>Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>.</b>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SignIn;
