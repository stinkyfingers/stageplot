import React from 'react';
import { Link } from 'react-router-dom';
import '../css/menu.css';

const Menu = () => {
	return (
		<div className='menu'>
      <Link to={'/stageplots'}>Stage Plots</Link>
      <Link to={'/users'}>Users</Link>
    </div>
	);
};

export default Menu;
