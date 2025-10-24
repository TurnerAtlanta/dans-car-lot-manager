import React from 'react';
import { useVehicles } from '../hooks/useVehicles';
import { Vehicle } from '../types';

interface VehicleListProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles, onEdit }) => {
  const { deleteVehicle } = useVehicles();

  return (
    <table className="w-full border">
      <thead>
        <tr><th>Make</th><th>Model</th><th>Year</th><th>Price</th><th>Mileage</th><th>Status</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {vehicles.map((v: Vehicle) => (
          <tr key={v.id}>
            <td>{v.make}</td><td>{v.model}</td><td>{v.year}</td><td>{v.price}</td><td>{v.mileage}</td><td>{v.status}</td>
            <td>
              <button onClick={() => onEdit(v)} className="text-blue-500 mr-2">Edit</button>
              <button onClick={() => deleteVehicle(v.id)} className="text-red-500">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehicleList;
