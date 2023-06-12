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
    setError,
  } = useForm<FormInputs>({ mode: 'onChange' });

  const onSubmit = (data: FormInputs) => {
    const { email, password } = data;
    dispatch(loginUser({ user: { email, password } }));
  };

  useEffect(() => {
    if (status === 'success') {
      navigate('/');
    }
  }, [status]);

  useEffect(() => {
    if (error && error.name === 'ServerValidationError') {
      const errorObj = JSON.parse(error.message as string);
      for (const field in errorObj) {
        if (field === 'email or password') {
          setError('email', {
            type: 'server',
            message: 'Email or password is wrong',
          });
          setError('password', {
            type: 'server',
          });
        }
      }
    }
  }, [error]);

  return (
    <div className={classes.formWrapper}>
      <div className={classes.header}>Sign In</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.email}>
          <span>Email address</span>
          <input
            className={errors.email && classes.borderError}
            type='email'
            placeholder='Email address'
            {...register('email', {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Username must be 3-20 characters long',
              },
            })}
          />
          {errors.email && <span className={classes.error}>{errors.email.message}</span>}
        </label>
        <label className={classes.password}>
          <span>Password</span>
          <input
            className={errors.password && classes.borderError}
            type='password'
            placeholder='Password'
            {...register('password', {
              required: true,
              minLength: { value: 6, message: 'Password must be 6-40 characters long' },
              maxLength: { value: 40, message: 'Password must be 6-40 characters long' },
            })}
          />
          {errors.password && <span className={classes.error}>{errors.password.message}</span>}
        </label>
        <input disabled={!isValid} type='submit' value='Login' className={classes.submitButton} />
        <div className={classes.signInLink}>
          Don’t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
