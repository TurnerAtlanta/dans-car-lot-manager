import { useState } from 'react';
import { X, Plus, TrendingUp, DollarSign, Calendar, User, CreditCard} from 'lucide-react';

interface Vehicle {
  id: number;
  stock: string;
  year: string;
  make: string;
  model: string;
  price: string;
  purchasePrice: string;
  status: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
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
  paymentMethod: 'Cash' | 'Finance' | 'Lease' | 'Trade-in';
  salesperson: string;
}

interface SalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  sales: Sale[];
  vehicles: Vehicle[];
  customers: Customer[];
  onAdd: (sale: Omit<Sale, 'id'>) => void;
}

export default function SalesModal({
  isOpen,
  onClose,
  sales,
  vehicles,
  customers,
  onAdd
}: SalesModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSale, setNewSale] = useState({
    date: new Date().toISOString().split('T')[0],
    customer: '',
    vehicle: '',
    stock: '',
    soldPrice: '',
    purchasePrice: '',
    profit: '',
    paymentMethod: 'Cash' as 'Cash' | 'Finance' | 'Lease' | 'Trade-in',
    salesperson: 'Dan'
  });

  if (!isOpen) return null;

  const availableVehicles = vehicles.filter(v => v.status === 'Available');

  const handleVehicleSelect = (stock: string) => {
    const vehicle = vehicles.find(v => v.stock === stock);
    if (vehicle) {
      setNewSale({
        ...newSale,
        stock: vehicle.stock,
        vehicle: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        purchasePrice: vehicle.purchasePrice
      });
    }
  };

  const handlePriceChange = (soldPrice: string) => {
    const sold = parseFloat(soldPrice.replace(/[$,]/g, '') || '0');
    const purchase = parseFloat(newSale.purchasePrice.replace(/[$,]/g, '') || '0');
    const profit = sold - purchase;
    
    setNewSale({
      ...newSale,
      soldPrice,
      profit: `$${profit.toLocaleString()}`
    });
  };

  const handleSubmit = () => {
    if (newSale.customer && newSale.vehicle && newSale.soldPrice) {
      onAdd(newSale);
      setNewSale({
        date: new Date().toISOString().split('T')[0],
        customer: '',
        vehicle: '',
        stock: '',
        soldPrice: '',
        purchasePrice: '',
        profit: '',
        paymentMethod: 'Cash',
        salesperson: 'Dan'
      });
      setShowAddForm(false);
    }
  };

  const totalRevenue = sales.reduce((sum, sale) => {
    return sum + parseFloat(sale.soldPrice?.replace(/[$,]/g, '') || '0');
  }, 0);

  const totalProfit = sales.reduce((sum, sale) => {
    return sum + parseFloat(sale.profit?.replace(/[$,]/g, '') || '0');
  }, 0);

  const avgProfit = sales.length > 0 ? totalProfit / sales.length : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Sales Tracking</h2>
            <p className="modal-subtitle">Record and analyze vehicle sales</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="stat-card-blue">
            <p className="stat-label text-blue-600">Total Sales</p>
            <p className="stat-value text-blue-900">{sales.length}</p>
          </div>
          <div className="stat-card-green">
            <p className="stat-label text-green-600">Revenue</p>
            <p className="stat-value text-green-900">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="stat-card-purple">
            <p className="stat-label text-purple-600">Avg Profit</p>
            <p className="stat-value text-purple-900">${avgProfit.toLocaleString()}</p>
          </div>
        </div>

        {/* Add Sale Button */}
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-success w-full mb-6"
          >
            <Plus size={18} />
            Record New Sale
          </button>
        )}

        {/* Add Sale Form */}
        {showAddForm && (
          <div className="card bg-green-50 mb-6">
            <h3 className="font-bold text-green-900 mb-4">Record New Sale</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="form-label">
                  <Calendar size={14} className="inline mr-1" />
                  Sale Date *
                </label>
                <input 
                  type="date"
                  value={newSale.date}
                  onChange={(e) => setNewSale({...newSale, date: e.target.value})}
                  className="input-field"
                />
              </div>

              {/* Customer */}
              <div>
                <label className="form-label">
                  <User size={14} className="inline mr-1" />
                  Customer *
                </label>
                <select
                  value={newSale.customer}
                  onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                  className="select-field"
                >
                  <option value="">Select Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Vehicle */}
              <div>
                <label className="form-label">
                  <TrendingUp size={14} className="inline mr-1" />
                  Vehicle *
                </label>
                <select
                  value={newSale.stock}
                  onChange={(e) => handleVehicleSelect(e.target.value)}
                  className="select-field"
                >
                  <option value="">Select Vehicle</option>
                  {availableVehicles.map(v => (
                    <option key={v.id} value={v.stock}>
                      {v.year} {v.make} {v.model} - {v.stock}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sold Price */}
              <div>
                <label className="form-label">
                  <DollarSign size={14} className="inline mr-1" />
                  Sold Price *
                </label>
                <input 
                  type="text"
                  placeholder="$25,000"
                  value={newSale.soldPrice}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Purchase Price (Auto-filled) */}
              <div>
                <label className="form-label">Purchase Cost</label>
                <input 
                  type="text"
                  value={newSale.purchasePrice}
                  readOnly
                  className="input-field bg-gray-100"
                />
              </div>

              {/* Profit (Auto-calculated) */}
              <div>
                <label className="form-label">Profit</label>
                <input 
                  type="text"
                  value={newSale.profit}
                  readOnly
                  className="input-field bg-gray-100 font-bold text-green-600"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="form-label">
                  <CreditCard size={14} className="inline mr-1" />
                  Payment Method
                </label>
                <select
                  value={newSale.paymentMethod}
                  onChange={(e) => setNewSale({...newSale, paymentMethod: e.target.value as any})}
                  className="select-field"
                >
                  <option value="Cash">Cash</option>
                  <option value="Finance">Finance</option>
                  <option value="Lease">Lease</option>
                  <option value="Trade-in">Trade-in</option>
                </select>
              </div>

              {/* Salesperson */}
              <div>
                <label className="form-label">Salesperson</label>
                <input 
                  type="text"
                  value={newSale.salesperson}
                  onChange={(e) => setNewSale({...newSale, salesperson: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={handleSubmit} className="btn-success flex-1">
                <Plus size={18} />
                Record Sale
              </button>
              <button onClick={() => setShowAddForm(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sales List */}
        <div>
          <h3 className="section-subheader">Recent Sales</h3>
          <div className="space-y-3">
            {sales.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💰</div>
                <h3 className="empty-state-title">No Sales Yet</h3>
                <p className="empty-state-description">
                  Record your first sale to start tracking revenue and profit.
                </p>
              </div>
            ) : (
              sales.slice().reverse().map(sale => (
                <div key={sale.id} className="card">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg">{sale.vehicle}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Stock: {sale.stock} • Sold: {sale.date}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-gray-600">Customer</p>
                          <p className="font-medium text-gray-800">{sale.customer}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Sold Price</p>
                          <p className="font-bold text-green-600">{sale.soldPrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Purchase Cost</p>
                          <p className="font-medium text-gray-700">{sale.purchasePrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Profit</p>
                          <p className="font-bold text-blue-600">{sale.profit}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <CreditCard size={14} className="text-gray-500" />
                          <span className="text-gray-600">Payment:</span>
                          <span className="font-medium">{sale.paymentMethod}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} className="text-gray-500" />
                          <span className="text-gray-600">By:</span>
                          <span className="font-medium">{sale.salesperson}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        parseFloat(sale.profit.replace(/[$,]/g, '')) > 3000 ? 'bg-green-100 text-green-700' :
                        parseFloat(sale.profit.replace(/[$,]/g, '')) > 1500 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {parseFloat(sale.profit.replace(/[$,]/g, '')) > 3000 ? 'Great Profit' :
                         parseFloat(sale.profit.replace(/[$,]/g, '')) > 1500 ? 'Good Profit' :
                         'Low Profit'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sales Insights */}
        {sales.length > 0 && (
          <div className="mt-6 card bg-blue-50">
            <h3 className="font-bold text-blue-900 mb-3">Sales Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Methods</p>
                <div className="space-y-1">
                  {['Cash', 'Finance', 'Lease', 'Trade-in'].map(method => {
                    const count = sales.filter(s => s.paymentMethod === method).length;
                    return count > 0 ? (
                      <div key={method} className="flex justify-between text-sm">
                        <span className="text-gray-700">{method}</span>
                        <span className="font-bold text-blue-600">{count}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Top Salesperson</p>
                <div className="text-2xl font-bold text-blue-900">
                  {sales[0]?.salesperson || 'N/A'}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {sales.filter(s => s.salesperson === sales[0]?.salesperson).length} sales
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
                <div className="text-2xl font-bold text-green-600">
                  {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}%
                </div>
                <p className="text-xs text-gray-600 mt-1">Average across all sales</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
