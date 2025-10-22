import React, { useState } from 'react';

export default function TaskManagement({ tasks, setTasks, userRole }) {
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          task: newTask,
          completed: false,
          assignedBy: userRole,
          priority: taskPriority,
        },
      ]);
      setNewTask('');
      setTaskPriority('medium');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high badge';
      case 'medium':
        return 'priority-medium badge';
      case 'low':
        return 'priority-low badge';
      default:
        return 'badge';
    }
  };

  return (
    <section>
      <h2 className="section-header mb-4">Tasks</h2>
      <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') addTask();
            }}
            placeholder="Add a new task"
            className="input-field flex-1"
          />
          <select
            className="select-field"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={addTask}
            className="btn-primary flex items-center gap-2 px-6 py-2"
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="checkbox-field"
              />
              <p
                className={
                  task.completed
                    ? 'line-through text-gray-400 font-semibold'
                    : undefined
                }
              >
                {task.task}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={getPriorityClass(task.priority)}>
                {task.priority}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn-danger btn-sm flex items-center gap-1 px-3 py-1"
                aria-label="Delete task"
              >
                &#x2716;
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
