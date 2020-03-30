import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/auth/useAuthContext';

const Header = () => {
  const state = useAuthContext();
  return state
    ? (
      <div>
        <Link to="/bucket">My Bucket</Link>
      </div>
    )
    : (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    );
};

export default Header;
