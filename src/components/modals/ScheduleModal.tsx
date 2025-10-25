import React, { useState } from 'react';
import { ReportSchedule } from '../../types';

interface ScheduleModalProps {
  onSave: (schedule: ReportSchedule) => void;
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState<ReportSchedule>({
    id: 0,
    frequency: 'daily',
    time: '09:00',
    deliveryMethod: 'email',
    recipient: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: Date.now() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-h-[80vh] overflow-y-auto w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">Schedule Report</h3>
        <form onSubmit={handleSubmit}>
          <select name="frequency" value={formData.frequency} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input name="time" type="time" value={formData.time} onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
          <input name="recipient" value={formData.recipient} onChange={handleChange} placeholder="Email or Phone" className="border p-2 mb-2 w-full" required />
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 mr-2">Save</button>
            <button onClick={onClose} className="bg-red-500 text-white p-2">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
