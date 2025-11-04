
import { Car, Calendar } from 'lucide-react';

interface Vehicle {
  dateAdded?: string;
  mileage?: number;
}

interface VehicleQuickStatsProps {
  vehicle: Vehicle;
}

export function VehicleQuickStats({ vehicle }: VehicleQuickStatsProps) {
  const daysInInventory = Math.floor(
    (new Date().getTime() - new Date(vehicle.dateAdded || new Date()).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar size={14} />
        <span>{daysInInventory} days in inventory</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Car size={14} />
        <span>{vehicle.mileage || 'N/A'} miles</span>
      </div>
    </div>
  );
}
