import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import classes from './editProfilePage.module.scss';

interface FormInputs {
  username: string;
  email: string;
  password: string;
  image: string;
}

const EditProfilePage: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { error, user, status } = useSelector(
    (state: RootState) => state.loginSlice,
  );
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (status === 'success') {
      reset({
        username: user.user.username,
        email: user.user.email,
        password: '',
        image: user.user.image,
      });
    }
  }, [status]);

  const onSubmit = (data: FormInputs) => {
    console.log(errors);
    console.log(data);
    console.log(isDirty);
  };

  return (
    <div className={classes.formWrapper}>
      <div className={classes.header}>Edit Profile</div>
      {error.length > 0 && (
        <span className={classes.error}>{error[0].message}</span>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.username}>
          <span>Username</span>
          <input
            className={errors.username && classes.borderError}
            type='text'
            placeholder='Username'
            {...register('username', {
              required: false,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.username && (
            <span className={classes.error}>
              Password must be 3-20 characters long.
            </span>
          )}
        </label>
        <label className={classes.email}>
          <span>Email address</span>
          <input
            className={errors.email && classes.borderError}
            type='email'
            placeholder='Email address'
            {...register('email', {
              required: false,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          {errors.email && (
            <span className={classes.error}>
              Email must be valid email address.
            </span>
          )}
        </label>
        <label className={classes.password}>
          <span>Password</span>
          <input
            className={errors.password && classes.borderError}
            type='password'
            placeholder='Password'
            {...register('password', {
              required: false,
              minLength: 6,
              maxLength: 40,
            })}
          />
          {errors.password && (
            <span className={classes.error}>
              Password must be 6-40 characters long.
            </span>
          )}
        </label>
        <label className={classes.image}>
          <span>Avatar image (url)</span>
          <input
            className={errors.image && classes.borderError}
            type='text'
            placeholder='Avatar image'
            {...register('image', {
              required: false,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.image && (
            <span className={classes.error}>
              Password must be 3-20 characters long.
            </span>
          )}
        </label>
        <input
          disabled={!isDirty || !isValid}
          type='submit'
          value='Save'
          className={classes.submitButton}
        />
      </form>
    </div>
  );
};

export default EditProfilePage;
