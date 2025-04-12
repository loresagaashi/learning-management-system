import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const user = localStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user).user : null;

  // Check if the user is either an Admin or a Professor
  if (parsedUser && (parsedUser.type === 'Admin' || parsedUser.type === 'Professor' || parsedUser.type === 'Student')) {
    return <Component {...rest} />;
  }

  // Redirect to sign-in page if the user is not Admin or Professor, Student
  return <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
