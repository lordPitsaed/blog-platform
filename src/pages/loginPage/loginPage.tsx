import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import classes from './LoginPage.module.scss';
import { loginUser } from './loginSlice';

interface FormInputs {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error, status } = useSelector((state: RootState) => state.loginSlice);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormInputs>({ mode: 'onChange' });

  const onSubmit = (data: FormInputs) => {
    const { email, password } = data;
    dispatch(loginUser({ user: { email, password } }));
  };

  useEffect(() => {
    if (status === 'success') {
      navigate(-1);
    }
  }, [status]);

  return (
    <div className={classes.formWrapper}>
      <div className={classes.header}>Sign In</div>
      {error.length > 0 && (
        <span className={classes.error}>{error[error.length - 1].message}</span>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.email}>
          <span>Email address</span>
          <input
            className={errors.email && classes.borderError}
            type='email'
            placeholder='Email address'
            {...register('email', {
              required: true,
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
              required: true,
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
        <input
          disabled={!isValid}
          type='submit'
          value='Login'
          className={classes.submitButton}
        />
        <div className={classes.signInLink}>
          Don’t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
