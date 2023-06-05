import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { getCookie } from '../../helperFunctions';
import { logOut, restoreUser } from '../../pages/loginPage/loginSlice';
import avatarPH from './avatarPH.png';
import classes from './layout.module.scss';

const Layout: React.FC = () => {
  const { user, userLogged, status } = useSelector(
    (state: RootState) => state.loginSlice,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged === true) {
      dispatch(restoreUser(getCookie('user').replace(/\w+!/g, '')));
    }
  }, [userLogged]);

  if (userLogged) {
    return (
      <Spin spinning={status === 'pending'}>
        <>
          <header>
            <Link to='/'>Realworld Blog</Link>
            <Link to='/profile'>
              <span className={classes.username}>
                {user.user?.username || 'Loading...'}
              </span>
              <img
                className={classes.avatar}
                src={user.user?.image || avatarPH}
              />
            </Link>
            <button
              className={classes.logOutButton}
              onClick={() => {
                dispatch(logOut());
                navigate('/', { replace: true });
              }}
            >
              Log Out
            </button>
          </header>
          <Outlet />
        </>
      </Spin>
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
