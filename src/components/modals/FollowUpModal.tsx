import { useState } from 'react';
import { X, Plus, Calendar, Check, Trash2, AlertCircle } from 'lucide-react';

interface FollowUp {
  id: number;
  customer: string;
  vehicle: string;
  date: string;
  notes: string;
  completed: boolean;
}

interface Vehicle {
  id: number;
  stock: string;
  year: string;
  make: string;
  model: string;
}

interface FollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  followUps: FollowUp[];
  vehicles: Vehicle[];
  onAdd: (followUp: Omit<FollowUp, 'id' | 'completed'>) => void;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function FollowUpModal({
  isOpen,
  onClose,
  followUps,
  vehicles,
  onAdd,
  onComplete,
  onDelete
}: FollowUpModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFollowUp, setNewFollowUp] = useState({
    customer: '',
    vehicle: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  if (!isOpen) return null;

  const handleAdd = () => {
    if (newFollowUp.customer && newFollowUp.date) {
      onAdd(newFollowUp);
      setNewFollowUp({ customer: '', vehicle: '', date: new Date().toISOString().split('T')[0], notes: '' });
      setShowAddForm(false);
    }
  };

  const pending = followUps.filter(f => !f.completed);
  const completed = followUps.filter(f => f.completed);
  const overdue = pending.filter(f => new Date(f.date) < new Date());

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Follow-Up Tracker</h2>
            <p className="modal-subtitle">Manage customer follow-ups and reminders</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="stat-card-blue">
            <p className="stat-label text-blue-600">Pending</p>
            <p className="stat-value text-blue-900">{pending.length}</p>
          </div>
          <div className="stat-card-red">
            <p className="stat-label text-red-600">Overdue</p>
            <p className="stat-value text-red-900">{overdue.length}</p>
          </div>
          <div className="stat-card-green">
            <p className="stat-label text-green-600">Completed</p>
            <p className="stat-value text-green-900">{completed.length}</p>
          </div>
        </div>

        {/* Add Button */}
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-primary w-full mb-6"
          >
            <Plus size={18} />
            Schedule Follow-Up
          </button>
        )}

        {/* Add Form */}
        {showAddForm && (
          <div className="card bg-blue-50 mb-6">
            <h3 className="font-bold text-blue-900 mb-3">New Follow-Up</h3>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text"
                placeholder="Customer Name *"
                value={newFollowUp.customer}
                onChange={(e) => setNewFollowUp({...newFollowUp, customer: e.target.value})}
                className="input-field"
              />
              <select
                value={newFollowUp.vehicle}
                onChange={(e) => setNewFollowUp({...newFollowUp, vehicle: e.target.value})}
                className="select-field"
              >
                <option value="">Select Vehicle</option>
                {vehicles.map(v => (
                  <option key={v.id} value={`${v.year} ${v.make} ${v.model}`}>
                    {v.year} {v.make} {v.model}
                  </option>
                ))}
              </select>
              <input 
                type="date"
                value={newFollowUp.date}
                onChange={(e) => setNewFollowUp({...newFollowUp, date: e.target.value})}
                className="input-field"
              />
              <textarea
                placeholder="Notes"
                value={newFollowUp.notes}
                onChange={(e) => setNewFollowUp({...newFollowUp, notes: e.target.value})}
                className="input-field col-span-2"
                rows={2}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <button onClick={handleAdd} className="btn-primary flex-1">
                <Plus size={18} />
                Add Follow-Up
              </button>
              <button onClick={() => setShowAddForm(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Pending Follow-Ups */}
        <div className="mb-6">
          <h3 className="section-subheader">Pending Follow-Ups</h3>
          <div className="space-y-3">
            {pending.map(followUp => {
              const isOverdue = new Date(followUp.date) < new Date();
              return (
                <div key={followUp.id} className={`card ${isOverdue ? 'border-red-300 bg-red-50' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{followUp.customer}</h4>
                      <p className="text-sm text-gray-600">{followUp.vehicle || 'No specific vehicle'}</p>
                      <p className="text-sm text-gray-700 mt-1">{followUp.notes}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar size={14} className={isOverdue ? 'text-red-600' : 'text-gray-500'} />
                        <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                          {followUp.date}
                        </span>
                        {isOverdue && (
                          <span className="flex items-center gap-1 text-sm text-red-600">
                            <AlertCircle size={14} />
                            Overdue
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onComplete(followUp.id)}
                        className="btn-success"
                      >
                        <Check size={18} />
                        Complete
                      </button>
                      <button 
                        onClick={() => onDelete(followUp.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {pending.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">📅</div>
                <h3 className="empty-state-title">No Pending Follow-Ups</h3>
                <p className="empty-state-description">Schedule a follow-up to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Follow-Ups */}
        {completed.length > 0 && (
          <div>
            <h3 className="section-subheader">Completed</h3>
            <div className="space-y-2">
              {completed.map(followUp => (
                <div key={followUp.id} className="card bg-gray-50 opacity-60">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-700">{followUp.customer}</h4>
                      <p className="text-sm text-gray-500">{followUp.date}</p>
                    </div>
                    <Check size={18} className="text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
