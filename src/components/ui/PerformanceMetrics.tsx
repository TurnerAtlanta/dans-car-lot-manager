import React from 'react';
import { useSales, useVehicles } from '../../hooks';
import { calculateAverageDaysToSell } from '../../utils/calculations';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const PerformanceMetrics: React.FC = () => {
  const { sales } = useSales();
  const { vehicles } = useVehicles();
  const totalRevenue = sales.reduce((sum, s) => sum + s.salePrice, 0);
  const totalProfit = sales.reduce((sum, s) => sum + (s.salePrice - s.purchasePrice), 0);
  const averageDaysToSell = calculateAverageDaysToSell(sales, vehicles);
  const conversionRate = sales.length / (vehicles.length || 1) * 100;

  return (
    <div className="p-4 bg-white shadow-md rounded-md grid grid-cols-2 md:grid-cols-4 gap-2">
      <div>
        <p className="font-bold">Total Revenue</p>
        <p>{formatCurrency(totalRevenue)}</p>
      </div>
      <div>
        <p className="font-bold">Total Profit</p>
        <p>{formatCurrency(totalProfit)}</p>
      </div>
      <div>
        <p className="font-bold">Avg Days to Sell</p>
        <p>{averageDaysToSell.toFixed(1)}</p>
      </div>
      <div>
        <p className="font-bold">Conversion Rate</p>
        <p>{formatPercentage(conversionRate)}</p>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
