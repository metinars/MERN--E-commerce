import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin }) => {
  const token = localStorage.getItem('token');

  if (isAdmin) {
    return <Outlet />;
  }

  if (!isAdmin && token) {
    return <Outlet />;
  }

  return <Navigate to="/auth" />;
};

export default ProtectedRoute;
