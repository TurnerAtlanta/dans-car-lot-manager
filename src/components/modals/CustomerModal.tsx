import { useState } from 'react';
import { X, Plus, Phone, Mail, Trash2 } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  status: 'Hot Lead' | 'Warm Lead' | 'Cold Lead' | 'New Lead';
  added: string;
  lastContact?: string;
  vehicleInterest?: string;
}

interface Vehicle {
  id: number;
  stock: string;
  year: string;
  make: string;
  model: string;
}

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  vehicles: Vehicle[];
  onAdd: (customer: Omit<Customer, 'id' | 'added'>) => void;
  onDelete: (id: number) => void;
}

export default function CustomerModal({
  isOpen,
  onClose,
  customers,
  vehicles,
  onAdd,
  onDelete
}: CustomerModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    interest: '',
    status: 'New Lead' as 'Hot Lead' | 'Warm Lead' | 'Cold Lead' | 'New Lead',
    lastContact: new Date().toISOString().split('T')[0],
    vehicleInterest: ''
  });

  if (!isOpen) return null;

  const handleAdd = () => {
    if (newCustomer.name && newCustomer.phone) {
      onAdd({
        ...newCustomer,
        vehicleInterest: newCustomer.interest // Map interest to vehicleInterest
      });
      setNewCustomer({ 
        name: '', 
        phone: '', 
        email: '', 
        interest: '',
        status: 'New Lead',
        lastContact: new Date().toISOString().split('T')[0],
        vehicleInterest: ''
      });
      setShowAddForm(false);
    }
  };

  const hotLeads = customers.filter(c => c.status === 'Hot Lead').length;
  const warmLeads = customers.filter(c => c.status === 'Warm Lead').length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Customer Management</h2>
            <p className="modal-subtitle">Track leads and customer interactions</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="stat-card-blue">
            <p className="stat-label text-blue-600">Total Leads</p>
            <p className="stat-value text-blue-900">{customers.length}</p>
          </div>
          <div className="stat-card-red">
            <p className="stat-label text-red-600">Hot Leads</p>
            <p className="stat-value text-red-900">{hotLeads}</p>
          </div>
          <div className="stat-card-yellow">
            <p className="stat-label text-yellow-600">Warm Leads</p>
            <p className="stat-value text-yellow-900">{warmLeads}</p>
          </div>
        </div>

        {/* Add Button */}
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-primary w-full mb-6"
          >
            <Plus size={18} />
            Add New Lead
          </button>
        )}

        {/* Add Form */}
        {showAddForm && (
          <div className="card bg-blue-50 mb-6">
            <h3 className="font-bold text-blue-900 mb-3">New Customer Lead</h3>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text"
                placeholder="Name *"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                className="input-field"
              />
              <input 
                type="tel"
                placeholder="Phone *"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                className="input-field"
              />
              <input 
                type="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                className="input-field"
              />
              <select
                value={newCustomer.interest}
                onChange={(e) => setNewCustomer({...newCustomer, interest: e.target.value, vehicleInterest: e.target.value})}
                className="select-field"
              >
                <option value="">Vehicle Interest</option>
                {vehicles.map(v => (
                  <option key={v.id} value={`${v.year} ${v.make} ${v.model}`}>
                    {v.year} {v.make} {v.model}
                  </option>
                ))}
              </select>
              <select
                value={newCustomer.status}
                onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value as any})}
                className="select-field col-span-2"
              >
                <option value="New Lead">New Lead</option>
                <option value="Hot Lead">Hot Lead</option>
                <option value="Warm Lead">Warm Lead</option>
                <option value="Cold Lead">Cold Lead</option>
              </select>
            </div>
            <div className="flex gap-3 mt-3">
              <button onClick={handleAdd} className="btn-primary flex-1">
                <Plus size={18} />
                Add Customer
              </button>
              <button onClick={() => setShowAddForm(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Customer List */}
        <div className="space-y-3">
          {customers.map(customer => (
            <div key={customer.id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{customer.name}</h4>
                  <p className="text-sm text-gray-600">
                    Interest: {customer.interest || customer.vehicleInterest || 'Not specified'}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <a 
                      href={`tel:${customer.phone}`} 
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Phone size={14} />
                      {customer.phone}
                    </a>
                    {customer.email && (
                      <a 
                        href={`mailto:${customer.email}`} 
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Mail size={14} />
                        {customer.email}
                      </a>
                    )}
                  </div>
                  {customer.lastContact && (
                    <p className="text-xs text-gray-500 mt-1">
                      Last contact: {customer.lastContact}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    customer.status === 'Hot Lead' ? 'bg-red-100 text-red-700' :
                    customer.status === 'Warm Lead' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {customer.status}
                  </span>
                  <button 
                    onClick={() => onDelete(customer.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {customers.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <h3 className="empty-state-title">No Customers Yet</h3>
              <p className="empty-state-description">Add your first customer lead to start tracking.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
