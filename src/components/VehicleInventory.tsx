import React, { useState } from 'react';
import { useVehicles } from '../hooks/useVehicles';
import { Vehicle } from '../types';
import VehicleList from './VehicleList';
import VehicleDetailModal from './modals/VehicleDetailModal';

const VehicleInventory: React.FC = () => {
  const { vehicles, addVehicle, updateVehicle, loading, error } = useVehicles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleAdd = () => {
    setSelectedVehicle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (v: Vehicle) => {
    setSelectedVehicle(v);
    setIsModalOpen(true);
  };

  const handleSave = async (vehicle: Vehicle) => {
    if (selectedVehicle) {
      await updateVehicle(selectedVehicle.id, vehicle);
    } else {
      await addVehicle({ ...vehicle, id: 0 });
    }
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Vehicle Inventory</h2>
      <button onClick={handleAdd} className="bg-blue-500 text-white p-2 mb-4" disabled={loading}>Add Vehicle</button>
      <VehicleList vehicles={vehicles} onEdit={handleEdit} />
      {isModalOpen && <VehicleDetailModal vehicle={selectedVehicle} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default VehicleInventory;
