import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks'; // Added hook for consistency

const TaskManagement = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: null, description: '', dueDate: '', status: 'pending' });

  const handleChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateTask(currentTask.id, currentTask);
    } else {
      addTask({ ...currentTask, id: Date.now() });
    }
    setCurrentTask({ id: null, description: '', dueDate: '', status: 'pending' });
    setIsEditing(false);
  };

  const handleEdit = (t) => {
    setCurrentTask(t);
    setIsEditing(true);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Task Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input name="description" value={currentTask.description} onChange={handleChange} placeholder="Description" className="border p-2 mr-2" required />
        <input name="dueDate" type="date" value={currentTask.dueDate} onChange={handleChange} className="border p-2 mr-2" required />
        <select name="status" value={currentTask.status} onChange={handleChange} className="border p-2 mr-2">
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">{isEditing ? 'Update' : 'Add'}</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr><th>Description</th><th>Due Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td><td>{t.dueDate}</td><td>{t.status}</td>
              <td>
                <button onClick={() => handleEdit(t)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => deleteTask(t.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManagement;
