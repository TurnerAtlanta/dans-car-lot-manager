import React from 'react';
import { X, Upload, Plus, History } from 'lucide-react';

export default function VehicleDetailModal({
  isOpen,
  onClose,
  vehicle,
  onPhotoUpload,
}) {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h2>
            <p className="modal-subtitle">Stock: {vehicle.stock}</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition">
            <X size={24} />
          </button>
        </div>

        {/* Vehicle Photos */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Upload size={18} />
            Vehicle Photos ({vehicle.photos?.length || 0})
          </h3>
          <div className="flex gap-2 flex-wrap">
            {vehicle.photos?.map((photo, idx) => (
              <div
                key={idx}
                className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-3xl"
              >
                {photo}
              </div>
            ))}
            <button
              onClick={() => onPhotoUpload(vehicle.id)}
              className="w-20 h-20 bg-blue-50 border-2 border-dashed border-blue-300 rounded flex items-center justify-center hover:bg-blue-100 transition"
            >
              <Plus size={24} className="text-blue-600" />
            </button>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">List Price</p>
              <p className="text-lg font-bold text-green-600">{vehicle.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span
                className={vehicle.status === 'Available' ? 'badge-green' : 'badge-orange'}
              >
                {vehicle.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Purchase Price</p>
              <p className="text-lg font-bold text-gray-800">{vehicle.purchasePrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Recon Cost</p>
              <p className="text-lg font-bold text-gray-800">{vehicle.reconCost}</p>
            </div>
          </div>
        </div>

        {/* Maintenance History */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <History size={18} />
            Complete Maintenance History ({vehicle.maintenanceHistory?.length || 0} records)
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {vehicle.maintenanceHistory?.length > 0 ? (
              vehicle.maintenanceHistory.map((record, idx) => (
                <div key={idx} className="card bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800">{record.service}</h4>
                      <p className="text-sm text-gray-600">{record.date}</p>
                    </div>
                    <span
                      className={record.status === 'Completed' ? 'badge-green' : 'badge-blue'}
                    >
                      {record.status}
                    </span>
                  </div>

                  {record.photos && record.photos.length > 0 && (
                    <div className="mb-2 flex gap-1">
                      {record.photos.map((photo, photoIdx) => (
                        <span key={photoIdx} className="text-2xl">
                          {photo}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-700 text-sm">{record.notes}</p>
                  {record.cost && (
                    <p className="text-sm font-medium text-gray-800 mt-2">
                      Cost: <span className="text-red-600">{record.cost}</span>
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No maintenance records yet</p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-gray-600 italic">
            All maintenance records are automatically linked to this vehicle. Add photos to any maintenance record to build a complete service history.
          </p>
        </div>
      </div>
    </div>
  );
}

