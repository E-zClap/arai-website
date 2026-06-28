import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../api/admin';

// Gate admin routes behind a valid token; otherwise redirect to login.
export const RequireAuth = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};
