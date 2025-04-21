import { Link } from 'react-router-dom';
import { HabitsIcon, HomeIcon, TasksIcon } from '../components/Icons';
import { UserDropdown } from '../components/UserDropdown';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="flex h-full">
        {/* Sidebar Moderna */}
        <aside className="w-64 bg-primary-800 text-white min-h-screen p-4 border-r border-primary-700/50 flex-shrink-0">
          <div className="mb-8 p-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              FlowState
            </h1>
          </div>
          <nav>
            <ul className="space-y-1">
              <NavItem icon={<HomeIcon />} href="/dashboard">Dashboard</NavItem>
              <NavItem icon={<TasksIcon />} href="/tasks">Tarefas</NavItem>
              <NavItem icon={<HabitsIcon />} href="/habits">Hábitos</NavItem>
            </ul>
          </nav>
        </aside>

        {/* Área Principal - Agora totalmente responsiva */}
        <main className="flex-1 overflow-auto min-w-0">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Header do Dashboard */}
            <header className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-4 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
                  Dashboard
                </h2>
                <UserDropdown />
              </div>
            </header>

            {/* Conteúdo */}
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Componente NavItem atualizado
function NavItem({ icon, href, children }: { icon: React.ReactNode, href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link 
        to={href} 
        className={`
          flex items-center p-3 rounded-lg 
          hover:bg-primary-700/50 
          transition-all duration-200
          group
        `}
      >
        <span className="text-primary-200 group-hover:text-white mr-3">
          {icon}
        </span>
        <span className="text-primary-100 group-hover:text-white">
          {children}
        </span>
      </Link>
    </li>
  );
}