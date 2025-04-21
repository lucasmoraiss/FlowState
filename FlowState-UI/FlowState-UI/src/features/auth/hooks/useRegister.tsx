import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authServices';

export const useRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validação da senha
  const isPasswordValid = () => {
    const { password } = formData;
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const isFormValid = !!formData.name && !!formData.email && isPasswordValid();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid()) {
      setError('A senha não atende aos requisitos');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      debugger;
      const data = await register(formData);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro no cadastro. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    isFormValid,
    handleChange,
    handleSubmit
  };
};