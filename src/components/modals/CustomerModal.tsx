import React, { useState } from 'react';
import { useCustomers, useVehicles } from '../../hooks';
import { Customer, Vehicle } from '../../types';

interface CustomerModalProps {
  customer: Customer | null;
  onSave: (customer: Customer) => void;
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ customer, onSave, onClose }) => {
  const { customers } = useCustomers();
  const { vehicles } = useVehicles();
  const [formData, setFormData] = useState<Customer>(
    customer || { id: 0, name: '', email: '', phone: '', status: 'cold', vehicleInterest: [], testDrive: false, notes: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleVehicleInterest = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
    setFormData({ ...formData, vehicleInterest: options });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, lastContactDate: formData.lastContactDate || new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-h-[80vh] overflow-y-auto w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">{customer ? 'Edit Customer' : 'Add Customer'}</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 mb-2 w-full" required />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 mb-2 w-full" required />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 mb-2 w-full" required />
          <select name="status" value={formData.status} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="hot">Hot Lead</option>
            <option value="warm">Warm Lead</option>
            <option value="cold">Cold Lead</option>
          </select>
          <select multiple name="vehicleInterest" value={formData.vehicleInterest?.map(String)} onChange={handleVehicleInterest} className="border p-2 mb-2 w-full">
            {vehicles.map((v: Vehicle) => (
              <option key={v.id} value={v.id}>{`${v.year} ${v.make} ${v.model}`}</option>
            ))}
          </select>
          <label className="flex items-center mb-2">
            <input name="testDrive" type="checkbox" checked={formData.testDrive} onChange={handleChange} className="mr-2" />
            Test Drive Completed
          </label>
          <textarea name="notes" value={formData.notes || ''} onChange={handleChange} placeholder="Notes" className="border p-2 mb-2 w-full" />
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 mr-2">Save</button>
            <button onClick={onClose} className="bg-red-500 text-white p-2">Cancel</button>
          </div>
        </form>
        <div className="mt-4">
          <h4 className="font-bold">Lead Statistics</h4>
          <p>Hot: {customers.filter(c => c.status === 'hot').length}</p>
          <p>Warm: {customers.filter(c => c.status === 'warm').length}</p>
          <p>Cold: {customers.filter(c => c.status === 'cold').length}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
