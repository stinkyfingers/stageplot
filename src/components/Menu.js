import React from 'react';
import { Link } from 'react-router-dom';
import '../css/menu.css';
import { UserContext } from '../lib/Context';

const Menu = () => {
  const [user] = React.useContext(UserContext);
  if (!user) {
    return (
      <div className='loginPrompt'>
        Please log in
      </div>
    );
  }
	return (
		<div className='menu'>
      <Link to={'/stageplots'}>Stage Plots</Link>
      <Link to={'/users'}>Users</Link>
    </div>
	);
};

export default Menu;
