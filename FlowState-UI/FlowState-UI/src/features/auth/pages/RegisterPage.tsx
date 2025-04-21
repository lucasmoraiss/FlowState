import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import AuthLayout from '../../../shared/layout/AuthLayout';
import { PasswordStrength } from '../../../shared/utils/PasswordValidation/PasswordStrength';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';

export const RegisterPage = () => {
  const {
    formData,
    isLoading,
    error,
    isFormValid,
    handleChange,
    handleSubmit
  } = useRegister();

  return (
    <AuthLayout>
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Crie sua conta
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-center mb-6">
          Comece a gerenciar sua produtividade
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Nome completo"
            placeholder="Seu nome"
            required
          />

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

          <PasswordStrength password={formData.password} />

          <Button
            type="submit"
            disabled={!isFormValid}
            isLoading={isLoading}
            className="w-full"
          >
            Criar conta
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-white">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
            Faça login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
