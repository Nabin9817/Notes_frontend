import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show nothing or a spinner while checking the token in localStorage
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black text-gray-300 uppercase tracking-widest">
        Verifying Session...
      </div>
    );
  }

  // If user exists in context, render the child route (Dashboard), else redirect
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;