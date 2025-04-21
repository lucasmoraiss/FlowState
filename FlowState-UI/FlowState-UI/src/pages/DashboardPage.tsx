import { useState } from "react";
import { RecentActivityCard } from "../features/activities/RecentActivityCard";
import { RecentTasksCard, Task } from "../features/tasks/RecentTasksCard";
import { LoadingSpinner } from "../shared/components/LoadingSpinner";
import { useAuth } from "../app/Auth/useAuth";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  
  // Estados para dados dinâmicos
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Finalizar protótipo do FlowState", dueDate: new Date(Date.now() + 86400000), category: "Trabalho", completed: false },
    { id: 2, title: "Revisar documentação", dueDate: new Date(Date.now() + 172800000), category: "Estudo", completed: false },
    { id: 3, title: "Reunião com equipe", dueDate: new Date(Date.now() + 259200000), category: "Reunião", completed: true }
  ]);

  // Estatísticas calculadas
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const overdueTasks = tasks.filter(t => !t.completed && t.dueDate < new Date()).length;
  const weeklyProgress = tasks.length > 0 
    ? Math.round((completedTasks / tasks.length) * 100) 
    : 0;

  const handleTaskAdd = async (newTask: Task) => {
    // Em uma aplicação real, você faria uma chamada API aqui
    setTasks(prev => [...prev, { ...newTask, id: Math.max(0, ...prev.map(t => t.id)) + 1 }]);
  };

  const handleTaskUpdate = async (id: number, updatedTask: Task) => {
    // Em uma aplicação real, você faria uma chamada API aqui
    setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
  };

  const handleTaskDelete = async (id: number) => {
    // Em uma aplicação real, você faria uma chamada API aqui
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      {/* Header do Dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long',
            year: 'numeric'
          })}
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de Boas-vindas */}
        <WelcomeCard 
          userName={user?.name || 'Usuário'} 
          pendingTasks={pendingTasks}
        />

        {/* Card de Progresso */}
        <ProgressCard 
          progress={weeklyProgress}
          completed={completedTasks}
          total={tasks.length}
        />

        {/* Card de Estatísticas */}
        <StatsCard 
          pending={pendingTasks}
          completed={completedTasks}
          overdue={overdueTasks}
        />

        {/* Tarefas com CRUD */}
        <RecentTasksCard 
          tasks={tasks} 
          onTaskAdd={handleTaskAdd}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />

        {/* Atividade Recente */}
        <RecentActivityCard activities={sampleActivities} />
      </div>
    </>
  );
}

// Componentes auxiliares para melhor organização
type WelcomeCardProps = {
  userName: string;
  pendingTasks: number;
};

function WelcomeCard({ userName, pendingTasks }: WelcomeCardProps) {
  return (
    <div className="lg:col-span-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-2">Olá, {userName.split(' ')[0]}!</h2>
      <p className="opacity-90 mb-4">
        Você tem {pendingTasks} {pendingTasks === 1 ? 'tarefa pendente' : 'tarefas pendentes'} hoje. Vamos começar?
      </p>
      <button 
        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm"
        aria-label="Ver tarefas pendentes"
      >
        Ver tarefas
      </button>
    </div>
  );
}

type ProgressCardProps = {
  progress: number;
  completed: number;
  total: number;
};

function ProgressCard({ progress, completed, total }: ProgressCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">Seu Progresso</h3>
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
          {progress}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
        <div 
          className="h-2 bg-primary-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Concluídas: {completed}/{total} tarefas
      </p>
    </div>
  );
}

type StatsCardProps = {
  pending: number;
  completed: number;
  overdue: number;
};

function StatsCard({ pending, completed, overdue }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Estatísticas</h3>
      <div className="space-y-3">
        <StatItem label="Tarefas hoje" value={pending} />
        <StatItem label="Concluídas" value={completed} />
        <StatItem label="Em atraso" value={overdue} highlight />
      </div>
    </div>
  );
}

function StatItem({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className={`font-medium ${highlight ? 'text-red-500 dark:text-red-400' : ''}`}>
        {value}
      </span>
    </div>
  );
}

// Dados de exemplo (substitua pelos seus dados reais)
const sampleTasks = [
  { id: 1, title: "Finalizar protótipo do FlowState", dueDate: new Date(Date.now() + 86400000), category: "Trabalho" },
  { id: 2, title: "Revisar documentação", dueDate: new Date(Date.now() + 172800000), category: "Estudo" },
  { id: 3, title: "Reunião com equipe", dueDate: new Date(Date.now() + 259200000), category: "Reunião" }
];

const sampleActivities = [
  { id: 1, action: "completou a tarefa 'Configurar ambiente'", time: "1 hora atrás" },
  { id: 2, action: "adicionou nova tarefa 'Testar componentes'", time: "3 horas atrás" },
  { id: 3, action: "atualizou o perfil", time: "5 horas atrás" }
];