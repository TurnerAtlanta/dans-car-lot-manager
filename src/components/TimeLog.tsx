import React, { useState } from 'react';
import { useTimeLogs } from '../hooks/useTimeLogs'; // Added hook for consistency
import { useTasks } from '../hooks/useTasks';

const TimeLog = () => {
  const { timeLogs, addTimeLog, updateTimeLog, deleteTimeLog } = useTimeLogs();
  const { tasks } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTimeLog, setCurrentTimeLog] = useState({ id: null, taskId: '', startTime: '', endTime: '', duration: 0 });

  const handleChange = (e) => {
    setCurrentTimeLog({ ...currentTimeLog, [e.target.name]: e.target.value });
  };

  const calculateDuration = () => {
    const start = new Date(currentTimeLog.startTime);
    const end = new Date(currentTimeLog.endTime);
    const dur = (end - start) / 3600000; // hours
    setCurrentTimeLog({ ...currentTimeLog, duration: dur });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateDuration();
    if (isEditing) {
      updateTimeLog(currentTimeLog.id, currentTimeLog);
    } else {
      addTimeLog({ ...currentTimeLog, id: Date.now() });
    }
    setCurrentTimeLog({ id: null, taskId: '', startTime: '', endTime: '', duration: 0 });
    setIsEditing(false);
  };

  const handleEdit = (tl) => {
    setCurrentTimeLog(tl);
    setIsEditing(true);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Time Tracking</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <select name="taskId" value={currentTimeLog.taskId} onChange={handleChange} className="border p-2 mr-2" required>
          <option value="">Select Task</option>
          {tasks.map((t) => <option key={t.id} value={t.id}>{t.description}</option>)}
        </select>
        <input name="startTime" type="datetime-local" value={currentTimeLog.startTime} onChange={handleChange} className="border p-2 mr-2" required />
        <input name="endTime" type="datetime-local" value={currentTimeLog.endTime} onChange={handleChange} className="border p-2 mr-2" required />
        <button type="submit" className="bg-blue-500 text-white p-2">{isEditing ? 'Update' : 'Log Time'}</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr><th>Task ID</th><th>Start</th><th>End</th><th>Duration (hrs)</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {timeLogs.map((tl) => (
            <tr key={tl.id}>
              <td>{tl.taskId}</td><td>{tl.startTime}</td><td>{tl.endTime}</td><td>{tl.duration}</td>
              <td>
                <button onClick={() => handleEdit(tl)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => deleteTimeLog(tl.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeLog;
