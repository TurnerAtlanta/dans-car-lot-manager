import React, { useState } from 'react';
import { useCustomers, useVehicles } from '../../hooks';
import { Appointment, Customer, Vehicle } from '../../types';

interface AppointmentSchedulerProps {
  onSave: (appointment: Appointment) => void;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ onSave }) => {
  const { customers } = useCustomers();
  const { vehicles } = useVehicles();
  const [formData, setFormData] = useState<Appointment>({
    id: 0,
    type: 'test_drive',
    date: '',
    time: '',
    customerId: 0,
    vehicleId: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: Date.now(), vehicleId: formData.vehicleId ? Number(formData.vehicleId) : undefined });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h4 className="font-bold mb-2">Schedule Appointment</h4>
      <form onSubmit={handleSubmit}>
        <select name="type" value={formData.type} onChange={handleChange} className="border p-2 mb-2 w-full" required>
          <option value="test_drive">Test Drive</option>
          <option value="service">Service</option>
          <option value="consultation">Consultation</option>
        </select>
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
        <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input name="time" type="time" value={formData.time} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Schedule</button>
      </form>
    </div>
  );
};

export default AppointmentScheduler;
