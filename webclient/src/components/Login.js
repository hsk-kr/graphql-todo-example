import React, { useState, useEffect } from 'react';
import './Login.css';
import GoogleAuth from './auth/GoogleAuth';
import { GOOGLE_CLIENT_ID } from '../shared/constants';

function Login() {
  const [gCli, setGcli] = useState(null);

  const handleChangeGoogleStatus = result => {
    console.log(result);
  };

  const handleLoadGoogleApi = gCli => {
    setGcli(gCli);
  };

  const handleSignIn = () => {
    if (gCli) {
      gCli.signIn();
    }
  };

  const handleSignOut = () => {
    if (gCli) {
      gCli.signOut();
    }
  };

  return (
    <div className="container">
      <GoogleAuth
        onLoad={handleLoadGoogleApi}
        onChangeStatus={handleChangeGoogleStatus}
        clientId={GOOGLE_CLIENT_ID}
      />
      <form className="google-login-form">
        <h3>Google Login Test Interface</h3>
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        <button type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </form>
    </div>
  );
}

export default Login;
