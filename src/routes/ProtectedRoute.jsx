import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../context/useAuth';

function ProtectedRoute({ children, role }) {
  const { token, user } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
