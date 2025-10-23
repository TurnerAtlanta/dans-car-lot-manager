import React from 'react';

export default function VehicleInventory({ vehicles, setVehicles }) {
  const handlePhotoUpload = (vehicleId) => {
    alert(`Photo upload feature activated for vehicle ${vehicleId}.`);
    // In production, open file picker or device camera here.
  };
  return (
    <section>
      <h2 className="section-header mb-4">Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="vehicle-card p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => {
              // Handle showing detailed view or modal
            }}
          >
            <div className="card-header flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-800">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              <span className={`badge ${getVehicleStatusClass(vehicle.status)}`}>
                {vehicle.status}
              </span>
            </div>
            <p className="font-semibold text-gray-700">Price: {vehicle.price}</p>
            <p className="text-sm text-gray-500">Stock: {vehicle.stock}</p>

            <div className="flex gap-2 mt-2">
              {vehicle.photos.map((photo, idx) => (
                <span
                  key={idx}
                  aria-label="photo"
                  className="photo-thumbnail"
                  style={{
                    display: 'inline-block',
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundImage: `url(${photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePhotoUpload(vehicle.id);
                }}
                className="btn-secondary btn-sm"
              >
                Upload Photo
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Maintenance History</h4>
              {vehicle.maintenanceHistory.map((record, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-2 mb-2 bg-gray-50"
                >
                  <p className="text-sm font-bold">{record.service}</p>
                  <p className="text-xs text-gray-600">
                    {record.date} - Status: {record.status}
                  </p>
                  {record.notes && (
                    <p className="text-xs text-gray-700 mt-1">{record.notes}</p>
                  )}
                  <p className="text-xs">Cost: {record.cost}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function getVehicleStatusClass(status) {
  switch (status) {
    case 'Available':
      return 'vehicle-status-available badge';
    case 'In Service':
      return 'vehicle-status-service badge';
    default:
      return 'badge';
  }
}
