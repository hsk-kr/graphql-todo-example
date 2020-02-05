import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Form, Button, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import './styles.scss';
import GoogleAuth from '../GoogleAuth';
import Loading from '../Loading';
import { GOOGLE_CLIENT_ID } from '../../shared/constants';
import { SIGNIN_WITH_GOOGLE } from './queries';

function Login({ onLogin }) {
  const [gCli, setGcli] = useState(null);
  const [signIn, { data }] = useMutation(SIGNIN_WITH_GOOGLE);
  const [loading, setLoading] = useState(true);

  if (data && data.signInWithGoogle) {
    const { token } = data.signInWithGoogle;
    onLogin(token);
  }

  const handleLoadGoogleApi = useCallback(gCli => {
    setGcli(gCli);
  }, []);

  const handleSignIn = () => {
    if (gCli) {
      gCli.signIn();
    }
  };

  const handleChangeGoogleStatus = useCallback(
    ({ gCli, data }) => {
      // find an object that has access_token
      const info = Object.values(data).filter(
        fields => fields && fields.hasOwnProperty('access_token')
      );
      const user = info.length > 0 ? info[0] : null;

      if (gCli && user) {
        setLoading(true);
        const { access_token } = user;
        // request signIn to server
        signIn({ variables: { accessToken: access_token } });
        // google logout
        gCli.signOut();
      }
    },
    [signIn]
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Container className="login-container text-center">
      <div className="login-container-background" />
      <GoogleAuth
        onLoad={handleLoadGoogleApi}
        onChangeStatus={handleChangeGoogleStatus}
        clientId={GOOGLE_CLIENT_ID}
      />
      <Row>
        <Col>
          <Form className="login-form shadow rounded">
            {loading ? (
              <Loading />
            ) : (
              <>
                <FormGroup>
                  <img
                    src="./images/schedule.png"
                    alt="logo"
                    className="rounded logo"
                  />
                  <h1 className="inline">ToDo Login</h1>
                </FormGroup>
                <FormGroup>
                  <Button
                    color="danger"
                    className="pl-5 pr-5"
                    onClick={handleSignIn}
                  >
                    <i className="fa fa-google mr-3" /> Sign in with Google
                  </Button>
                </FormGroup>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
