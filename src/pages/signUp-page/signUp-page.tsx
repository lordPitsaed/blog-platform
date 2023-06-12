import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import classes from './signUp-page.module.scss';
import { clearErrors, signUpUser } from './signUpSlice';

interface FormInputs {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  agreement: boolean;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { error, status } = useSelector((state: RootState) => state.signUpSlice);

  const onSubmit = (data: FormInputs) => {
    const { username, password } = data;
    let { email } = data;
    email = email.toLowerCase();
    dispatch(signUpUser({ user: { username, email, password } }));
  };
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setError,
  } = useForm<FormInputs>({ mode: 'onChange' });

  useEffect(() => {
    if (status === 'success') {
      navigate('/', { replace: true });
    }
  }, [status]);

  useEffect(() => {
    dispatch(clearErrors());
  }, [pathname]);

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
    <div className={classes.formWrapper}>
      <div className={classes.header}>Create new account</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.username}>
          <span>Username</span>
          <input
            className={errors.username && classes.borderError}
            type='text'
            placeholder='Username'
            {...register('username', {
              required: true,
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
            type='text'
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
              required: false,
              minLength: { value: 6, message: 'Password must be 6-40 characters long' },
              maxLength: { value: 40, message: 'Password must be 6-40 characters long' },
            })}
          />
          {errors.password && <span className={classes.error}>Password must be 6-40 characters long.</span>}
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
          {errors.confirm_password && <span className={classes.error}>{errors.confirm_password.message}</span>}
        </label>
        <label className={classes.agreement}>
          <input type='checkbox' {...register('agreement', { required: true })} />
          <span>I agree to the processing of my personal information</span>
        </label>
        {errors.agreement && <span className={classes.error}>You must agree our data policy.</span>}{' '}
        <input
          disabled={status === 'pending' || !isValid}
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
