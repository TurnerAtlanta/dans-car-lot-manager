import React, { useState } from 'react';
import { useSales } from '../hooks/useSales';
import { useVehicles } from '../hooks/useVehicles';
import { useCustomers } from '../hooks/useCustomers';

const SalesTracking = () => {
  const { sales, addSale, updateSale, deleteSale } = useSales();
  const { vehicles } = useVehicles();
  const { customers } = useCustomers();
  const [isEditing, setIsEditing] = useState(false);
  const [currentSale, setCurrentSale] = useState({ id: null, vehicleId: '', customerId: '', saleDate: '', salePrice: 0 });

  const handleChange = (e) => {
    setCurrentSale({ ...currentSale, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateSale(currentSale.id, currentSale);
    } else {
      addSale({ ...currentSale, id: Date.now() });
    }
    setCurrentSale({ id: null, vehicleId: '', customerId: '', saleDate: '', salePrice: 0 });
    setIsEditing(false);
  };

  const handleEdit = (s) => {
    setCurrentSale(s);
    setIsEditing(true);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Sales Tracking</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <select name="vehicleId" value={currentSale.vehicleId} onChange={handleChange} className="border p-2 mr-2" required>
          <option value="">Select Vehicle</option>
          {vehicles.map((v) => <option key={v.id} value={v.id}>{`${v.make} ${v.model}`}</option>)}
        </select>
        <select name="customerId" value={currentSale.customerId} onChange={handleChange} className="border p-2 mr-2" required>
          <option value="">Select Customer</option>
          {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input name="saleDate" type="date" value={currentSale.saleDate} onChange={handleChange} className="border p-2 mr-2" required />
        <input name="salePrice" type="number" value={currentSale.salePrice} onChange={handleChange} placeholder="Sale Price" className="border p-2 mr-2" required />
        <button type="submit" className="bg-blue-500 text-white p-2">{isEditing ? 'Update' : 'Add'}</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr><th>Vehicle ID</th><th>Customer ID</th><th>Date</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td>{s.vehicleId}</td><td>{s.customerId}</td><td>{s.saleDate}</td><td>{s.salePrice}</td>
              <td>
                <button onClick={() => handleEdit(s)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => deleteSale(s.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTracking;
