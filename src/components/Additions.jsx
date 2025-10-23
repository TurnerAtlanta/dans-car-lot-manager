import React from 'react';
import { Car, DollarSign, TrendingUp, Calendar, Phone, Mail, Clock } from 'lucide-react';

// Vehicle Quick Stats Component
export function VehicleQuickStats({ vehicle }) {
  const daysInInventory = Math.floor((new Date() - new Date(vehicle.dateAdded || new Date())) / (1000 * 60 * 60 * 24));

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

// Customer Contact Card Component
export function CustomerContactCard({ customer, onCall, onEmail }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-gray-800">{customer.name}</h4>
          <span className={
            customer.status === 'Hot Lead' ? 'lead-hot' :
            customer.status === 'Warm Lead' ? 'lead-warm' :
            'lead-cold'
          }>
            {customer.status}
          </span>
        </div>
        <div className="text-right text-xs text-gray-500">
          Last contact: {customer.lastContact}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        {customer.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} />
            <span>{customer.phone}</span>
          </div>
        )}
        {customer.email && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} />
            <span>{customer.email}</span>
          </div>
        )}
        {customer.vehicleInterest && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Car size={14} />
            <span>Interest: {customer.vehicleInterest}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <button onClick={() => onCall(customer)} className="btn-primary btn-sm flex-1">
          <Phone size={14} />
          Call
        </button>
        <button onClick={() => onEmail(customer)} className="btn-secondary btn-sm flex-1">
          <Mail size={14} />
          Email
        </button>
      </div>
    </div>
  );
}

// Profit Indicator Component
export function ProfitIndicator({ profit, margin }) {
  const isPositive = profit > 0;
  const marginPercent = parseFloat(margin);

  let color = 'text-red-600';
  if (marginPercent > 15) color = 'text-green-600';
  else if (marginPercent > 8) color = 'text-yellow-600';

  return (
    <div className="flex items-center gap-2">
      <TrendingUp size={16} className={color} />
      <span className={`font-bold ${color}`}>
        ${Math.abs(profit).toLocaleString()}
      </span>
      <span className={`text-sm ${color}`}>
        ({margin}%)
      </span>
    </div>
  );
}

// Daily Summary Widget
export function DailySummaryWidget({ timeEntries, tasks, followUps }) {
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const dueFollowUps = followUps.filter(f =>
    f.status === 'pending' && new Date(f.dueDate) <= new Date()
  ).length;

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-indigo-100">
      <h3 className="font-bold text-gray-800 mb-3">Today's Summary</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{timeEntries.length}</div>
          <div className="text-xs text-gray-600">Activities Logged</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
          <div className="text-xs text-gray-600">Tasks Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{dueFollowUps}</div>
          <div className="text-xs text-gray-600">Follow-ups Due</div>
        </div>
      </div>
    </div>
  );
}

// Vehicle Comparison Card
export function VehicleComparisonCard({ vehicles }) {
  if (vehicles.length < 2) return null;

  return (
    <div className="card">
      <h3 className="font-bold text-gray-800 mb-3">Compare Vehicles</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Vehicle</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Cost</th>
              <th className="text-right py-2">Profit</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(v => {
              const cost = parseFloat(v.purchasePrice.replace(/[$,]/g, '')) +
                parseFloat(v.reconCost.replace(/[$,]/g, ''));
              const price = parseFloat(v.price.replace(/[$,]/g, ''));
              const profit = price - cost;

              return (
                <tr key={v.id} className="border-b">
                  <td className="py-2">{v.year} {v.make} {v.model}</td>
                  <td className="text-right py-2">{v.price}</td>
                  <td className="text-right py-2">${cost.toLocaleString()}</td>
                  <td className={`text-right py-2 ${profit > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                    ${profit.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Activity Timeline Component
export function ActivityTimeline({ entries }) {
  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div key={entry.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            {index < entries.length - 1 && (
              <div className="w-0.5 h-full bg-blue-200 flex-1 mt-1"></div>
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-800">{entry.time}</span>
              <span className="text-xs text-gray-500">• {entry.duration}</span>
            </div>
            <p className="text-sm text-gray-600">{entry.activity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Inventory Age Badge
export function InventoryAgeBadge({ daysInInventory }) {
  let className = 'badge-green';
  let text = 'Fresh';

  if (daysInInventory > 60) {
    className = 'badge-red';
    text = 'Aging';
  } else if (daysInInventory > 30) {
    className = 'badge-yellow';
    text = 'Moderate';
  }

  return (
    <span className={className}>
      {text} ({daysInInventory}d)
    </span>
  );
}

// Quick Action Menu
export function QuickActionMenu({ onTimeLog, onAddTask, onAddFollowUp, onAddCustomer }) {
  return (
    <div className="card bg-gradient-to-br from-purple-50 to-pink-100">
      <h3 className="font-bold text-gray-800 mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onTimeLog} className="btn-primary btn-sm">
          <Clock size={14} />
          Log Time
        </button>
        <button onClick={onAddTask} className="btn-purple btn-sm">
          Add Task
        </button>
        <button onClick={onAddFollowUp} className="btn-warning btn-sm">
          Schedule Follow-up
        </button>
        <button onClick={onAddCustomer} className="btn-pink btn-sm">
          Add Customer
        </button>
      </div>
    </div>
  );
}

// Performance Metrics Dashboard
export function PerformanceMetrics({ sales, vehicles, customers }) {
  const totalRevenue = sales.reduce((sum, s) =>
    sum + parseFloat(s.soldPrice.replace(/[$,]/g, '')), 0
  );

  const totalProfit = sales.reduce((sum, s) =>
    sum + parseFloat(s.profit.replace(/[$,]/g, '')), 0
  );

  const avgDaysToSell = sales.length > 0 ?
    Math.floor(sales.reduce((sum, s) => sum + (s.daysToSell || 30), 0) / sales.length) : 0;

  const conversionRate = customers.length > 0 ?
    ((sales.length / customers.length) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="stat-card-blue">
        <p className="stat-label text-blue-600">Total Revenue</p>
        <p className="stat-value text-blue-900">${totalRevenue.toLocaleString()}</p>
      </div>

      <div className="stat-card-green">
        <p className="stat-label text-green-600">Total Profit</p>
        <p className="stat-value text-green-900">${totalProfit.toLocaleString()}</p>
      </div>
      
      <div className="stat-card-purple">
        <p className="stat-label text-purple-600">Avg Days to Sell</p>
        <p className="stat-value text-purple-900">{avgDaysToSell}</p>
      </
