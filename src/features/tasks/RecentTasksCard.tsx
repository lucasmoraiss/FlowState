import { Card } from "../../shared/components/Card";

type Task = {
  id: number;
  title: string;
  dueDate: Date;
  category: string;
};

type RecentTasksCardProps = {
  tasks: Task[];
};

export function RecentTasksCard({ tasks }: RecentTasksCardProps) {
  return (
    <Card>
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Tarefas Recentes</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{task.title}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Até: {task.dueDate.toLocaleDateString('pt-BR')} | Categoria: {task.category}
                </span>
              </div>
              <input type="checkbox" className="h-5 w-5 text-primary-600 rounded" />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}