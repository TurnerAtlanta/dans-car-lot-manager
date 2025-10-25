import React, { useState } from 'react';

const VehicleDetailModal = ({ vehicle, onSave, onClose }) => {
  const [formData, setFormData] = useState(vehicle || { make: '', model: '', year: '', price: 0, mileage: 0, status: 'available' });

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
          <input name="make" value={formData.make} onChange={handleChange} placeholder="Make" className="border p-2 mb-2 w-full" required />
          <input name="model" value={formData.model} onChange={handleChange} placeholder="Model" className="border p-2 mb-2 w-full" required />
          <input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="Year" className="border p-2 mb-2 w-full" required />
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 mb-2 w-full" required />
          <input name="mileage" type="number" value={formData.mileage} onChange={handleChange} placeholder="Mileage" className="border p-2 mb-2 w-full" required />
          <select name="status" value={formData.status} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 mr-2">Save</button>
          <button onClick={onClose} className="bg-red-500 text-white p-2">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default VehicleDetailModal;
