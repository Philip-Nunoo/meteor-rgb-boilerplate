/* @flow */

import React, { PropTypes } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
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
  firstname: {
    type: String,
  },

  lastname: {
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

const editUserDetailsMutation = gql`
  mutation ($input: EditUserDetailsInput!) {
    editUserDetails(input: $input) {
      id
    }
  }
`;

const withMutations = graphql(editUserDetailsMutation);

type FormData = {
  email: string,
  password: string,
  firstname: string,
  lastname: string,
};

const styles = {
  container: {
    paddingTop: 50,
    backgroundColor: 'rgb(245, 245, 245)',
    height: '100%',
  },
};

class SignUp extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        nextPathname: PropTypes.string,
      }),
    }),
  };

  state: {
    emailAlreadyExists: boolean,
  };

  onSubmit: (data: FormData) => null;

  constructor(props) {
    super(props);

    this.state = {
      emailAlreadyExists: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password, ...details }: FormData) {
    Accounts.createUser({ email, password }, (err) => {
      if (!err) {
        this.props.mutate({
          variables: {
            input: details,
          },
        })
        .then(() => {
          const { state } = this.props.location;

          if (state && state.nextPathname) {
            browserHistory.push(state.nextPathname);
          } else {
            browserHistory.push('/dashboard');
          }
        });
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
              <div className="text-center">
                <img src="/img/logo.svg" alt="Cenabo" />
              </div>
              <h5 className="text-center text-muted">Good decision. Let&apos;s get started.</h5>

              <Panel style={{ marginTop: 10 }}>

                <AutoForm schema={schema} onSubmit={this.onSubmit}>
                  <QuickField name="firstname" />
                  <QuickField name="lastname" />
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
                    Sign Up
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

export default withMutations(SignUp);
