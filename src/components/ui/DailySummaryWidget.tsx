import React from 'react';
import { useTimeLogs, useTasks, useFollowUps } from '../../hooks';

const DailySummaryWidget: React.FC = () => {
  const { timeLogs } = useTimeLogs();
  const { tasks } = useTasks();
  const { followUps } = useFollowUps();
  const today = new Date().toISOString().split('T')[0];

  const activitiesToday = timeLogs.filter(log => log.startTime.startsWith(today)).length;
  const tasksCompleted = tasks.filter(task => task.status === 'completed' && task.dueDate === today).length;
  const followUpsDue = followUps.filter(f => f.date === today && f.status === 'pending').length;

  return (
    <div className="p-4 bg-white shadow-md rounded-md grid grid-cols-3 gap-2">
      <div>
        <p className="font-bold">Activities</p>
        <p>{activitiesToday}</p>
      </div>
      <div>
        <p className="font-bold">Tasks Completed</p>
        <p>{tasksCompleted}</p>
      </div>
      <div>
        <p className="font-bold">Follow-ups Due</p>
        <p>{followUpsDue}</p>
      </div>
    </div>
  );
};

export default DailySummaryWidget;
