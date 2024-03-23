import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
