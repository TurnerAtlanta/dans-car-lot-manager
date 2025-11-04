import { X, Upload, Calendar, DollarSign } from 'lucide-react';

interface Vehicle {
  id: number;
  stock: string;
  year: string;
  make: string;
  model: string;
  price: string;
  purchasePrice: string;
  status: string;
  daysInInventory: number;
  photos?: string[];
}

interface VehicleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onPhotoUpload: (vehicleId: number, photo: string) => void;
}

export default function VehicleDetailModal({
  isOpen,
  onClose,
  vehicle 
  
}: VehicleDetailModalProps) {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
            <p className="modal-subtitle">Stock: {vehicle.stock}</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Photo Gallery */}
          <div className="card">
            <h3 className="font-bold text-gray-800 mb-3">Photos</h3>
            <div className="grid grid-cols-3 gap-3">
              {vehicle.photos && vehicle.photos.length > 0 ? (
                vehicle.photos.map((photo, idx) => (
                  <div key={idx} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img src={photo} alt={`Vehicle ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-8 text-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No photos uploaded</p>
                </div>
              )}
            </div>
            <button className="btn-secondary w-full mt-3">
              <Upload size={18} />
              Upload Photos
            </button>
          </div>

          {/* Vehicle Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={18} className="text-green-600" />
                <h3 className="font-bold text-gray-800">Pricing</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">List Price</p>
                  <p className="text-xl font-bold text-green-600">{vehicle.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Purchase Cost</p>
                  <p className="text-lg font-medium text-gray-700">{vehicle.purchasePrice}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-blue-600" />
                <h3 className="font-bold text-gray-800">Inventory</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Days in Stock</p>
                  <p className="text-xl font-bold text-blue-600">{vehicle.daysInInventory}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    vehicle.status === 'Available' ? 'bg-green-100 text-green-700' :
                    vehicle.status === 'Sold' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
