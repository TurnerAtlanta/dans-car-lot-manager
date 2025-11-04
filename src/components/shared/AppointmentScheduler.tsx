import React, { useState } from 'react';
import { Calendar, Clock, X, Plus, Car, CheckCircle } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
}

interface Vehicle {
  id: number;
  year: string;
  make: string;
  model: string;
}

interface Appointment {
  id: number;
  type: 'test_drive' | 'service' | 'consultation';
  date: string;
  time: string;
  customerId: number;
  customerName?: string;
  vehicleId?: number;
  vehicleDescription?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface AppointmentSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  vehicles: Vehicle[];
  appointments: Appointment[];
  onAdd: (appointment: Omit<Appointment, 'id'>) => void;
  onComplete: (id: number) => void;
  onCancel: (id: number) => void;
}

export default function AppointmentScheduler({
  isOpen,
  onClose,
  customers,
  vehicles,
  appointments,
  onAdd,
  onComplete,
  onCancel
}: AppointmentSchedulerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'test_drive' as 'test_drive' | 'service' | 'consultation',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    customerId: 0,
    vehicleId: undefined as number | undefined,
    status: 'scheduled' as 'scheduled' | 'completed' | 'cancelled'
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'customerId' || name === 'vehicleId' ? (value ? Number(value) : undefined) : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.customerId === 0) {
      alert('Please select a customer');
      return;
    }

    const customer = customers.find(c => c.id === formData.customerId);
    const vehicle = formData.vehicleId ? vehicles.find(v => v.id === formData.vehicleId) : undefined;

    onAdd({
      ...formData,
      customerName: customer?.name,
      vehicleDescription: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : undefined
    });

    setFormData({
      type: 'test_drive',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      customerId: 0,
      vehicleId: undefined,
      status: 'scheduled'
    });
    setShowAddForm(false);
  };

  const upcomingAppointments = appointments.filter(a => 
    a.status === 'scheduled' && new Date(`${a.date}T${a.time}`) >= new Date()
  );

  const todayAppointments = appointments.filter(a => 
    a.status === 'scheduled' && a.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Appointment Scheduler</h2>
            <p className="modal-subtitle">Manage test drives, service, and consultations</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="stat-card-blue">
            <p className="stat-label text-blue-600">Today's Appointments</p>
            <p className="stat-value text-blue-900">{todayAppointments.length}</p>
          </div>
          <div className="stat-card-green">
            <p className="stat-label text-green-600">Upcoming</p>
            <p className="stat-value text-green-900">{upcomingAppointments.length}</p>
          </div>
          <div className="stat-card-purple">
            <p className="stat-label text-purple-600">Total</p>
            <p className="stat-value text-purple-900">{appointments.length}</p>
          </div>
        </div>

        {/* Add Button */}
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-primary w-full mb-6"
          >
            <Plus size={18} />
            Schedule Appointment
          </button>
        )}

        {/* Add Form */}
        {showAddForm && (
          <div className="card bg-blue-50 mb-6">
            <h3 className="font-bold text-blue-900 mb-3">New Appointment</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  className="select-field"
                  required
                >
                  <option value="test_drive">Test Drive</option>
                  <option value="service">Service</option>
                  <option value="consultation">Consultation</option>
                </select>

                <select 
                  name="customerId" 
                  value={formData.customerId} 
                  onChange={handleChange} 
                  className="select-field"
                  required
                >
                  <option value={0}>Select Customer *</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>

                <select 
                  name="vehicleId" 
                  value={formData.vehicleId || ''} 
                  onChange={handleChange} 
                  className="select-field"
                >
                  <option value="">No Vehicle (Optional)</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>{`${v.year} ${v.make} ${v.model}`}</option>
                  ))}
                </select>

                <input 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  className="input-field"
                  required 
                />

                <input 
                  name="time" 
                  type="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  className="input-field col-span-2"
                  required 
                />
              </div>

              <div className="flex gap-3 mt-3">
                <button type="submit" className="btn-primary flex-1">
                  <Calendar size={18} />
                  Schedule Appointment
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)} 
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Appointments List */}
        <div>
          <h3 className="section-subheader">Scheduled Appointments</h3>
          {appointments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <h3 className="empty-state-title">No Appointments</h3>
              <p className="empty-state-description">
                Schedule your first appointment to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments
                .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
                .map(appointment => (
                  <div key={appointment.id} className="card">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            appointment.type === 'test_drive' ? 'bg-blue-100 text-blue-700' :
                            appointment.type === 'service' ? 'bg-orange-100 text-orange-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {appointment.type.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            appointment.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                            appointment.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {appointment.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <h4 className="font-bold text-gray-800">{appointment.customerName}</h4>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        
                        {appointment.vehicleDescription && (
                          <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                            <Car size={14} />
                            <span>{appointment.vehicleDescription}</span>
                          </div>
                        )}
                      </div>

                      {appointment.status === 'scheduled' && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => onComplete(appointment.id)}
                            className="btn-primary py-1 px-3 text-sm"
                          >
                            <CheckCircle size={14} />
                            Complete
                          </button>
                          <button 
                            onClick={() => onCancel(appointment.id)}
                            className="btn-secondary py-1 px-3 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
