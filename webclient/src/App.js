import React from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';

function App() {
  const responseGoogle = res => {
    console.log(res);
  };

  return (
    <div className="App">
      <div className="container">
        <form className="google-login-form">
          <h3>Google Login Test Interface</h3>
          <GoogleLogin
            clientId="1017757091171-blsf6pbjlqln2tib1i5vctho21bgkuao.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
