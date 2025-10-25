import React, { useState } from 'react';
import { useCustomers } from '../../hooks/useCustomers';

const FollowUpModal = ({ followUp, onSave, onClose }) => {
  const [formData, setFormData] = useState(followUp || { customerId: '', date: '', notes: '' });
  const { customers } = useCustomers();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <form onSubmit={handleSubmit}>
          <select name="customerId" value={formData.customerId} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="">Select Customer</option>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="border p-2 mb-2 w-full" required />
          <button type="submit" className="bg-blue-500 text-white p-2 mr-2">Save</button>
          <button onClick={onClose} className="bg-red-500 text-white p-2">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default FollowUpModal;
