import React, { useState } from 'react';
import { useTasks } from '../../hooks';
import { Task } from '../../types';

const TasksTab: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, loading, error } = useTasks();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in progress' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate');

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') return a.dueDate.localeCompare(b.dueDate);
    return a.priority.localeCompare(b.priority);
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <div className="mb-4">
        <select value={filter} onChange={e => setFilter(e.target.value as any)} className="border p-2 mr-2">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="border p-2">
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <table className="w-full border">
        <thead>
          <tr><th>Description</th><th>Due Date</th><th>Priority</th><th>Status</th><th>Assigned</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {sortedTasks.map((t: Task) => (
            <tr key={t.id} className={t.priority === 'high' ? 'text-red-500' : t.priority === 'medium' ? 'text-yellow-500' : ''}>
              <td>{t.description}</td>
              <td>{t.dueDate}</td>
              <td>{t.priority}</td>
              <td>{t.status}</td>
              <td>{t.assignedTo}</td>
              <td>
                <button onClick={() => updateTask(t.id, { ...t, status: 'completed' })} className="text-blue-500 mr-2">Complete</button>
                <button onClick={() => deleteTask(t.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTab;
