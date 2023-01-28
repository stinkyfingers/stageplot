import React from 'react';
import Login from './Login';
import Logout from './Logout';
import { UserContext } from '../lib/Context';
import Menu from './Menu';

import '../css/header.css';

const Header = () => {
  const [user] = React.useContext(UserContext);
  const loginButton = () => user ? <Logout /> : <Login />
  return <div className='header'>
    <div className='title'>
      <h1>StagePlot</h1>
    </div>
    { loginButton() }
    { user && <div className='welcome'>Welcome, {user.name}</div> }
    <Menu />
  </div>
};

export default Header;