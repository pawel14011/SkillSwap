import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Lub lepszy loader
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
