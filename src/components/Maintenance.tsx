import React, { useState } from 'react';
import { useMaintenances } from '../hooks/useMaintenances'; // Added hook for consistency

const Maintenance = () => {
  const { maintenances, addMaintenance, updateMaintenance, deleteMaintenance } = useMaintenances();
  const [isEditing, setIsEditing] = useState(false);
  const [currentMaintenance, setCurrentMaintenance] = useState({ id: null, vehicleId: '', description: '', date: '', cost: 0 });

  const handleChange = (e) => {
    setCurrentMaintenance({ ...currentMaintenance, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateMaintenance(currentMaintenance.id, currentMaintenance);
    } else {
      addMaintenance({ ...currentMaintenance, id: Date.now() });
    }
    setCurrentMaintenance({ id: null, vehicleId: '', description: '', date: '', cost: 0 });
    setIsEditing(false);
  };

  const handleEdit = (m) => {
    setCurrentMaintenance(m);
    setIsEditing(true);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Maintenance Records</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input name="vehicleId" value={currentMaintenance.vehicleId} onChange={handleChange} placeholder="Vehicle ID" className="border p-2 mr-2" required />
        <input name="description" value={currentMaintenance.description} onChange={handleChange} placeholder="Description" className="border p-2 mr-2" required />
        <input name="date" type="date" value={currentMaintenance.date} onChange={handleChange} className="border p-2 mr-2" required />
        <input name="cost" type="number" value={currentMaintenance.cost} onChange={handleChange} placeholder="Cost" className="border p-2 mr-2" required />
        <button type="submit" className="bg-blue-500 text-white p-2">{isEditing ? 'Update' : 'Add'}</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr><th>Vehicle ID</th><th>Description</th><th>Date</th><th>Cost</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {maintenances.map((m) => (
            <tr key={m.id}>
              <td>{m.vehicleId}</td><td>{m.description}</td><td>{m.date}</td><td>{m.cost}</td>
              <td>
                <button onClick={() => handleEdit(m)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => deleteMaintenance(m.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;
