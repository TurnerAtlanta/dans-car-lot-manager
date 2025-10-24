import React from 'react';
import { useSales } from '../hooks/useSales';
import { useMaintenances } from '../hooks/useMaintenances';
import { calculateTotalSales, calculateTotalCosts } from '../utils/calculations';
import { exportToCSV } from '../utils/exportUtils';
import { Sale, Maintenance } from '../types';

const ScheduledReports: React.FC = () => {
  const { sales } = useSales();
  const { maintenances } = useMaintenances();

  const totalSales = calculateTotalSales(sales);
  const totalCosts = calculateTotalCosts(maintenances);

  const handleExportSales = () => {
    exportToCSV<Sale>(sales, 'sales_report.csv');
  };

  const handleExportMaintenance = () => {
    exportToCSV<Maintenance>(maintenances, 'maintenance_report.csv');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Financial Reports</h2>
      <p>Total Sales: ${totalSales}</p>
      <p>Total Maintenance Costs: ${totalCosts}</p>
      <button onClick={handleExportSales} className="bg-blue-500 text-white p-2 mr-2">Export Sales</button>
      <button onClick={handleExportMaintenance} className="bg-blue-500 text-white p-2">Export Maintenance</button>
    </div>
  );
};

export default ScheduledReports;
