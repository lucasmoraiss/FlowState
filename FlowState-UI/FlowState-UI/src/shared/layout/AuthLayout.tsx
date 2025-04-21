import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="p-6">
        <Link 
          to="/welcome" 
          className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent"
        >
          FlowState
        </Link>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full mx-4"> {/* Aumentei para max-w-2xl e adicionei mx-4 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              {children}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} FlowState - Sua produtividade em fluxo
      </footer>
    </div>
  );
}