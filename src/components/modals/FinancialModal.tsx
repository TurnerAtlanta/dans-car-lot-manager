import React from 'react';
import { useVehicles, useMaintenances } from '../../hooks';
import { Vehicle, Maintenance } from '../../types';
import { calculateTotalCost, calculateProfitMargin, getInventoryStats } from '../../utils/calculations';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface FinancialModalProps {
  onClose: () => void;
}

const FinancialModal: React.FC<FinancialModalProps> = ({ onClose }) => {
  const { vehicles } = useVehicles();
  const { maintenances } = useMaintenances();
  const { totalInvestment, availableCount, inServiceCount, projectedProfit } = getInventoryStats(vehicles, maintenances);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-h-[80vh] overflow-y-auto w-full max-w-lg">
        <h3 className="text-lg font-bold mb-2">Financial Summary</h3>
        <div className="mb-4">
          <p>Total Inventory: {vehicles.length}</p>
          <p>Available: {availableCount}</p>
          <p>In Service: {inServiceCount}</p>
          <p>Total Investment: {formatCurrency(totalInvestment)}</p>
          <p>Projected Profit: {formatCurrency(projectedProfit)}</p>
        </div>
        <table className="w-full border">
          <thead>
            <tr><th>Vehicle</th><th>List Price</th><th>Total Cost</th><th>Profit Margin</th></tr>
          </thead>
          <tbody>
            {vehicles.map((v: Vehicle) => {
              const totalCost = calculateTotalCost(v);
              const margin = calculateProfitMargin(v.price, totalCost);
              return (
                <tr key={v.id}>
                  <td>{`${v.year} ${v.make} ${v.model}`}</td>
                  <td>{formatCurrency(v.price)}</td>
                  <td>{formatCurrency(totalCost)}</td>
                  <td className={margin > 15 ? 'text-green-500' : margin >= 8 ? 'text-yellow-500' : 'text-red-500'}>
                    {formatPercentage(margin)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-4">
          <p className="text-sm">Guide: Green (>15%), Yellow (8-15%), Red (<8%)</p>
        </div>
        <button onClick={onClose} className="bg-red-500 text-white p-2 mt-4">Close</button>
      </div>
    </div>
  );
};

export default FinancialModal;
