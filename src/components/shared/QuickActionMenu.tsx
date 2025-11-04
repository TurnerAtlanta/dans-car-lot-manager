
import { Clock, CheckSquare, Calendar, Users } from 'lucide-react';

interface QuickActionMenuProps {
  onTimeLog: () => void;
  onAddTask: () => void;
  onAddFollowUp: () => void;
  onAddCustomer: () => void;
}

export function QuickActionMenu({ 
  onTimeLog, 
  onAddTask, 
  onAddFollowUp, 
  onAddCustomer 
}: QuickActionMenuProps) {
  return (
    <div className="card bg-gradient-to-br from-purple-50 to-pink-100">
      <h3 className="font-bold text-gray-800 mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onTimeLog} className="btn-primary py-2 text-sm">
          <Clock size={14} />
          Log Time
        </button>
        <button onClick={onAddTask} className="btn-secondary py-2 text-sm">
          <CheckSquare size={14} />
          Add Task
        </button>
        <button onClick={onAddFollowUp} className="btn-secondary py-2 text-sm">
          <Calendar size={14} />
          Follow-up
        </button>
        <button onClick={onAddCustomer} className="btn-primary py-2 text-sm">
          <Users size={14} />
          Add Lead
        </button>
      </div>
    </div>
  );
}
