type Activity = {
    id: number;
    action: string;
    time: string;
  };
  
  type RecentActivityCardProps = {
    activities: Activity[];
  };
  
  export function RecentActivityCard({ activities }: RecentActivityCardProps) {
    return (
      <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Atividades Recentes</h3>
        {activities.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Nenhuma atividade registrada.</p>
        ) : (
          <ul className="space-y-3">
            {activities.map(activity => (
              <li key={activity.id} className="flex justify-between items-start">
                <p className="text-gray-700 dark:text-gray-200 text-sm">{activity.action}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  