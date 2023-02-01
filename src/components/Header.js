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
    <h1>StagePlot</h1>
    <div className='login'>
      { loginButton() }
      { user && <div className='user'>{user.name}</div> }
    </div>
    <div className='nav'>
      <Menu />
    </div>
  </div>
};

export default Header;