import React, { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import { Customer } from '../types';

const Customers: React.FC = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer, loading, error } = useCustomers();
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>({ id: 0, name: '', email: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCustomer({ ...currentCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await updateCustomer(currentCustomer.id, currentCustomer);
    } else {
      await addCustomer({ name: currentCustomer.name, email: currentCustomer.email, phone: currentCustomer.phone });
    }
    setCurrentCustomer({ id: 0, name: '', email: '', phone: '' });
    setIsEditing(false);
  };

  const handleEdit = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsEditing(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Customer Database</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input name="name" value={currentCustomer.name} onChange={handleChange} placeholder="Name" className="border p-2 mr-2" required />
        <input name="email" value={currentCustomer.email} onChange={handleChange} placeholder="Email" className="border p-2 mr-2" required />
        <input name="phone" value={currentCustomer.phone} onChange={handleChange} placeholder="Phone" className="border p-2 mr-2" required />
        <button type="submit" className="bg-blue-500 text-white p-2" disabled={loading}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </form>
      <table className="w-full border">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {customers.map((c: Customer) => (
            <tr key={c.id}>
              <td>{c.name}</td><td>{c.email}</td><td>{c.phone}</td>
              <td>
                <button onClick={() => handleEdit(c)} className="text-blue-500 mr-2" disabled={loading}>Edit</button>
                <button onClick={() => deleteCustomer(c.id)} className="text-red-500" disabled={loading}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
