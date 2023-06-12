import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { logOut, restoreUser } from '../loginPage/loginSlice';
import classes from './editProfilePage.module.scss';
import { clearError, editUser } from './editProfileSlice';

interface FormInputs {
  username: string;
  email: string;
  password: string;
  image: string;
}

const EditProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const loginStatus = useSelector((state: RootState) => state.loginSlice.status);
  const { user: userInfo } = useSelector((state: RootState) => state.loginSlice);
  const { error, status } = useSelector((state: RootState) => state.editProfileSlice);
  const {
    register,
    formState: { errors, dirtyFields, isDirty, isValid },
    setError,
    handleSubmit,
    reset,
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (loginStatus === 'success') {
      reset({
        username: userInfo.user.username,
        email: userInfo.user.email,
        password: '',
        image: userInfo.user.image,
      });
    }
  }, [loginStatus]);

  useEffect(() => {
    dispatch(clearError());
  }, [pathname]);

  const onSubmit = (data: FormInputs) => {
    const user = {
      user: {},
    } as EditData;
    for (const field in dirtyFields) {
      if (field) {
        user.user[field as keyof FormInputs] = data[field as keyof FormInputs];
      }
    }
    dispatch(editUser({ token: userInfo.user.token, editData: user }));
    if (dirtyFields.password) {
      dispatch(logOut());
    }
  };

  useEffect(() => {
    if (error.name === undefined && status === 'success' && isDirty) {
      dispatch(restoreUser(userInfo.user.token));
    }
  }, [error, status]);

  useEffect(() => {
    if (error && error.name === 'ServerValidationError') {
      const errorObj = JSON.parse(error.message as string);
      for (const field in errorObj) {
        const message = `${field[0].toUpperCase()}${field.slice(1)} ${errorObj[field]}`;
        setError(field as keyof FormInputs, {
          type: 'server',
          message: message,
        });
      }
    }
  }, [error]);

  return (
    <Spin spinning={loginStatus === 'pending'}>
      <div className={classes.formWrapper}>
        <div className={classes.header}>Edit Profile</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.username}>
            <span>Username</span>
            <input
              className={errors.username && classes.borderError}
              type='text'
              placeholder='Username'
              {...register('username', {
                required: false,
                minLength: { value: 3, message: 'Username must be 3-20 characters long' },
                maxLength: { value: 20, message: 'Username must be 3-20 characters long' },
              })}
            />
            {errors.username && <span className={classes.error}>{errors.username.message}</span>}
          </label>
          <label className={classes.email}>
            <span>Email address</span>
            <input
              className={errors.email && classes.borderError}
              type='email'
              placeholder='Email address'
              {...register('email', {
                required: false,
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'Username must be 3-20 characters long',
                },
              })}
            />
            {errors.email && <span className={classes.error}>Email must be valid email address.</span>}
          </label>
          <label className={classes.password}>
            <span>Password</span>
            <input
              className={errors.password && classes.borderError}
              type='password'
              placeholder='Password'
              {...register('password', {
                required: false,
                minLength: { value: 6, message: 'Password must be 6-40 characters long' },
                maxLength: { value: 40, message: 'Password must be 6-40 characters long' },
              })}
            />
            {errors.password && <span className={classes.error}>Password must be 6-40 characters long.</span>}
          </label>
          <label className={classes.image}>
            <span>Avatar image (url)</span>
            <input
              className={errors.image && classes.borderError}
              type='text'
              placeholder='Avatar image'
              {...register('image', {
                required: false,
                pattern: {
                  value:
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&\/=]*)$/,
                  message: 'Password must be 6-20 characters long',
                },
              })}
            />
            {errors.image && <span className={classes.error}>Image URL must be valid link.</span>}
          </label>
          <input disabled={!isDirty || !isValid} type='submit' value='Save' className={classes.submitButton} />
        </form>
      </div>
    </Spin>
  );
};

export default EditProfilePage;
