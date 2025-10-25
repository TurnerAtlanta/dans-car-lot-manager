import React, { useState } from 'react';
import { useFollowUps } from '../hooks/useFollowUps'; // Added hook for consistency
import FollowUpModal from './modals/FollowUpModal.jsx';

const FollowUps = () => {
  const { followUps, addFollowUp, updateFollowUp, deleteFollowUp } = useFollowUps();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);

  const handleAdd = () => {
    setSelectedFollowUp(null);
    setIsModalOpen(true);
  };

  const handleEdit = (f) => {
    setSelectedFollowUp(f);
    setIsModalOpen(true);
  };

  const handleSave = (followUp) => {
    if (selectedFollowUp) {
      updateFollowUp(followUp.id, followUp);
    } else {
      addFollowUp({ ...followUp, id: Date.now() });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Follow-up Reminders</h2>
      <button onClick={handleAdd} className="bg-blue-500 text-white p-2 mb-4">Add Follow-up</button>
      <table className="w-full border">
        <thead>
          <tr><th>Customer ID</th><th>Date</th><th>Notes</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {followUps.map((f) => (
            <tr key={f.id}>
              <td>{f.customerId}</td><td>{f.date}</td><td>{f.notes}</td>
              <td>
                <button onClick={() => handleEdit(f)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => deleteFollowUp(f.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <FollowUpModal followUp={selectedFollowUp} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default FollowUps;
