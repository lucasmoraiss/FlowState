import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/useAuth';
import { JSX } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLogged, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return isLogged ? children : <Navigate to="/login" replace />;
}