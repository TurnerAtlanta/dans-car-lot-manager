

interface TimeEntry {
  id: number;
  date: string;
}

interface Task {
  id: number;
  completed: boolean;
}

interface FollowUp {
  id: number;
  completed: boolean;
  date: string;
}

interface DailySummaryWidgetProps {
  timeEntries: TimeEntry[];
  tasks: Task[];
  followUps: FollowUp[];
}

export function DailySummaryWidget({ timeEntries, tasks, followUps }: DailySummaryWidgetProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const todayEntries = timeEntries.filter(e => e.date === today);
  const completedTasks = tasks.filter(t => t.completed).length;
  const dueFollowUps = followUps.filter(f =>
    !f.completed && new Date(f.date) <= new Date()
  ).length;

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-indigo-100">
      <h3 className="font-bold text-gray-800 mb-3">Today's Summary</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{todayEntries.length}</div>
          <div className="text-xs text-gray-600">Time Entries</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
          <div className="text-xs text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{dueFollowUps}</div>
          <div className="text-xs text-gray-600">Due Today</div>
        </div>
      </div>
    </div>
  );
}
