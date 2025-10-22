import React, { useState } from 'react';

export default function TimeLog({ timeEntries, setTimeEntries }) {
  const [newActivity, setNewActivity] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  const addTimeEntry = () => {
    if (newActivity.trim()) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setTimeEntries([...timeEntries, { id: Date.now(), time: timeStr, activity: newActivity, duration: 'Just started', editable: false }]);
      setNewActivity('');
    }
  };

  // other handlers (edit, delete) here...

  return (
    <section>
      <h2>Time Tracking</h2>
      <input
        type="text"
        value={newActivity}
        placeholder="New activity"
        onChange={(e) => setNewActivity(e.target.value)}
      />
      <button onClick={addTimeEntry}>Add</button>
      <ul>
        {timeEntries.map(entry => (
          <li key={entry.id}>{entry.time} - {entry.activity} ({entry.duration})</li>
        ))}
      </ul>
    </section>
  );
}
