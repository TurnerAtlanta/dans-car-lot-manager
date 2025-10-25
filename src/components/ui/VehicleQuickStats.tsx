import React from 'react';
import { Vehicle } from '../../types';
import { calculateDaysInInventory } from '../../utils/calculations';

interface VehicleQuickStatsProps {
  vehicle: Vehicle;
}

const VehicleQuickStats: React.FC<VehicleQuickStatsProps> = ({ vehicle }) => {
  const daysInInventory = calculateDaysInInventory(vehicle.dateAdded);

  return (
    <div className="p-2 bg-gray-100 rounded-md flex items-center space-x-2">
      <span className="text-sm">Days in Inventory: {daysInInventory}</span>
      <span className="text-sm">Mileage: {vehicle.mileage}</span>
      <span className="text-sm">Stock #: {vehicle.stockNumber}</span>
    </div>
  );
};

export default VehicleQuickStats;
