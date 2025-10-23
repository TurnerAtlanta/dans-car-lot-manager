import React, { useState } from 'react';
import { Clock, CheckSquare, Car, Wrench, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function CarLotManager() {
  const [activeTab, setActiveTab] = useState('timeLog');
  const [userRole, setUserRole] = useState('employee'); // 'employee' or 'boss'

  // Time Log State
  const [timeEntries, setTimeEntries] = useState([
    { id: 1, time: '09:00 AM', activity: 'Opened lot, checked inventory', duration: '30 min', editable: false },
    { id: 2, time: '10:15 AM', activity: 'Customer walkthrough - 2018 Honda Accord', duration: '45 min', editable: false },
  ]);
  const [newActivity, setNewActivity] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Detail 2020 Toyota Camry', completed: false, assignedBy: 'boss', priority: 'high' },
    { id: 2, task: 'Follow up with customer - John Smith', completed: false, assignedBy: 'employee', priority: 'medium' },
    { id: 3, task: 'Update prices on lot signs', completed: true, assignedBy: 'boss', priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');

  // Vehicles State
  const [vehicles, setVehicles] = useState([
    { id: 1, year: '2020', make: 'Toyota', model: 'Camry', status: 'Available', price: '$22,500', stock: 'TC-2020-01' },
    { id: 2, year: '2018', make: 'Honda', model: 'Accord', status: 'In Service', price: '$18,900', stock: 'HA-2018-02' },
  ]);

  // Maintenance State
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    { id: 1, vehicle: 'TC-2020-01', date: '2025-10-15', service: 'Interior detailing', status: 'Completed', notes: 'Ready for showroom' },
    { id: 2, vehicle: 'HA-2018-02', date: '2025-10-18', service: 'Oil change and inspection', status: 'In Progress', notes: 'Due back by 2 PM' },
  ]);

  // Time Log Functions
  const addTimeEntry = () => {
    if (newActivity.trim()) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setTimeEntries([...timeEntries, {
        id: Date.now(),
        time: timeStr,
        activity: newActivity,
        duration: 'Just started',
        editable: false
      }]);
      setNewActivity('');
    }
  };

  const deleteTimeEntry = (id) => {
    setTimeEntries(timeEntries.filter(e => e.id !== id));
  };

  const startEditEntry = (entry) => {
    setEditingEntry({ ...entry });
  };

  const saveEditEntry = () => {
    setTimeEntries(timeEntries.map(e => e.id === editingEntry.id ? editingEntry : e));
    setEditingEntry(null);
  };

  // Task Functions
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        task: newTask,
        completed: false,
        assignedBy: userRole,
        priority: taskPriority
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Car Lot Manager</h1>
              <p className="text-gray-600 mt-1">Time Tracking & Task Management</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setUserRole('employee')}
                className={`px-4 py-2 rounded-lg font-medium transition ${userRole === 'employee' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Dan (Employee)
              </button>
              <button
                onClick={() => setUserRole('boss')}
                className={`px-4 py-2 rounded-lg font-medium transition ${userRole === 'boss' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Boss
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('timeLog')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${activeTab === 'timeLog' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Clock size={20} />
              Time Log
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${activeTab === 'tasks' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <CheckSquare size={20} />
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${activeTab === 'vehicles' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Car size={20} />
              Vehicles
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${activeTab === 'maintenance' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Wrench size={20} />
              Maintenance
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Time Log Tab */}
            {activeTab === 'timeLog' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Time Log</h2>

                {/* Add New Entry */}
                <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTimeEntry()}
                      placeholder="What are you working on?"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={addTimeEntry}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Log Activity
                    </button>
                  </div>
                </div>

                {/* Time Entries */}
                <div className="space-y-3">
                  {timeEntries.map(entry => (
                    <div key={entry.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      {editingEntry?.id === entry.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingEntry.activity}
                            onChange={(e) => setEditingEntry({ ...editingEntry, activity: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={saveEditEntry}
                              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                            >
                              <Save size={16} />
                              Save
                            </button>
                            <button
                              onClick={() => setEditingEntry(null)}
                              className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 flex items-center gap-1"
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-blue-600 font-semibold">{entry.time}</span>
                              <span className="text-gray-500 text-sm">• {entry.duration}</span>
                            </div>
                            <p className="text-gray-800">{entry.activity}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditEntry(entry)}
                              className="text-gray-600 hover:text-blue-600 transition"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteTimeEntry(entry.id)}
                              className="text-gray-600 hover:text-red-600 transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Management</h2>

                {/* Add New Task */}
                <div className="mb-6 bg-purple-50 p-4 rounded-lg">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      placeholder="Add a new task..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <select
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <button
                      onClick={addTask}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Add Task
                    </button>
                  </div>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition ${task.completed ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.task}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            by {task.assignedBy === 'boss' ? 'Boss' : 'Dan'}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-gray-600 hover:text-red-600 transition ml-3"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicles Tab */}
            {activeTab === 'vehicles' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Vehicle Inventory</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${vehicle.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                          {vehicle.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <p><span className="font-medium">Stock #:</span> {vehicle.stock}</p>
                        <p><span className="font-medium">Price:</span> <span className="text-green-600 font-bold">{vehicle.price}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Maintenance Records</h2>

                <div className="space-y-3">
                  {maintenanceRecords.map(record => (
                    <div key={record.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{record.service}</h3>
                          <p className="text-sm text-gray-600">Vehicle: {record.vehicle}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${record.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {record.status}
                        </span>
                      </div>
                      <div className="text-gray-600 text-sm">
                        <p><span className="font-medium">Date:</span> {record.date}</p>
                        <p><span className="font-medium">Notes:</span> {record.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
