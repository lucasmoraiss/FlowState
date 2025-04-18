import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import api from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/account/login', { email, password });

      const { token: authToken } = response.data;

      const decoded = jwtDecode<User>(authToken);
      setUser(decoded);
      setToken(authToken);
      localStorage.setItem('token', authToken);

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return {
    user,
    token,
    isLoading,
    isLogged: !!token,
    login,
    logout
  };
}