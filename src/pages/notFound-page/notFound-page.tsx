import React from 'react';
import classes from './notFound-page.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className={classes.notFound}>
      <div className={classes.notFoundCode}>404</div>
      <div className={classes.notFoundText}>Page not found.</div>
    </div>
  );
};

export default NotFoundPage;
