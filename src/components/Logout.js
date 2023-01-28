import React from 'react';
import { UserContext } from '../lib/Context';

const Logout = () => {
  const [, setUser] = React.useContext(UserContext);
  const handleClick = () => {
    setUser(null);
    localStorage.removeItem('user');
  }
  return <div className='logout'>
    <button onClick={handleClick}>Sign Out</button>
  </div>
};

export default Logout;