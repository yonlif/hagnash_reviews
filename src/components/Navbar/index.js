import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
    <Link to='/'>
      Home
    </Link>

    <Link to='/add_review'>
      Add a review
    </Link>

    <Link to='/reviews'>
      Reviews
    </Link>
    </div>
  );
};
  
export default Navbar;