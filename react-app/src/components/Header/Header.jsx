import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext, useAuthDispatch } from '../../contexts/auth/useAuthContext';
import './header.sass';
import { userLogsOut } from '../../contexts/auth/actions';

const Header = () => {
  const state = useAuthContext();
  const dispatch = useAuthDispatch();
  const [isActive, onMenuToggle] = useState();
  const toggleMenu = () => {
    onMenuToggle(!isActive);
  };
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <span>
              Hello, &nbsp;
              { state ? state.username : 'Please Login' }
              !
            </span>
          </div>
          <span
            role="button"
            className={`navbar-burger burger${isActive ? ' is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            tabIndex="0"
            onClick={toggleMenu}
            onKeyPress={() => {}}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </span>
        </div>

        <div className={`navbar-menu${isActive ? ' is-active' : ''}`}>
          <div className="navbar-end">
            {
              state
                ? (
                  <>
                    <NavLink className="navbar-item" to="/bucket">My Bucket</NavLink>
                    <a
                      className="navbar-item"
                      tabIndex="0"
                      onKeyPress={() => {}}
                      role="button"
                      href="/"
                    >
                      Logout
                    </a>
                  </>
                )
                : (
                  <>
                    <NavLink className="navbar-item" to="/login">Login</NavLink>
                    <NavLink className="navbar-item" to="/register">Register</NavLink>
                  </>
                )
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
