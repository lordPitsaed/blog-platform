import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { getCookie } from '../../helperFunctions';
import { logOut, restoreUser } from '../../pages/loginPage/loginSlice';
import Avatar from '../avatar/avatar';
import classes from './layout.module.scss';

const Layout: React.FC = () => {
  const { user, userLogged, status } = useSelector((state: RootState) => state.loginSlice);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged === true) {
      dispatch(restoreUser(getCookie('user').replace(/\w+!/g, '')));
    }
  }, [userLogged]);

  if (status === 'pending') {
    return <Spin />;
  }

  if (userLogged && status === 'success') {
    return (
      <>
        <header>
          <Link to='/'>Realworld Blog</Link>
          <Link to='/new-article' className={classes.createArticleLink}>
            Create article
          </Link>
          <Link to='/profile'>
            <span className={classes.username}>{user.user?.username || 'Loading...'}</span>
            <Avatar url={user.user.image} />
          </Link>
          <button
            className={classes.logOutButton}
            onClick={() => {
              console.log('logout button pressed');
              document.cookie = 'user=;max-age=-1; path=/';
              dispatch(logOut());
              navigate('/', { replace: true });
            }}
          >
            Log Out
          </button>
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
