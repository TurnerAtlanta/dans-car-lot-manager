import React, { useState } from 'react';

export default function CustomerDatabase({ customers, setCustomers }) {
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'Warm Lead',
    vehicleInterest: '',
    notes: '',
    testDrive: false,
  });

  const addCustomer = () => {
    if (newCustomer.name.trim()) {
      const customer = {
        id: Date.now(),
        ...newCustomer,
        lastContact: new Date().toISOString().split('T')[0], // today's date YYYY-MM-DD
      };
      setCustomers([...customers, customer]);
      setNewCustomer({
        name: '',
        phone: '',
        email: '',
        status: 'Warm Lead',
        vehicleInterest: '',
        notes: '',
        testDrive: false,
      });
    }
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const getLeadClass = (status) => {
    switch (status) {
      case 'Hot Lead':
        return 'lead-hot badge';
      case 'Warm Lead':
        return 'lead-warm badge';
      case 'Cold Lead':
        return 'lead-cold badge';
      default:
        return 'badge';
    }
  };

  return (
    <section>
      <h2 className="section-header mb-4">Customer Database</h2>
      <div className="mb-6 bg-pink-50 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
          className="input-field mb-2"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          className="input-field mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
          className="input-field mb-2"
        />
        <select
          value={newCustomer.status}
          onChange={e => setNewCustomer({ ...newCustomer, status: e.target.value })}
          className="select-field mb-2"
        >
          <option value="Hot Lead">Hot Lead</option>
          <option value="Warm Lead">Warm Lead</option>
          <option value="Cold Lead">Cold Lead</option>
        </select>
        <input
          type="text"
          placeholder="Interested Vehicle"
          value={newCustomer.vehicleInterest}
          onChange={e => setNewCustomer({ ...newCustomer, vehicleInterest: e.target.value })}
          className="input-field mb-2"
        />
        <textarea
          placeholder="Notes"
          value={newCustomer.notes}
          onChange={e => setNewCustomer({ ...newCustomer, notes: e.target.value })}
          className="input-field mb-2"
        />
        <label className="block mb-4">
          <input
            type="checkbox"
            checked={newCustomer.testDrive}
            onChange={e => setNewCustomer({ ...newCustomer, testDrive: e.target.checked })}
            className="mr-2"
          />
          Interested in Test Drive
        </label>
        <button onClick={addCustomer} className="btn-pink px-4 py-2">
          Add Customer
        </button>
      </div>

      <div className="space-y-3">
        {customers.map(customer => (
          <div
            key={customer.id}
            className="bg-white border border-pink-300 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold">{customer.name}</p>
              <p className="text-sm">Phone: {customer.phone}</p>
              <p className="text-sm">Email: {customer.email}</p>
              <p className="text-sm">
                Status: <span className={getLeadClass(customer.status)}>{customer.status}</span>
              </p>
              <p className="text-sm">Interested Vehicle: {customer.vehicleInterest}</p>
              <p className="text-sm">Last Contact: {customer.lastContact}</p>
              <p className="text-sm">{customer.notes}</p>
              <p className="text-sm">Test Drive: {customer.testDrive ? 'Yes' : 'No'}</p>
            </div>
            <button
              onClick={() => deleteCustomer(customer.id)}
              className="btn-danger btn-sm px-3 py-1"
              aria-label="Delete customer"
            >
              &#x2716;
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
