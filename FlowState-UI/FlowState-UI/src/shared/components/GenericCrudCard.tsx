import { useState } from "react";

type CrudAction = 'create' | 'read' | 'update' | 'delete';

type GenericCrudCardProps<T> = {
  title: string;
  data: T[];
  columns: {
    header: string;
    accessor: keyof T;
    render?: (value: any, item: T) => React.ReactNode;
  }[];
  renderForm: (item: T | null, onSubmit: (data: T) => void, onCancel: () => void) => React.ReactNode;
  onAdd: (data: T) => Promise<void>;
  onUpdate: (id: any, data: T) => Promise<void>;
  onDelete: (id: any) => Promise<void>;
  emptyMessage?: string;
  primaryKey: keyof T;
};

export function GenericCrudCard<T>({
  title,
  data,
  columns,
  renderForm,
  onAdd,
  onUpdate,
  onDelete,
  emptyMessage = "Nenhum item encontrado.",
  primaryKey
}: GenericCrudCardProps<T>) {
  const [currentAction, setCurrentAction] = useState<CrudAction | null>(null);
  const [currentItem, setCurrentItem] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    setCurrentItem(null);
    setCurrentAction('create');
  };

  const handleEdit = (item: T) => {
    setCurrentItem(item);
    setCurrentAction('update');
  };

  const handleDelete = async (id: any) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      setIsLoading(true);
      try {
        await onDelete(id);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (formData: T) => {
    setIsLoading(true);
    try {
      if (currentAction === 'create') {
        await onAdd(formData);
      } else if (currentAction === 'update' && currentItem) {
        await onUpdate(currentItem[primaryKey], formData);
      }
      setCurrentAction(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentAction(null);
    setCurrentItem(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Adicionar
        </button>
      </div>

      {currentAction === 'create' || currentAction === 'update' ? (
        renderForm(currentItem, handleSubmit, handleCancel)
      ) : data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((item) => (
                <tr key={String(item[primaryKey])} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {columns.map((column) => (
                    <td key={String(column.accessor)} className="px-6 py-4 whitespace-nowrap">
                      {column.render 
                        ? column.render(item[column.accessor], item)
                        : String(item[column.accessor])}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item[primaryKey])}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}