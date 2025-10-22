import React, { useState } from 'react';

export default function ScheduledReports({ scheduledReports, setScheduledReports }) {
  const [scheduleFrequency, setScheduleFrequency] = useState('daily');
  const [scheduleTime, setScheduleTime] = useState('17:00');
  const [shareMethod, setShareMethod] = useState('email');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  const addSchedule = () => {
    const newSchedule = {
      id: Date.now(),
      frequency: scheduleFrequency,
      time: scheduleTime,
      method: shareMethod,
      recipient: shareMethod === 'email' ? recipientEmail : recipientPhone,
      active: true,
    };
    setScheduledReports([...scheduledReports, newSchedule]);
  };

  const deleteSchedule = (id) => {
    setScheduledReports(scheduledReports.filter(s => s.id !== id));
  };

  return (
    <section>
      <h2 className="section-header mb-4">Scheduled Reports</h2>
      <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
        <label className="block mb-2">
          Frequency:
          <select
            value={scheduleFrequency}
            onChange={(e) => setScheduleFrequency(e.target.value)}
            className="select-field"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        <label className="block mb-2">
          Time:
          <input
            type="time"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="input-field"
          />
        </label>

        <label className="block mb-2">
          Share Method:
          <select
            value={shareMethod}
            onChange={(e) => setShareMethod(e.target.value)}
            className="select-field"
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </label>

        {shareMethod === 'email' ? (
          <input
            type="email"
            placeholder="Recipient Email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="input-field mb-2"
          />
        ) : (
          <input
            type="tel"
            placeholder="Recipient Phone"
            value={recipientPhone}
            onChange={(e) => setRecipientPhone(e.target.value)}
            className="input-field mb-2"
          />
        )}

        <button onClick={addSchedule} className="btn-indigo px-4 py-2">
          Schedule Report
        </button>
      </div>

      <div className="space-y-2">
        {scheduledReports.map((schedule) => (
          <div key={schedule.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
            <div>
              <p className="font-medium capitalize">{schedule.frequency} report</p>
              <p className="text-sm text-gray-600">At {schedule.time} via {schedule.method.toUpperCase()}</p>
              <p className="text-sm text-gray-600">Recipient: {schedule.recipient}</p>
            </div>
            <button onClick={() => deleteSchedule(schedule.id)} className="text-red-600 hover:text-red-800">
              &times;
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
