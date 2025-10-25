import React from 'react';
import { Customer, Vehicle } from '../../types';
import { formatPhone } from '../../utils/formatters';

interface CustomerContactCardProps {
  customer: Customer;
  vehicles: Vehicle[];
  onCall: (phone: string) => void;
  onEmail: (email: string) => void;
}

const CustomerContactCard: React.FC<CustomerContactCardProps> = ({ customer, vehicles, onCall, onEmail }) => {
  const vehicleNames = customer.vehicleInterest?.map(id => {
    const vehicle = vehicles.find(v => v.id === id);
    return vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '';
  }).join(', ') || 'None';

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h4 className="font-bold">{customer.name}</h4>
      <p className={`text-sm ${customer.status === 'hot' ? 'text-red-500' : customer.status === 'warm' ? 'text-yellow-500' : 'text-blue-500'}`}>
        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)} Lead
      </p>
      <p>Phone: {formatPhone(customer.phone)}</p>
      <p>Email: {customer.email}</p>
      <p>Interested: {vehicleNames}</p>
      <p>Last Contact: {customer.lastContactDate || 'N/A'}</p>
      <p>Test Drive: {customer.testDrive ? 'Yes' : 'No'}</p>
      <div className="flex space-x-2 mt-2">
        <button onClick={() => onCall(customer.phone)} className="bg-blue-500 text-white p-1 rounded">Call</button>
        <button onClick={() => onEmail(customer.email)} className="bg-blue-500 text-white p-1 rounded">Email</button>
      </div>
    </div>
  );
};

export default CustomerContactCard;
