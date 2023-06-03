import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { RootState } from '../../app/store';
import classes from './layout.module.scss';

const Layout: React.FC = () => {
  const { user, userLogged } = useSelector(
    (state: RootState) => state.authSlice,
  );

  if (userLogged) {
    return (
      <>
        <header>
          <Link to='/'>Realworld Blog</Link>
          <span>{user.user.username}</span>
        </header>
        <Outlet />
      </>
    );
  }

  return (
    <>
      <header>
        <Link to='/'>Realworld Blog</Link>
        <Link to='/sign-in'>Sign In</Link>
        <Link to='/sign-up' className={classes.signUpButton}>
          Sign Up
        </Link>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
