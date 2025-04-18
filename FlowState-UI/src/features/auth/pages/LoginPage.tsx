import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../../shared/layout/AuthLayout';
import { useAuth } from '../../../app/Auth/useAuth';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await login(formData.email, formData.password);
      debugger;
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      }
    } catch {
      setError('Ocorreu um erro durante o login. Tente novamente.');
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Bem-vindo de volta!
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          Acesse sua conta para continuar
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          label="E-mail"
          placeholder="seu@email.com"
          required
        />

        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          label="Senha"
          placeholder="••••••••"
          required
          showPasswordToggle={true}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Lembrar-me
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Esqueceu a senha?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
        >
          Entrar
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-white">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}