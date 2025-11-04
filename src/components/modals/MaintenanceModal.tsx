import { useState } from 'react';
import { X, Plus, Wrench, Trash2 } from 'lucide-react';

interface MaintenanceRecord {
  id: number;
  stock: string;
  date: string;
  serviceType: string;
  cost: number | string;
  description?: string;
}

interface Vehicle {
  id: number;
  stock: string;
  year: string;
  make: string;
  model: string;
}

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  maintenanceRecords: MaintenanceRecord[];
  vehicles: Vehicle[];
  onAdd: (record: Omit<MaintenanceRecord, 'id'>) => void;
  onDelete: (id: number) => void;
}

export default function MaintenanceModal({
  isOpen,
  onClose,
  maintenanceRecords,
  vehicles,
  onAdd,
  onDelete
}: MaintenanceModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    stock: '',
    date: new Date().toISOString().split('T')[0],
    serviceType: '',
    cost: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleAdd = () => {
    if (newRecord.stock && newRecord.serviceType && newRecord.cost) {
      onAdd(newRecord);
      setNewRecord({
        stock: '',
        date: new Date().toISOString().split('T')[0],
        serviceType: '',
        cost: '',
        description: ''
      });
      setShowAddForm(false);
    }
  };

  // Calculate totals
  const totalCost = maintenanceRecords.reduce((sum, r) => {
    const cost = typeof r.cost === 'string' 
      ? parseFloat(r.cost.replace(/[$,]/g, '')) 
      : r.cost;
    return sum + (cost || 0);
  }, 0);

  // Group by vehicle
  const recordsByVehicle = vehicles.map(vehicle => {
    const records = maintenanceRecords.filter(r => r.stock === vehicle.stock);
    const vehicleCost = records.reduce((sum, r) => {
      const cost = typeof r.cost === 'string' 
        ? parseFloat(r.cost.replace(/[$,]/g, '')) 
        : r.cost;
      return sum + (cost || 0);
    }, 0);
    return {
      vehicle,
      records,
      totalCost: vehicleCost
    };
  }).filter(v => v.records.length > 0);

  const serviceTypes = [
    'Oil Change',
    'Brake Service',
    'Tire Replacement',
    'Battery Replacement',
    'Transmission Service',
    'Engine Repair',
    'Detailing',
    'Paint Repair',
    'Interior Repair',
    'Other'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Maintenance Tracking</h2>
            <p className="modal-subtitle">Track vehicle service and repair costs</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="stat-card-orange">
            <p className="stat-label text-orange-600">Total Records</p>
            <p className="stat-value text-orange-900">{maintenanceRecords.length}</p>
          </div>
          <div className="stat-card-red">
            <p className="stat-label text-red-600">Total Cost</p>
            <p className="stat-value text-red-900">${totalCost.toLocaleString()}</p>
          </div>
          <div className="stat-card-blue">
            <p className="stat-label text-blue-600">Avg Cost</p>
            <p className="stat-value text-blue-900">
              ${maintenanceRecords.length > 0 ? (totalCost / maintenanceRecords.length).toLocaleString() : '0'}
            </p>
          </div>
        </div>

        {/* Add Button */}
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-secondary w-full mb-6"
          >
            <Plus size={18} />
            Add Maintenance Record
          </button>
        )}

        {/* Add Form */}
        {showAddForm && (
          <div className="card bg-orange-50 mb-6">
            <h3 className="font-bold text-orange-900 mb-3">New Maintenance Record</h3>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newRecord.stock}
                onChange={(e) => setNewRecord({...newRecord, stock: e.target.value})}
                className="select-field"
              >
                <option value="">Select Vehicle *</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.stock}>
                    {v.year} {v.make} {v.model} - {v.stock}
                  </option>
                ))}
              </select>

              <input 
                type="date"
                value={newRecord.date}
                onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                className="input-field"
              />

              <select
                value={newRecord.serviceType}
                onChange={(e) => setNewRecord({...newRecord, serviceType: e.target.value})}
                className="select-field"
              >
                <option value="">Service Type *</option>
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <input 
                type="text"
                placeholder="Cost * ($500)"
                value={newRecord.cost}
                onChange={(e) => setNewRecord({...newRecord, cost: e.target.value})}
                className="input-field"
              />

              <textarea
                placeholder="Description (optional)"
                value={newRecord.description}
                onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                className="input-field col-span-2"
                rows={2}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <button onClick={handleAdd} className="btn-secondary flex-1">
                <Plus size={18} />
                Add Record
              </button>
              <button onClick={() => setShowAddForm(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Maintenance Records by Vehicle */}
        <div>
          <h3 className="section-subheader">Maintenance History</h3>
          {recordsByVehicle.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔧</div>
              <h3 className="empty-state-title">No Maintenance Records</h3>
              <p className="empty-state-description">
                Add your first maintenance record to start tracking service costs.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {recordsByVehicle.map(({ vehicle, records, totalCost: vehicleCost }) => (
                <div key={vehicle.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h4>
                      <p className="text-sm text-gray-600">Stock: {vehicle.stock}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Maintenance</p>
                      <p className="text-2xl font-bold text-orange-600">${vehicleCost.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{records.length} service{records.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {records.map(record => (
                      <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <Wrench size={14} className="text-orange-600" />
                              <span className="font-medium text-gray-800">{record.serviceType}</span>
                              <span className="text-sm text-gray-500">• {record.date}</span>
                            </div>
                            {record.description && (
                              <p className="text-sm text-gray-600 ml-5">{record.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-orange-600">
                              ${typeof record.cost === 'string' 
                                ? parseFloat(record.cost.replace(/[$,]/g, '')).toLocaleString()
                                : record.cost.toLocaleString()}
                            </span>
                            <button 
                              onClick={() => onDelete(record.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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
