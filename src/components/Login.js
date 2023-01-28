import React from 'react';
import { clientId } from '../lib/Config';
import { auth } from '../lib/Api';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { ErrorContext, UserContext } from "../lib/Context";

import '../css/login.css';

const Login = () => {
  const [, setUser] = React.useContext(UserContext);
  const [, setErr] = React.useContext(ErrorContext);
  const onSuccess = async(res) => {
    setErr(null);
    const token = jwt_decode(res.credential);
    try {
      const user = await auth({ token: res.credential, id: token.sub, name: token.name, email: token.email });
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (err) {
      setErr(err);
      return;
    }
  };

  const onFailure = (res) => {
    setErr('failed to log in');
  };

  return (
    <div className='Login'>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
        />
      </GoogleOAuthProvider>
    </div>
  )
};

export default Login;