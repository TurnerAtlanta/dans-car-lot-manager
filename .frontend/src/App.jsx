import React, { useState } from 'react';
import {
  Home,
  Car,
  Users,
  TrendingUp,
  Settings,
  Plus,
  Clock,
  CheckSquare,
  Wrench,
  DollarSign,
  Calendar,
  FileText,
  Bell,
  Search,
  Menu
} from 'lucide-react';

// Import all modals
import ExportModal from './components/modals/ExportModal';
import ScheduleModal from './components/modals/ScheduleModal';
import DMSModal from './components/modals/DMSModal';
import DMSGuideModal from './components/modals/DMSGuideModal';
import VehicleDetailModal from './components/modals/VehicleDetailModal';
import FollowUpModal from './components/modals/FollowUpModal';
import FinancialModal from './components/modals/FinancialModal';
import CustomerModal from './components/modals/CustomerModal';
import SalesModal from './components/modals/SalesModal';

import './App.css';

export default function App() {
  // Navigation state
  const [activeTab, setActiveTab] = useState('home');
  
  // Data state
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      stock: 'A-2024-001',
      year: '2021',
      make: 'Honda',
      model: 'Accord',
      price: '$22,500',
      purchasePrice: '$18,000',
      status: 'Available',
      daysInInventory: 12,
      photos: []
    }
  ]);
  
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Smith',
      phone: '(404) 555-0123',
      email: 'john@email.com',
      interest: '2021 Honda Accord',
      status: 'Hot Lead',
      added: '2025-11-01'
    }
  ]);
  
  const [sales, setSales] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  
  // Modal states
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [dmsModalOpen, setDmsModalOpen] = useState(false);
  const [dmsGuideModalOpen, setDmsGuideModalOpen] = useState(false);
  const [vehicleDetailModalOpen, setVehicleDetailModalOpen] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [financialModalOpen, setFinancialModalOpen] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [dmsConnected, setDmsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Handlers
  const handleAddSale = (newSale) => {
    setSales([...sales, { ...newSale, id: Date.now() }]);
    // Mark vehicle as sold
    setVehicles(vehicles.map(v => 
      v.stock === newSale.stock ? { ...v, status: 'Sold' } : v
    ));
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, { ...newCustomer, id: Date.now() }]);
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const handleAddFollowUp = (followUp) => {
    setFollowUps([...followUps, { ...followUp, id: Date.now(), completed: false }]);
  };

  const handleCompleteFollowUp = (id) => {
    setFollowUps(followUps.map(f => 
      f.id === id ? { ...f, completed: true } : f
    ));
  };

  const handleDeleteFollowUp = (id) => {
    setFollowUps(followUps.filter(f => f.id !== id));
  };

  const handlePhotoUpload = (vehicleId, photo) => {
    setVehicles(vehicles.map(v => 
      v.id === vehicleId 
        ? { ...v, photos: [...(v.photos || []), photo] }
        : v
    ));
  };

  const handleDmsSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('DMS sync completed successfully!');
    }, 2000);
  };

  const handleDmsDisconnect = () => {
    setDmsConnected(false);
    alert('Disconnected from DMS');
  };

  // Navigation tabs configuration
  const navigationTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'inventory', label: 'Inventory', icon: Car },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Render mobile header
  const renderHeader = () => (
    <header className="mobile-header">
      <div className="mobile-header-content">
        <button className="mobile-header-btn">
          <Menu size={24} />
        </button>
        <h1 className="mobile-header-title">Dan's Car Lot</h1>
        <div className="flex items-center gap-2">
          <button className="mobile-header-btn">
            <Search size={20} />
          </button>
          <button className="mobile-header-btn">
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  );

  // Render Home tab
  const renderHome = () => (
    <div className="mobile-content-area">
      <div className="mobile-section">
        <h2 className="mobile-section-title">Quick Stats</h2>
        <div className="mobile-stats-grid">
          <div className="mobile-stat-card bg-blue-500">
            <Car size={24} className="text-white" />
            <div>
              <p className="mobile-stat-value">{vehicles.filter(v => v.status === 'Available').length}</p>
              <p className="mobile-stat-label">Available</p>
            </div>
          </div>
          <div className="mobile-stat-card bg-green-500">
            <DollarSign size={24} className="text-white" />
            <div>
              <p className="mobile-stat-value">{sales.length}</p>
              <p className="mobile-stat-label">Sales</p>
            </div>
          </div>
          <div className="mobile-stat-card bg-purple-500">
            <Users size={24} className="text-white" />
            <div>
              <p className="mobile-stat-value">{customers.length}</p>
              <p className="mobile-stat-label">Leads</p>
            </div>
          </div>
          <div className="mobile-stat-card bg-orange-500">
            <Calendar size={24} className="text-white" />
            <div>
              <p className="mobile-stat-value">{followUps.filter(f => !f.completed).length}</p>
              <p className="mobile-stat-label">Follow-ups</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-section">
        <h2 className="mobile-section-title">Quick Actions</h2>
        <div className="mobile-action-grid">
          <button 
            onClick={() => setSalesModalOpen(true)}
            className="mobile-action-btn"
          >
            <DollarSign size={20} />
            <span>Record Sale</span>
          </button>
          <button 
            onClick={() => setCustomerModalOpen(true)}
            className="mobile-action-btn"
          >
            <Users size={20} />
            <span>Add Lead</span>
          </button>
          <button 
            onClick={() => setFollowUpModalOpen(true)}
            className="mobile-action-btn"
          >
            <Calendar size={20} />
            <span>Follow-ups</span>
          </button>
          <button 
            onClick={() => setFinancialModalOpen(true)}
            className="mobile-action-btn"
          >
            <TrendingUp size={20} />
            <span>Financials</span>
          </button>
        </div>
      </div>

      <div className="mobile-section">
        <h2 className="mobile-section-title">Recent Activity</h2>
        {sales.length === 0 && followUps.length === 0 ? (
          <div className="mobile-empty-state">
            <div className="mobile-empty-icon">📊</div>
            <h3 className="mobile-empty-title">No Recent Activity</h3>
            <p className="mobile-empty-description">
              Your recent sales and follow-ups will appear here
            </p>
          </div>
        ) : (
          <div className="mobile-activity-list">
            {sales.slice(-3).reverse().map(sale => (
              <div key={sale.id} className="mobile-activity-item">
                <div className="mobile-activity-icon bg-green-100">
                  <DollarSign size={16} className="text-green-600" />
                </div>
                <div className="mobile-activity-content">
                  <p className="mobile-activity-title">Sale: {sale.vehicle}</p>
                  <p className="mobile-activity-subtitle">{sale.customer} • {sale.soldPrice}</p>
                </div>
                <p className="mobile-activity-time">{sale.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Render Inventory tab
  const renderInventory = () => (
    <div className="mobile-content-area">
      <div className="mobile-section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="mobile-section-title">Available Vehicles</h2>
          <button className="mobile-filter-btn">
            <Settings size={18} />
            Filter
          </button>
        </div>

        {vehicles.filter(v => v.status === 'Available').length === 0 ? (
          <div className="mobile-empty-state">
            <div className="mobile-empty-icon">🚗</div>
            <h3 className="mobile-empty-title">No Vehicles</h3>
            <p className="mobile-empty-description">
              Add your first vehicle to get started
            </p>
          </div>
        ) : (
          <div className="mobile-vehicle-grid">
            {vehicles.filter(v => v.status === 'Available').map(vehicle => (
              <div 
                key={vehicle.id} 
                className="mobile-vehicle-card"
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  setVehicleDetailModalOpen(true);
                }}
              >
                <div className="mobile-vehicle-image">
                  <Car size={48} className="text-gray-400" />
                </div>
                <div className="mobile-vehicle-info">
                  <h3 className="mobile-vehicle-title">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="mobile-vehicle-stock">Stock: {vehicle.stock}</p>
                  <div className="mobile-vehicle-footer">
                    <p className="mobile-vehicle-price">{vehicle.price}</p>
                    <span className={`mobile-badge ${
                      vehicle.daysInInventory < 30 ? 'badge-green' :
                      vehicle.daysInInventory < 60 ? 'badge-yellow' :
                      'badge-red'
                    }`}>
                      {vehicle.daysInInventory}d
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Render Customers tab
  const renderCustomers = () => (
    <div className="mobile-content-area">
      <div className="mobile-section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="mobile-section-title">Active Leads</h2>
          <button 
            onClick={() => setCustomerModalOpen(true)}
            className="mobile-add-btn"
          >
            <Plus size={18} />
            Add Lead
          </button>
        </div>

        {customers.length === 0 ? (
          <div className="mobile-empty-state">
            <div className="mobile-empty-icon">👥</div>
            <h3 className="mobile-empty-title">No Leads Yet</h3>
            <p className="mobile-empty-description">
              Add your first customer lead to start tracking
            </p>
          </div>
        ) : (
          <div className="mobile-customer-list">
            {customers.map(customer => (
              <div key={customer.id} className="mobile-customer-card">
                <div className="mobile-customer-avatar">
                  {customer.name.charAt(0)}
                </div>
                <div className="mobile-customer-info">
                  <h3 className="mobile-customer-name">{customer.name}</h3>
                  <p className="mobile-customer-interest">{customer.interest}</p>
                  <p className="mobile-customer-phone">{customer.phone}</p>
                </div>
                <span className={`mobile-badge ${
                  customer.status === 'Hot Lead' ? 'badge-red' :
                  customer.status === 'Warm Lead' ? 'badge-yellow' :
                  'badge-gray'
                }`}>
                  {customer.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Render Reports tab
  const renderReports = () => (
    <div className="mobile-content-area">
      <div className="mobile-section">
        <h2 className="mobile-section-title">Financial Reports</h2>
        <div className="mobile-report-grid">
          <button 
            onClick={() => setFinancialModalOpen(true)}
            className="mobile-report-card"
          >
            <div className="mobile-report-icon bg-blue-100">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="mobile-report-title">Financial Dashboard</h3>
              <p className="mobile-report-description">View detailed financial analysis</p>
            </div>
          </button>

          <button 
            onClick={() => setSalesModalOpen(true)}
            className="mobile-report-card"
          >
            <div className="mobile-report-icon bg-green-100">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="mobile-report-title">Sales Report</h3>
              <p className="mobile-report-description">Track sales performance</p>
            </div>
          </button>

          <button 
            onClick={() => setExportModalOpen(true)}
            className="mobile-report-card"
          >
            <div className="mobile-report-icon bg-purple-100">
              <FileText size={24} className="text-purple-600" />
            </div>
            <div>
              <h3 className="mobile-report-title">Export Data</h3>
              <p className="mobile-report-description">Download reports</p>
            </div>
          </button>

          <button 
            onClick={() => setScheduleModalOpen(true)}
            className="mobile-report-card"
          >
            <div className="mobile-report-icon bg-orange-100">
              <Clock size={24} className="text-orange-600" />
            </div>
            <div>
              <h3 className="mobile-report-title">Schedule Reports</h3>
              <p className="mobile-report-description">Automate reporting</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  // Render Settings tab
  const renderSettings = () => (
    <div className="mobile-content-area">
      <div className="mobile-section">
        <h2 className="mobile-section-title">Integrations</h2>
        <div className="mobile-settings-list">
          <button 
            onClick={() => setDmsModalOpen(true)}
            className="mobile-settings-item"
          >
            <div className="mobile-settings-icon bg-blue-100">
              <Settings size={20} className="text-blue-600" />
            </div>
            <div className="mobile-settings-content">
              <h3 className="mobile-settings-title">DMS Integration</h3>
              <p className="mobile-settings-subtitle">
                {dmsConnected ? 'Connected' : 'Not connected'}
              </p>
            </div>
            <div className={`mobile-status-dot ${dmsConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
          </button>
        </div>
      </div>

      <div className="mobile-section">
        <h2 className="mobile-section-title">About</h2>
        <div className="mobile-about-card">
          <h3 className="font-bold text-lg text-gray-800">Dan's Car Lot Manager</h3>
          <p className="text-sm text-gray-600 mt-1">Version 1.0.0</p>
          <p className="text-sm text-gray-600 mt-4">
            Complete management system for car dealerships. Track inventory, manage customers,
            record sales, and monitor financial performance.
          </p>
        </div>
      </div>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHome();
      case 'inventory':
        return renderInventory();
      case 'customers':
        return renderCustomers();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      default:
        return renderHome();
    }
  };

  return (
    <div className="mobile-app">
      {renderHeader()}
      
      <main className="mobile-main">
        {renderContent()}
      </main>

      {/* Floating Action Button */}
      <button 
        className="mobile-fab"
        onClick={() => setSalesModalOpen(true)}
      >
        <Plus size={24} />
      </button>

      {/* Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        {navigationTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`mobile-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={24} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* All Modals */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        timeEntries={timeEntries}
        tasks={tasks}
        vehicles={vehicles}
        maintenanceRecords={maintenanceRecords}
        userRole="Owner"
      />

      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSchedule={(schedule) => console.log('Schedule:', schedule)}
      />

      <DMSModal
        isOpen={dmsModalOpen}
        onClose={() => setDmsModalOpen(false)}
        dmsConnected={dmsConnected}
        isSyncing={isSyncing}
        onSync={handleDmsSync}
        onDisconnect={handleDmsDisconnect}
        onShowGuide={() => {
          setDmsModalOpen(false);
          setDmsGuideModalOpen(true);
        }}
      />

      <DMSGuideModal
        isOpen={dmsGuideModalOpen}
        onClose={() => setDmsGuideModalOpen(false)}
      />

      <VehicleDetailModal
        isOpen={vehicleDetailModalOpen}
        onClose={() => {
          setVehicleDetailModalOpen(false);
          setSelectedVehicle(null);
        }}
        vehicle={selectedVehicle}
        onPhotoUpload={handlePhotoUpload}
      />

      <FollowUpModal
        isOpen={followUpModalOpen}
        onClose={() => setFollowUpModalOpen(false)}
        followUps={followUps}
        vehicles={vehicles}
        onAdd={handleAddFollowUp}
        onComplete={handleCompleteFollowUp}
        onDelete={handleDeleteFollowUp}
      />

      <FinancialModal
        isOpen={financialModalOpen}
        onClose={() => setFinancialModalOpen(false)}
        vehicles={vehicles}
        maintenanceRecords={maintenanceRecords}
        sales={sales}
      />

      <CustomerModal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        customers={customers}
        vehicles={vehicles}
        onAdd={handleAddCustomer}
        onDelete={handleDeleteCustomer}
      />

      <SalesModal
        isOpen={salesModalOpen}
        onClose={() => setSalesModalOpen(false)}
        sales={sales}
        vehicles={vehicles}
        customers={customers}
        onAdd={handleAddSale}
      />
    </div>
  );
}
