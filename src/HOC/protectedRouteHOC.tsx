import React from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../app/store';

const ProtectedRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { userLogged } = useSelector((state: RootState) => state.loginSlice);

  if (!userLogged) {
    return <Navigate to='/sign-in' replace></Navigate>;
  } else {
    return children;
  }
};

export default ProtectedRoute;
