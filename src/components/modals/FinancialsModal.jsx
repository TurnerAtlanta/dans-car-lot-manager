import React from 'react';
import { X } from 'lucide-react';

export default function FinancialModal({ isOpen, onClose, vehicles }) {
  if (!isOpen) return null;

  const calculateVehicleProfit = (vehicle) => {
    const price = parseFloat(vehicle.price.replace(/[$,]/g, ''));
    const purchase = parseFloat(vehicle.purchasePrice.replace(/[$,]/g, ''));
    const recon = parseFloat(vehicle.reconCost.replace(/[$,]/g, ''));
    const maintenanceCosts = vehicle.maintenanceHistory.reduce((sum, record) => {
      return sum + (record.cost ? parseFloat(record.cost.replace(/[$,]/g, '')) : 0);
    }, 0);

    const totalCost = purchase + recon + maintenanceCosts;
    const projectedProfit = price - totalCost;

    return {
      listPrice: price,
      totalCost: totalCost,
      projectedProfit: projectedProfit,
      profitMargin: ((projectedProfit / price) * 100).toFixed(1)
    };
  };

  const getInventoryStats = () => {
    const available = vehicles.filter(v => v.status === 'Available').length;
    const inService = vehicles.filter(v => v.status === 'In Service').length;
    const totalInvestment = vehicles.reduce((sum, v) => {
      return sum + parseFloat(v.purchasePrice.replace(/[$,]/g, '')) + parseFloat(v.reconCost.replace(/[$,]/g, ''));
    }, 0);
    const totalValue = vehicles.reduce((sum, v) => sum + parseFloat(v.price.replace(/[$,]/g, '')), 0);
    const projectedProfit = totalValue - totalInvestment;

    return { available, inService, totalInvestment, totalValue, projectedProfit };
  };

  const stats = getInventoryStats();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-6xl" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Financial Reports</h2>
            <p className="modal-subtitle">Income and costs per vehicle</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Inventory Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="stat-card-blue">
            <p className="stat-label text-blue-600">Total Inventory</p>
            <p className="stat-value-lg text-blue-900">{vehicles.length}</p>
          </div>
          <div className="stat-card-green">
            <p className="stat-label text-green-600">Available</p>
            <p className="stat-value-lg text-green-900">{stats.available}</p>
          </div>
          <div className="stat-card-orange">
            <p className="stat-label text-orange-600">In Service</p>
            <p className="stat-value-lg text-orange-900">{stats.inService}</p>
          </div>
          <div className="stat-card-purple">
            <p className="stat-label text-purple-600">Total Investment</p>
            <p className="stat-value text-purple-900">${stats.totalInvestment.toLocaleString()}</p>
          </div>
          <div className="stat-card-emerald">
            <p className="stat-label text-emerald-600">Projected Profit</p>
            <p className="stat-value text-emerald-900">${stats.projectedProfit.toLocaleString()}</p>
          </div>
        </div>

        {/* Per Vehicle Breakdown */}
        <div>
          <h3 className="section-subheader">Per Vehicle Financial Breakdown</h3>
          <div className="space-y-4">
            {vehicles.map(vehicle => {
              const financials = calculateVehicleProfit(vehicle);
              return (
                <div key={vehicle.id} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h4>
                      <p className="text-sm text-gray-600">Stock: {vehicle.stock}</p>
                      <span className={vehicle.status === 'Available' ? 'vehicle-status-available' : 'vehicle-status-service'}>
                        {vehicle.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Profit Margin</p>
                      <p className={`text-2xl font-bold ${
                        parseFloat(financials.profitMargin) > 15 ? 'text-green-600' :
                        parseFloat(financials.profitMargin) > 8 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {financials.profitMargin}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">List Price</p>
                      <p className="font-bold text-gray-800">{vehicle.price}</p>
                    </div>
                    <div className="bg-red-50 rounded p-3">
                      <p className="text-xs text-red-600 mb-1">Purchase Cost</p>
                      <p className="font-bold text-red-800">{vehicle.purchasePrice}</p>
                    </div>
                    <div className="bg-orange-50 rounded p-3">
                      <p className="text-xs text-orange-600 mb-1">Recon Cost</p>
                      <p className="font-bold text-orange-800">{vehicle.reconCost}</p>
                    </div>
                    <div className="bg-yellow-50 rounded p-3">
                      <p className="text-xs text-yellow-600 mb-1">Maintenance</p>
                      <p className="font-bold text-yellow-800">
                        ${vehicle.maintenanceHistory.reduce((sum, r) =>
                          sum + (r.cost ? parseFloat(r.cost.replace(/[$,]/g, '')) : 0), 0
                        ).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
