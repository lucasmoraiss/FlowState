import AuthLayout from '../shared/layout/AuthLayout';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Bem-vindo ao FlowState
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Sua produtividade em fluxo contínuo
        </p>

        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 text-center"
          >
            Entrar na minha conta
          </Link>

          <p className="text-gray-500 dark:text-white d text-sm">
            Ainda não tem uma conta?
          </p>

          <Link
            to="/register"
            className="block w-full border border-indigo-600 text-indigo-600 dark:text-indigo-400 py-3 px-4 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition duration-200 text-center"
          >
            Criar nova conta
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}