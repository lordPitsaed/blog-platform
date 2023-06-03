import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { signUpUser } from './authSlice';
import classes from './signUp-page.module.scss';

interface FormInputs {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  agreement: boolean;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error, status } = useSelector((state: RootState) => state.authSlice);
  const onSubmit = (data: FormInputs) => {
    const { username, email, password } = data;
    dispatch(signUpUser({ user: { username, email, password } }));
  };

  useEffect(() => {
    if (status === 'success') {
      navigate('/', { replace: true });
    }
  }, [status]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormInputs>({ mode: 'onChange' });

  return (
    <div className={classes.formWrapper}>
      <div className={classes.header}>Create new account</div>
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
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.username && (
            <span className={classes.error}>
              Username must be 3-20 characters long.
            </span>
          )}
        </label>
        <label className={classes.email}>
          <span>Email address</span>
          <input
            className={errors.email && classes.borderError}
            type='text'
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
        <label className={classes.repeatPassword}>
          <span>Repeat password</span>
          <input
            className={errors.confirm_password && classes.borderError}
            type='password'
            placeholder='Repeat password'
            {...register('confirm_password', {
              required: true,
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Your passwords do no match';
                }
              },
            })}
          />
          {errors.confirm_password && (
            <span className={classes.error}>
              {errors.confirm_password.message}
            </span>
          )}
        </label>
        <label className={classes.agreement}>
          <input
            type='checkbox'
            {...register('agreement', { required: true })}
          />
          <span>I agree to the processing of my personal information</span>
        </label>
        {errors.agreement && (
          <span className={classes.error}>You must agree our data policy.</span>
        )}{' '}
        <input
          disabled={status === 'pending'}
          type='submit'
          value='Create'
          className={classes.submitButton}
        />
        <div className={classes.signInLink}>
          Already have an account? <Link to={'/sign-in'}>Sign In.</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
