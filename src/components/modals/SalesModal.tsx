import React, { useState } from 'react';
import { useSales, useVehicles, useCustomers } from '../../hooks';
import { Sale, Vehicle, Customer } from '../../types';

interface SalesModalProps {
  sale: Sale | null;
  onSave: (sale: Sale) => void;
  onClose: () => void;
}

const SalesModal: React.FC<SalesModalProps> = ({ sale, onSave, onClose }) => {
  const { sales } = useSales();
  const { vehicles } = useVehicles();
  const { customers } = useCustomers();
  const [formData, setFormData] = useState<Sale>(
    sale || { id: 0, vehicleId: 0, customerId: 0, saleDate: '', salePrice: 0, purchasePrice: 0, paymentMethod: 'cash', salesperson: 'Dan' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      vehicleId: Number(formData.vehicleId),
      customerId: Number(formData.customerId),
      salePrice: Number(formData.salePrice),
      purchasePrice: Number(formData.purchasePrice),
    });
  };

  const totalRevenue = sales.reduce((sum, s) => sum + s.salePrice, 0);
  const totalProfit = sales.reduce((sum, s) => sum + (s.salePrice - s.purchasePrice), 0);
  const averageProfit = sales.length ? totalProfit / sales.length : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-h-[80vh] overflow-y-auto w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">{sale ? 'Edit Sale' : 'Add Sale'}</h3>
        <form onSubmit={handleSubmit}>
          <select name="vehicleId" value={formData.vehicleId} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="">Select Vehicle</option>
            {vehicles.map((v: Vehicle) => (
              <option key={v.id} value={v.id}>{`${v.year} ${v.make} ${v.model}`}</option>
            ))}
          </select>
          <select name="customerId" value={formData.customerId} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="">Select Customer</option>
            {customers.map((c: Customer) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input name="saleDate" type="date" value={formData.saleDate} onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <input name="salePrice" type="number" value={formData.salePrice} onChange={handleChange} placeholder="Sale Price" className="border p-2 mb-2 w-full" required />
          <input name="purchasePrice" type="number" value={formData.purchasePrice} onChange={handleChange} placeholder="Purchase Price" className="border p-2 mb-2 w-full" required />
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="cash">Cash</option>
            <option value="finance">Finance</option>
          </select>
          <select name="salesperson" value={formData.salesperson} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="Dan">Dan</option>
            <option value="Boss">Boss</option>
          </select>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 mr-2">Save</button>
            <button onClick={onClose} className="bg-red-500 text-white p-2">Cancel</button>
          </div>
        </form>
        <div className="mt-4">
          <h4 className="font-bold">Sales Statistics</h4>
          <p>Total Sales: {sales.length}</p>
          <p>Total Revenue: ${totalRevenue}</p>
          <p>Total Profit: ${totalProfit}</p>
          <p>Average Profit per Sale: ${averageProfit.toFixed(2)}</p>
          <table className="w-full border mt-2">
            <thead>
              <tr><th>Date</th><th>Customer</th><th>Vehicle</th><th>Profit</th></tr>
            </thead>
            <tbody>
              {sales.map((s: Sale) => {
                const vehicle = vehicles.find(v => v.id === s.vehicleId);
                const customer = customers.find(c => c.id === s.customerId);
                return (
                  <tr key={s.id} className={s.salePrice - s.purchasePrice > 0 ? 'text-green-500' : 'text-red-500'}>
                    <td>{s.saleDate}</td>
                    <td>{customer?.name}</td>
                    <td>{vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : ''}</td>
                    <td>${(s.salePrice - s.purchasePrice).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesModal;
