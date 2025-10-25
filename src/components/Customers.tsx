import React, { useState } from 'react';
import { useCustomers, useVehicles } from '../hooks';
import { Customer, Vehicle } from '../types';
import CustomerModal from './modals/CustomerModal';
import CustomerContactCard from './ui/CustomerContactCard';

const Customers: React.FC = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer, loading, error } = useCustomers();
  const { vehicles } = useVehicles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleAdd = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleSave = async (customer: Customer) => {
    if (selectedCustomer) {
      await updateCustomer(customer.id, customer);
    } else {
      await addCustomer({ ...customer, id: 0 });
    }
    setIsModalOpen(false);
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer Database</h2>
      <button onClick={handleAdd} className="bg-blue-500 text-white p-2 mb-4" disabled={loading}>Add Customer</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((c: Customer) => (
          <CustomerContactCard
            key={c.id}
            customer={c}
            vehicles={vehicles}
            onCall={handleCall}
            onEmail={handleEmail}
            onClick={() => handleEdit(c)}
          />
        ))}
      </div>
      {isModalOpen && <CustomerModal customer={selectedCustomer} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Customers;
