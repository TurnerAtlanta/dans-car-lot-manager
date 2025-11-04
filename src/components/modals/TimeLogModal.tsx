import { useState } from 'react';
import { X, Clock, Play, Pause, Calendar, Download } from 'lucide-react';

interface TimeEntry {
  id: number;
  date: string;
  clockIn: string;
  clockOut?: string;
  hours: number;
  description: string;
  status: 'active' | 'completed';
}

interface TimeLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeEntries: TimeEntry[];
  onClockIn: (entry: Omit<TimeEntry, 'id' | 'hours' | 'status'>) => void;
  onClockOut: (id: number) => void;
  onAdd: (entry: Omit<TimeEntry, 'id' | 'status'>) => void;
  onDelete: (id: number) => void;
}

export default function TimeLogModal({
  isOpen,
  onClose,
  timeEntries,
  onClockIn,
  onClockOut,
  onAdd
  
}: TimeLogModalProps) {
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualEntry, setManualEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    clockIn: '09:00',
    clockOut: '17:00',
    description: ''
  });

  if (!isOpen) return null;

  const activeEntry = timeEntries.find(e => e.status === 'active');
  const todayEntries = timeEntries.filter(e => 
    e.date === new Date().toISOString().split('T')[0]
  );
  const thisWeekEntries = timeEntries.filter(e => {
    const entryDate = new Date(e.date);
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    return entryDate >= weekStart;
  });

  const totalWeekHours = thisWeekEntries.reduce((sum, e) => sum + e.hours, 0);
  const totalTodayHours = todayEntries.reduce((sum, e) => sum + e.hours, 0);

  const handleClockIn = () => {
    const now = new Date();
    onClockIn({
      date: now.toISOString().split('T')[0],
      clockIn: now.toTimeString().slice(0, 5),
      description: ''
    });
  };

  const handleClockOut = () => {
    if (activeEntry) {
      onClockOut(activeEntry.id);
    }
  };

  const handleManualAdd = () => {
    const clockInTime = new Date(`${manualEntry.date}T${manualEntry.clockIn}`);
    const clockOutTime = new Date(`${manualEntry.date}T${manualEntry.clockOut}`);
    const hours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);

    onAdd({
      date: manualEntry.date,
      clockIn: manualEntry.clockIn,
      clockOut: manualEntry.clockOut,
      hours: Math.round(hours * 100) / 100,
      description: manualEntry.description
    });

    setManualEntry({
      date: new Date().toISOString().split('T')[0],
      clockIn: '09:00',
      clockOut: '17:00',
      description: ''
    });
    setShowManualEntry(false);
  };

  const exportTimesheet = () => {
    let csv = 'Date,Clock In,Clock Out,Hours,Description\n';
    timeEntries.forEach(entry => {
      csv += `${entry.date},${entry.clockIn},${entry.clockOut || 'Active'},${entry.hours},${entry.description}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timesheet-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Time Log</h2>
            <p className="modal-subtitle">Track your work hours</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="stat-card-blue">
            <p className="stat-label text-blue-600">Today</p>
            <p className="stat-value text-blue-900">{totalTodayHours.toFixed(1)}h</p>
          </div>
          <div className="stat-card-purple">
            <p className="stat-label text-purple-600">This Week</p>
            <p className="stat-value text-purple-900">{totalWeekHours.toFixed(1)}h</p>
          </div>
          <div className="stat-card-green">
            <p className="stat-label text-green-600">Total Entries</p>
            <p className="stat-value text-green-900">{timeEntries.length}</p>
          </div>
        </div>

        {/* Clock In/Out */}
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                {activeEntry ? 'Currently Clocked In' : 'Ready to Start'}
              </h3>
              {activeEntry && (
                <p className="text-sm text-gray-600 mt-1">
                  Started at {activeEntry.clockIn} • {new Date().toTimeString().slice(0, 5)}
                </p>
              )}
            </div>
            {activeEntry ? (
              <button 
                onClick={handleClockOut}
                className="btn-danger flex items-center gap-2"
              >
                <Pause size={20} />
                Clock Out
              </button>
            ) : (
              <button 
                onClick={handleClockIn}
                className="btn-success flex items-center gap-2"
              >
                <Play size={20} />
                Clock In
              </button>
            )}
          </div>
        </div>

        {/* Manual Entry Button */}
        {!showManualEntry && (
          <button 
            onClick={() => setShowManualEntry(true)}
            className="btn-secondary w-full mb-6"
          >
            <Calendar size={18} />
            Add Manual Entry
          </button>
        )}

        {/* Manual Entry Form */}
        {showManualEntry && (
          <div className="card bg-blue-50 mb-6">
            <h3 className="font-bold text-blue-900 mb-3">Manual Time Entry</h3>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="date"
                value={manualEntry.date}
                onChange={(e) => setManualEntry({...manualEntry, date: e.target.value})}
                className="input-field"
              />
              <input 
                type="time"
                placeholder="Clock In"
                value={manualEntry.clockIn}
                onChange={(e) => setManualEntry({...manualEntry, clockIn: e.target.value})}
                className="input-field"
              />
              <input 
                type="time"
                placeholder="Clock Out"
                value={manualEntry.clockOut}
                onChange={(e) => setManualEntry({...manualEntry, clockOut: e.target.value})}
                className="input-field"
              />
              <input 
                type="text"
                placeholder="Description (optional)"
                value={manualEntry.description}
                onChange={(e) => setManualEntry({...manualEntry, description: e.target.value})}
                className="input-field"
              />
            </div>
            <div className="flex gap-3 mt-3">
              <button onClick={handleManualAdd} className="btn-primary flex-1">
                Add Entry
              </button>
              <button onClick={() => setShowManualEntry(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Export Button */}
        <button 
          onClick={exportTimesheet}
          className="btn-secondary w-full mb-6"
        >
          <Download size={18} />
          Export Timesheet
        </button>

        {/* Time Entries List */}
        <div>
          <h3 className="section-subheader">Recent Entries</h3>
          <div className="space-y-2">
            {timeEntries.slice(-10).reverse().map(entry => (
              <div key={entry.id} className={`card ${entry.status === 'active' ? 'bg-green-50 border-green-300' : ''}`}>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-gray-500" />
                      <span className="font-medium text-gray-800">{entry.date}</span>
                      <span className="text-gray-600">
                        {entry.clockIn} - {entry.clockOut || 'Active'}
                      </span>
                      {entry.status === 'active' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    {entry.description && (
                      <p className="text-sm text-gray-600 mt-1 ml-7">{entry.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{entry.hours.toFixed(1)}h</p>
                  </div>
                </div>
              </div>
            ))}
            {timeEntries.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">⏰</div>
                <h3 className="empty-state-title">No Time Entries</h3>
                <p className="empty-state-description">
                  Clock in to start tracking your time
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
