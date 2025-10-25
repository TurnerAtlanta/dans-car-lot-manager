import React, { useState } from 'react';
import { useCustomers, useVehicles } from '../../hooks';
import { FollowUp, Customer, Vehicle } from '../../types';

interface FollowUpModalProps {
  followUp: FollowUp | null;
  onSave: (followUp: FollowUp) => void;
  onClose: () => void;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({ followUp, onSave, onClose }) => {
  const { customers } = useCustomers();
  const { vehicles } = useVehicles();
  const [formData, setFormData] = useState<FollowUp>(
    followUp || { id: 0, customerId: 0, date: '', notes: '', type: 'general', status: 'pending', vehicleId: undefined }
  );
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, vehicleId: formData.vehicleId ? Number(formData.vehicleId) : undefined });
  };

  const isOverdue = formData.date < today && formData.status === 'pending';
  const isDueToday = formData.date === today && formData.status === 'pending';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-h-[80vh] overflow-y-auto w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">{followUp ? 'Edit Follow-up' : 'Add Follow-up'}</h3>
        <form onSubmit={handleSubmit}>
          <select name="customerId" value={formData.customerId} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="">Select Customer</option>
            {customers.map((c: Customer) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select name="vehicleId" value={formData.vehicleId || ''} onChange={handleChange} className="border p-2 mb-2 w-full">
            <option value="">No Vehicle</option>
            {vehicles.map((v: Vehicle) => (
              <option key={v.id} value={v.id}>{`${v.year} ${v.make} ${v.model}`}</option>
            ))}
          </select>
          <select name="type" value={formData.type} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="test_drive">Test Drive</option>
            <option value="price_quote">Price Quote</option>
            <option value="trade_in">Trade-in Appraisal</option>
            <option value="financing">Financing Discussion</option>
            <option value="general">General Inquiry</option>
            <option value="service">Service Reminder</option>
          </select>
          <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="border p-2 mb-2 w-full" required />
          <select name="status" value={formData.status} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          {isOverdue && <span className="text-red-500 text-sm">Overdue</span>}
          {isDueToday && <span className="text-yellow-500 text-sm">Due Today</span>}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 mr-2">Save</button>
            <button onClick={onClose} className="bg-red-500 text-white p-2">Cancel</button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-sm">Tip: Follow-ups due today or overdue need urgent attention.</p>
        </div>
      </div>
    </div>
  );
};

export default FollowUpModal;
