import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading === false) {
      if (isAuthenticated === 'false') {
        navigate('/login');
      } else if (isAdmin === true && user.role !== 'admin') {
        navigate('/login');
      }
    }
  }, [isAdmin, isAuthenticated, loading, navigate, user.role]);

  return children;
};
