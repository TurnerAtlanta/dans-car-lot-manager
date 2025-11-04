import { useState } from 'react';
import { X, DollarSign, TrendingUp, PieChart, Calendar, Wrench, Car, AlertCircle } from 'lucide-react';

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
}

interface MaintenanceRecord {
  id: number;
  stock: string;
  date: string;
  serviceType: string;
  cost: number | string;
  description?: string;
}

interface Sale {
  id: number;
  date: string;
  customer: string;
  vehicle: string;
  stock: string;
  soldPrice: string;
  purchasePrice: string;
  profit: string;
  paymentMethod: string;
  salesperson: string;
}

interface FinancialModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  maintenanceRecords?: MaintenanceRecord[];
  sales?: Sale[];
}

export default function FinancialModal({
  isOpen,
  onClose,
  vehicles,
  maintenanceRecords = [],
  sales = []
}: FinancialModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  // Calculate maintenance costs by vehicle
  const maintenanceCostsByVehicle = vehicles.map(vehicle => {
    const records = maintenanceRecords.filter(r => r.stock === vehicle.stock);
    const totalCost = records.reduce((sum, r) => sum + parseFloat(r.cost?.toString().replace(/[$,]/g, '') || '0'), 0);
    return {
      stock: vehicle.stock,
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      description: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      totalCost,
      recordCount: records.length,
      records,
      purchasePrice: parseFloat(vehicle.purchasePrice?.toString().replace(/[$,]/g, '') || '0')
    };
  });

  // Calculate financial summary for sold vehicles
  const financialSummary = sales.map(sale => {
    const maintenance = maintenanceCostsByVehicle.find(m => m.stock === sale.stock);
    const maintenanceCost = maintenance ? maintenance.totalCost : 0;
    const purchasePrice = parseFloat(sale.purchasePrice?.toString().replace(/[$,]/g, '') || '0');
    const soldPrice = parseFloat(sale.soldPrice?.toString().replace(/[$,]/g, '') || '0');
    const grossProfit = soldPrice - purchasePrice;
    const netProfit = grossProfit - maintenanceCost;
    const roi = purchasePrice > 0 ? ((netProfit / purchasePrice) * 100) : 0;
    const profitMargin = soldPrice > 0 ? ((netProfit / soldPrice) * 100) : 0;
    
    return { 
      ...sale, 
      maintenanceCost, 
      grossProfit,
      netProfit, 
      roi,
      profitMargin
    };
  });

  // Calculate inventory costs (unsold vehicles)
  const inventoryCosts = vehicles
    .filter(v => !sales.some(s => s.stock === v.stock))
    .map(vehicle => {
      const maintenance = maintenanceCostsByVehicle.find(m => m.stock === vehicle.stock);
      const maintenanceCost = maintenance ? maintenance.totalCost : 0;
      const purchasePrice = parseFloat(vehicle.purchasePrice?.toString().replace(/[$,]/g, '') || '0');
      const listPrice = parseFloat(vehicle.price?.toString().replace(/[$,]/g, '') || '0');
      const totalInvested = purchasePrice + maintenanceCost;
      const potentialProfit = listPrice - totalInvested;
      
      return {
        stock: vehicle.stock,
        description: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        purchasePrice,
        maintenanceCost,
        totalInvested,
        listPrice,
        potentialProfit,
        daysInInventory: vehicle.daysInInventory || 0
      };
    });

  // Overall statistics
  const totalRevenue = financialSummary.reduce((sum, f) => sum + parseFloat(f.soldPrice?.toString().replace(/[$,]/g, '') || '0'), 0);
  const totalPurchaseCost = financialSummary.reduce((sum, f) => sum + parseFloat(f.purchasePrice?.toString().replace(/[$,]/g, '') || '0'), 0);
  const totalMaintenanceCost = maintenanceCostsByVehicle.reduce((sum, m) => sum + m.totalCost, 0);
  const totalGrossProfit = financialSummary.reduce((sum, f) => sum + f.grossProfit, 0);
  const totalNetProfit = financialSummary.reduce((sum, f) => sum + f.netProfit, 0);
  const avgROI = financialSummary.length > 0 
    ? financialSummary.reduce((sum, f) => sum + f.roi, 0) / financialSummary.length 
    : 0;
  const totalInventoryInvestment = inventoryCosts.reduce((sum, i) => sum + i.totalInvested, 0);
  const totalPotentialProfit = inventoryCosts.reduce((sum, i) => sum + i.potentialProfit, 0);

  // Maintenance breakdown by service type
  const maintenanceByType = maintenanceRecords.reduce((acc: Record<string, { count: number; total: number }>, record) => {
    const type = record.serviceType || 'Other';
    const cost = parseFloat(record.cost?.toString().replace(/[$,]/g, '') || '0');
    if (!acc[type]) {
      acc[type] = { count: 0, total: 0 };
    }
    acc[type].count++;
    acc[type].total += cost;
    return acc;
  }, {});

  // Monthly maintenance trends
  const monthlyMaintenance = maintenanceRecords.reduce((acc: Record<string, number>, record) => {
    const month = record.date ? new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Unknown';
    const cost = parseFloat(record.cost?.toString().replace(/[$,]/g, '') || '0');
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += cost;
    return acc;
  }, {});

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-7xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Financial Dashboard</h2>
            <p className="modal-subtitle">Complete financial analysis and profitability tracking</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('sold')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'sold' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sold Vehicles
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'inventory' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Inventory Costs
          </button>
          <button 
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'maintenance' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Maintenance Analysis
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat-card-green">
                <div className="flex items-center justify-between mb-2">
                  <p className="stat-label text-green-600">Total Revenue</p>
                  <DollarSign size={20} className="text-green-600" />
                </div>
                <p className="stat-value text-green-900">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">{sales.length} vehicles sold</p>
              </div>

              <div className="stat-card-blue">
                <div className="flex items-center justify-between mb-2">
                  <p className="stat-label text-blue-600">Net Profit</p>
                  <TrendingUp size={20} className="text-blue-600" />
                </div>
                <p className="stat-value text-blue-900">${totalNetProfit.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">After all costs</p>
              </div>

              <div className="stat-card-purple">
                <div className="flex items-center justify-between mb-2">
                  <p className="stat-label text-purple-600">Avg ROI</p>
                  <PieChart size={20} className="text-purple-600" />
                </div>
                <p className="stat-value text-purple-900">{avgROI.toFixed(1)}%</p>
                <p className="text-xs text-purple-600 mt-1">Return on investment</p>
              </div>

              <div className="stat-card-orange">
                <div className="flex items-center justify-between mb-2">
                  <p className="stat-label text-orange-600">Maintenance Costs</p>
                  <Wrench size={20} className="text-orange-600" />
                </div>
                <p className="stat-value text-orange-900">${totalMaintenanceCost.toLocaleString()}</p>
                <p className="text-xs text-orange-600 mt-1">{maintenanceRecords.length} services</p>
              </div>
            </div>

            {/* Profit Breakdown */}
            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign size={18} className="text-blue-600" />
                Profit Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Purchase Costs</p>
                  <p className="text-2xl font-bold text-gray-700">${totalPurchaseCost.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Initial investment</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Gross Profit</p>
                  <p className="text-2xl font-bold text-green-600">${totalGrossProfit.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Revenue - Purchase Cost</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold text-orange-600">${totalMaintenanceCost.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Maintenance & Repairs</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Net Profit</p>
                  <p className="text-2xl font-bold text-blue-600">${totalNetProfit.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">After All Costs</p>
                </div>
              </div>
              
              {/* Overall Profit Margin */}
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Overall Profit Margin</span>
                  <span className="text-xl font-bold text-purple-600">
                    {totalRevenue > 0 ? ((totalNetProfit / totalRevenue) * 100).toFixed(1) : '0'}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Net Profit / Total Revenue = Profit Margin
                </p>
              </div>
            </div>

            {/* Inventory Investment */}
            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Car size={18} className="text-purple-600" />
                Current Inventory Investment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Vehicles in Stock</p>
                  <p className="text-2xl font-bold text-gray-800">{inventoryCosts.length}</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Invested</p>
                  <p className="text-2xl font-bold text-yellow-600">${totalInventoryInvestment.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Purchase + Maintenance</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Potential Profit</p>
                  <p className="text-2xl font-bold text-emerald-600">${totalPotentialProfit.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">At current list prices</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sold Vehicles Tab */}
        {activeTab === 'sold' && (
          <div className="space-y-4">
            <div className="alert-info mb-4">
              <AlertCircle size={16} />
              <p className="text-sm">
                <strong>Net Profit Analysis:</strong> Shows profit after deducting purchase cost AND maintenance expenses for each sold vehicle.
              </p>
            </div>

            {financialSummary.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💰</div>
                <h3 className="empty-state-title">No Sales Data</h3>
                <p className="empty-state-description">
                  Record your first sale to see detailed financial analysis.
                </p>
              </div>
            ) : (
              financialSummary.map(item => (
                <div key={item.id} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{item.vehicle}</h4>
                      <p className="text-sm text-gray-600">Stock: {item.stock} • Sold: {item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Profit Margin</p>
                      <p className={`text-2xl font-bold ${
                        item.profitMargin > 15 ? 'text-green-600' :
                        item.profitMargin > 8 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {item.profitMargin.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600">Sold Price</p>
                      <p className="font-bold text-green-600">{item.soldPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Purchase Cost</p>
                      <p className="font-medium text-gray-700">{item.purchasePrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Maintenance</p>
                      <p className="font-medium text-orange-600">${item.maintenanceCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Gross Profit</p>
                      <p className="font-bold text-blue-600">${item.grossProfit.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Net Profit</p>
                      <p className={`font-bold ${item.netProfit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        ${item.netProfit.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} className="text-purple-600" />
                      <span className="text-gray-600">ROI:</span>
                      <span className="font-bold text-purple-600">{item.roi.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wrench size={14} className="text-orange-600" />
                      <span className="text-gray-600">Maintenance Impact:</span>
                      <span className="font-medium text-orange-600">
                        {item.maintenanceCost > 0 ? `-${((item.maintenanceCost / item.grossProfit) * 100).toFixed(1)}%` : '0%'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Inventory Costs Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="alert-info mb-4">
              <AlertCircle size={16} />
              <p className="text-sm">
                <strong>Total Investment:</strong> Shows purchase cost plus accumulated maintenance for each vehicle in stock.
              </p>
            </div>

            {inventoryCosts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🚗</div>
                <h3 className="empty-state-title">No Inventory</h3>
                <p className="empty-state-description">
                  All vehicles have been sold. Add new inventory to see investment analysis.
                </p>
              </div>
            ) : (
              inventoryCosts.map(item => (
                <div key={item.stock} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{item.description}</h4>
                      <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Days in Stock</p>
                      <p className={`text-xl font-bold ${
                        item.daysInInventory < 30 ? 'text-green-600' :
                        item.daysInInventory < 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {item.daysInInventory}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600">List Price</p>
                      <p className="font-bold text-blue-600">${item.listPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Purchase Cost</p>
                      <p className="font-medium text-gray-700">${item.purchasePrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Maintenance</p>
                      <p className="font-medium text-orange-600">${item.maintenanceCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total Invested</p>
                      <p className="font-bold text-purple-600">${item.totalInvested.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Potential Profit</p>
                      <p className={`font-bold ${item.potentialProfit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        ${item.potentialProfit.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {item.potentialProfit < 0 && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-600" />
                      <p className="text-sm text-red-600">
                        <strong>Warning:</strong> Total investment exceeds list price. Consider repricing or additional value-adds.
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Maintenance Analysis Tab */}
        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            {/* Maintenance by Service Type */}
            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wrench size={18} className="text-orange-600" />
                Maintenance Breakdown by Service Type
              </h3>
              {Object.keys(maintenanceByType).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No maintenance records found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(maintenanceByType).map(([type, data]) => (
                    <div key={type} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">{type}</p>
                      <p className="text-2xl font-bold text-orange-600">${data.total.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 mt-1">{data.count} service{data.count !== 1 ? 's' : ''}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Monthly Maintenance Trends */}
            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                Monthly Maintenance Costs
              </h3>
              {Object.keys(monthlyMaintenance).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No monthly data available</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(monthlyMaintenance)
                    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                    .map(([month, cost]) => (
                      <div key={month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">{month}</span>
                        <span className="text-lg font-bold text-blue-600">${cost.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Maintenance Cost by Vehicle */}
            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Car size={18} className="text-purple-600" />
                Maintenance Cost by Vehicle
              </h3>
              {maintenanceCostsByVehicle.filter(v => v.totalCost > 0).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No maintenance costs recorded</p>
              ) : (
                <div className="space-y-3">
                  {maintenanceCostsByVehicle
                    .filter(v => v.totalCost > 0)
                    .sort((a, b) => b.totalCost - a.totalCost)
                    .map(vehicle => (
                      <div key={vehicle.stock} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-800">{vehicle.description}</h4>
                            <p className="text-sm text-gray-600">Stock: {vehicle.stock}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Total Maintenance</p>
                            <p className="text-xl font-bold text-orange-600">${vehicle.totalCost.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{vehicle.recordCount} service{vehicle.recordCount !== 1 ? 's' : ''}</span>
                          <span>•</span>
                          <span>
                            {vehicle.purchasePrice > 0 
                              ? `${((vehicle.totalCost / vehicle.purchasePrice) * 100).toFixed(1)}% of purchase price`
                              : 'N/A'}
                          </span>
                        </div>
                        
                        {/* Individual maintenance records */}
                        {vehicle.records.length > 0 && (
                          <div className="mt-3 space-y-1">
                            {vehicle.records.map((record, idx) => (
                              <div key={idx} className="flex justify-between text-sm p-2 bg-white rounded">
                                <span className="text-gray-700">{record.serviceType || 'Service'}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500">{record.date}</span>
                                  <span className="font-medium text-orange-600">
                                    ${parseFloat(record.cost?.toString().replace(/[$,]/g, '') || '0').toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Average Maintenance Cost */}
            <div className="card bg-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Average Maintenance Cost per Vehicle</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ${vehicles.length > 0 ? (totalMaintenanceCost / vehicles.length).toLocaleString() : '0'}
                  </p>
                </div>
                <TrendingUp size={32} className="text-blue-400" />
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-6 alert-success">
          <p className="text-sm">
            <strong>💡 Financial Tip:</strong> Monitor net profit margins closely. Factor in all costs including maintenance when pricing vehicles. 
            Aim for 15%+ profit margins and track ROI to identify your most profitable vehicle types.
          </p>
        </div>
      </div>
    </div>
  );
}
