import { useState } from "react";
import { GenericCrudCard } from "../../shared/components/GenericCrudCard";
import { TaskForm } from "./TaskForm";

export type Task = {
  id: number;
  title: string;
  dueDate: Date;
  category: string;
  completed?: boolean;
};

type RecentTasksCardProps = {
  tasks: Task[];
  onTaskAdd: (task: Task) => Promise<void>;
  onTaskUpdate: (id: number, task: Task) => Promise<void>;
  onTaskDelete: (id: number) => Promise<void>;
};

export function RecentTasksCard({ 
  tasks, 
  onTaskAdd, 
  onTaskUpdate, 
  onTaskDelete 
}: RecentTasksCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleTaskAdd = async (task: Task) => {
    setIsLoading(true);
    try {
      await onTaskAdd(task);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskUpdate = async (id: number, task: Task) => {
    setIsLoading(true);
    try {
      await onTaskUpdate(id, task);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await onTaskDelete(id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GenericCrudCard<Task>
      title="Tarefas"
      data={tasks}
      primaryKey="id"
      onAdd={handleTaskAdd}
      onUpdate={handleTaskUpdate}
      onDelete={handleTaskDelete}
      emptyMessage="Nenhuma tarefa encontrada."
      columns={[
        {
          header: "Título",
          accessor: "title",
        },
        {
          header: "Data de Vencimento",
          accessor: "dueDate",
          render: (value: Date) => value.toLocaleDateString('pt-BR'),
        },
        {
          header: "Categoria",
          accessor: "category",
        },
        {
          header: "Status",
          accessor: "completed",
          render: (value: boolean) => (
            <span className={`px-2 py-1 rounded-full text-xs ${value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {value ? 'Concluída' : 'Pendente'}
            </span>
          ),
        },
      ]}
      renderForm={(task, onSubmit, onCancel) => (
        <TaskForm 
          task={task} 
          onSubmit={onSubmit} 
          onCancel={onCancel} 
        />
      )}
    />
  );
}