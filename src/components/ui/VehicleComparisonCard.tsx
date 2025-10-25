import React from 'react';
import { Vehicle } from '../../types';
import { calculateTotalCost, calculateProfitMargin } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

interface VehicleComparisonCardProps {
  vehicles: Vehicle[];
}

const VehicleComparisonCard: React.FC<VehicleComparisonCardProps> = ({ vehicles }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h4 className="font-bold mb-2">Vehicle Comparison</h4>
      <table className="w-full border">
        <thead>
          <tr><th>Vehicle</th><th>Price</th><th>Total Cost</th><th>Profit Margin</th></tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td>{`${v.year} ${v.make} ${v.model}`}</td>
              <td>{formatCurrency(v.price)}</td>
              <td>{formatCurrency(calculateTotalCost(v))}</td>
              <td>{formatPercentage(calculateProfitMargin(v.price, calculateTotalCost(v)))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleComparisonCard;
