import React, { useState } from 'react';
import {
  Home,
  Car,
  Users,
  TrendingUp,
  Settings,
  Plus,
  Clock,
  Pause,
  Play,
  DollarSign,
  Calendar,
  FileText,
  Bell,
  Menu,
  Wrench
  
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
import TimeLogModal from './components/modals/TimeLogModal';
import MaintenanceModal from './components/modals/MaintenanceModal';
import AppointmentScheduler from './components/shared/AppointmentScheduler';
import { useTimeEntries } from './hooks/useTimeEntries';

// Import shared components
import {
  DailySummaryWidget,
  QuickActionMenu,
  InventoryAgeBadge,
  PerformanceMetrics,
  CustomerContactCard
} from './components/shared';

import './App.css';

// Type definitions
interface Vehicle {
  id: number;
  stock: string;
  year: string;
  make: string;
  model: string;
  price: string;
  purchasePrice: string;
  status: 'Available' | 'Sold' | 'Pending';
  daysInInventory: number;
  photos?: string[];
  mileage?: number;
  reconCost?: string;
  dateAdded?: string;
}

interface Appointment {
  id: number;
  type: 'test_drive' | 'service' | 'consultation';
  date: string;
  time: string;
  customerId: number;
  customerName?: string;
  vehicleId?: number;
  vehicleDescription?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  status: 'Hot Lead' | 'Warm Lead' | 'Cold Lead' | 'New Lead';
  added: string;
  lastContact?: string;
  vehicleInterest?: string;
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
  daysToSell?: number;
}

interface MaintenanceRecord {
  id: number;
  stock: string;
  date: string;
  serviceType: string;
  cost: number | string;
  description?: string;
}

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface FollowUp {
  id: number;
  customer: string;
  vehicle: string;
  date: string;
  notes: string;
  completed: boolean;
}

interface NavigationTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([
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
      photos: [],
      mileage: 45000,
      reconCost: '$1,200',
      dateAdded: '2024-10-20'
    }
  ]);
  
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'John Smith',
      phone: '(404) 555-0123',
      email: 'john@email.com',
      interest: '2021 Honda Accord',
      status: 'Hot Lead',
      added: '2025-11-01',
      lastContact: '2025-11-02',
      vehicleInterest: '2021 Honda Accord'
    }
  ]);
  
  const [sales, setSales] = useState<Sale[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [tasks] = useState<Task[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const { 
    timeEntries,
    activeEntry,
    clockIn,
    clockOut,
    addManualEntry,
    deleteEntry,
    getTodayHours,
    getWeekHours
  } = useTimeEntries();
  
  const [timeLogModalOpen, setTimeLogModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [dmsModalOpen, setDmsModalOpen] = useState(false);
  const [dmsGuideModalOpen, setDmsGuideModalOpen] = useState(false);
  const [vehicleDetailModalOpen, setVehicleDetailModalOpen] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [financialModalOpen, setFinancialModalOpen] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [dmsConnected, setDmsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Handlers
  const handleCallCustomer = (customer: Customer) => {
    window.location.href = `tel:${customer.phone}`;
  };

  const handleEmailCustomer = (customer: Customer) => {
    window.location.href = `mailto:${customer.email}`;
  };

  const handleAddAppointment = (newAppointment: Omit<Appointment, 'id'>) => {
    setAppointments([...appointments, { ...newAppointment, id: Date.now() }]);
  };

  const handleCompleteAppointment = (id: number) => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status: 'completed' as const } : a
    ));
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status: 'cancelled' as const } : a
    ));
  };

  const handleAddSale = (newSale: Omit<Sale, 'id'>) => {
    setSales([...sales, { ...newSale, id: Date.now() }]);
    setVehicles(vehicles.map(v => 
      v.stock === newSale.stock ? { ...v, status: 'Sold' as const } : v
    ));
  };

  const handleAddMaintenance = (newRecord: Omit<MaintenanceRecord, 'id'>) => {
    setMaintenanceRecords([...maintenanceRecords, { ...newRecord, id: Date.now() }]);
  };

  const handleDeleteMaintenance = (id: number) => {
    setMaintenanceRecords(maintenanceRecords.filter(r => r.id !== id));
  };

  const handleAddCustomer = (newCustomer: Omit<Customer, 'id' | 'added'>) => {
    setCustomers([...customers, { 
      ...newCustomer, 
      id: Date.now(),
      added: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0]
    }]);
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const handleAddFollowUp = (followUp: Omit<FollowUp, 'id' | 'completed'>) => {
    setFollowUps([...followUps, { ...followUp, id: Date.now(), completed: false }]);
  };

  const handleCompleteFollowUp = (id: number) => {
    setFollowUps(followUps.map(f => 
      f.id === id ? { ...f, completed: true } : f
    ));
  };

  const handleDeleteFollowUp = (id: number) => {
    setFollowUps(followUps.filter(f => f.id !== id));
  };

  const handlePhotoUpload = (vehicleId: number, photo: string) => {
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

  const navigationTabs: NavigationTab[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'inventory', label: 'Inventory', icon: Car },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderHeader = () => (
    <header className="mobile-header">
      <div className="mobile-header-content">
        <button className="mobile-header-btn">
          <Menu size={24} />
        </button>
        <h1 className="mobile-header-title">Dan's Car Lot</h1>
        <div className="flex items-center gap-2">
          <button className="mobile-header-btn" onClick={() => setAppointmentModalOpen(true)}>
            <Calendar size={20} />
          </button>
          <button className="mobile-header-btn">
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="mobile-content-area">
      <div className="mobile-section">
        <div className="card bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Time Clock</h2>
              <p className="text-blue-100 text-sm">
                {activeEntry ? `Clocked in at ${activeEntry.clockIn}` : 'Ready to start'}
              </p>
            </div>
            <Clock size={32} className="text-white opacity-80" />
          </div>
          
          {activeEntry ? (
            <button 
              onClick={() => clockOut(activeEntry.id)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Pause size={20} />
              Clock Out
            </button>
          ) : (
            <button 
              onClick={() => clockIn({
                date: new Date().toISOString().split('T')[0],
                clockIn: new Date().toTimeString().slice(0, 5),
                description: ''
              })}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Clock In
            </button>
          )}

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <p className="text-xs text-blue-100">Today</p>
              <p className="text-2xl font-bold">{getTodayHours().toFixed(1)}h</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <p className="text-xs text-blue-100">This Week</p>
              <p className="text-2xl font-bold">{getWeekHours().toFixed(1)}h</p>
            </div>
          </div>

          <button 
            onClick={() => setTimeLogModalOpen(true)}
            className="w-full mt-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 rounded-lg text-sm"
          >
            View Full Time Log
          </button>
        </div>
      </div>

      <div className="mobile-section">
        <DailySummaryWidget
          timeEntries={timeEntries}
          tasks={tasks}
          followUps={followUps}
        />
      </div>

      <div className="mobile-section">
        <QuickActionMenu
          onTimeLog={() => setTimeLogModalOpen(true)}
          onAddTask={() => alert('Task modal coming soon!')}
          onAddFollowUp={() => setFollowUpModalOpen(true)}
          onAddCustomer={() => setCustomerModalOpen(true)}
        />
      </div>

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
            <p className="mobile-empty-description">Add your first vehicle to get started</p>
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
                    <InventoryAgeBadge daysInInventory={vehicle.daysInInventory} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="mobile-content-area">
      <div className="mobile-section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="mobile-section-title">Active Leads</h2>
          <button onClick={() => setCustomerModalOpen(true)} className="mobile-add-btn">
            <Plus size={18} />
            Add Lead
          </button>
        </div>

        {customers.length === 0 ? (
          <div className="mobile-empty-state">
            <div className="mobile-empty-icon">👥</div>
            <h3 className="mobile-empty-title">No Leads Yet</h3>
            <p className="mobile-empty-description">Add your first customer lead to start tracking</p>
          </div>
        ) : (
          <div className="mobile-customer-list">
            {customers.map(customer => (
              <CustomerContactCard
                key={customer.id}
                customer={customer}
                onCall={handleCallCustomer}
                onEmail={handleEmailCustomer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="mobile-content-area">
      <div className="mobile-section">
        <h2 className="mobile-section-title">Performance Overview</h2>
        <PerformanceMetrics sales={sales} vehicles={vehicles} customers={customers} />
      </div>

      <div className="mobile-section">
        <h2 className="mobile-section-title">Reports</h2>
        <div className="mobile-report-grid">
          <button onClick={() => setFinancialModalOpen(true)} className="mobile-report-card">
            <div className="mobile-report-icon bg-blue-100">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="mobile-report-title">Financial Dashboard</h3>
              <p className="mobile-report-description">View detailed financial analysis</p>
            </div>
          </button>

          <button onClick={() => setSalesModalOpen(true)} className="mobile-report-card">
            <div className="mobile-report-icon bg-green-100">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="mobile-report-title">Sales Report</h3>
              <p className="mobile-report-description">Track sales performance</p>
            </div>
          </button>

          <button onClick={() => setMaintenanceModalOpen(true)} className="mobile-report-card">
            <div className="mobile-report-icon bg-orange-100">
              <Wrench size={24} className="text-orange-600" />
            </div>
            <div>
              <h3 className="mobile-report-title">Maintenance</h3>
              <p className="mobile-report-description">Track service records</p>
            </div>
          </button>

          <button onClick={() => setExportModalOpen(true)} className="mobile-report-card">
            <div className="mobile-report-icon bg-purple-100">
              <FileText size={24} className="text-purple-600" />
            </div>
            <div>
              <h3 className="mobile-report-title">Export Data</h3>
              <p className="mobile-report-description">Download reports</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="mobile-content-area">
      <div className="mobile-section">
        <h2 className="mobile-section-title">Integrations</h2>
        <div className="mobile-settings-list">
          <button onClick={() => setDmsModalOpen(true)} className="mobile-settings-item">
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

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'inventory': return renderInventory();
      case 'customers': return renderCustomers();
      case 'reports': return renderReports();
      case 'settings': return renderSettings();
      default: return renderHome();
    }
  };

  return (
    <div className="mobile-app">
      {renderHeader()}
      
      <main className="mobile-main">
        {renderContent()}
      </main>

      <button className="mobile-fab" onClick={() => setSalesModalOpen(true)}>
        <Plus size={24} />
      </button>

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

      <TimeLogModal 
       isOpen={timeLogModalOpen}
       onClose={() => setTimeLogModalOpen(false)}
       timeEntries={timeEntries}
       onClockIn={clockIn} 
       onClockOut={clockOut}
       onAdd={addManualEntry}
       onDelete={deleteEntry} 
      />
      <ExportModal
       isOpen={exportModalOpen} 
       onClose={() => setExportModalOpen(false)} 
       timeEntries={timeEntries} 
       tasks={tasks} 
       vehicles={vehicles} 
       maintenanceRecords={maintenanceRecords} 
       userRole="Owner" />
      <ScheduleModal 
       isOpen={scheduleModalOpen} 
       onClose={() => setScheduleModalOpen(false)}
       onSchedule={(schedule: any) => console.log('Schedule:', schedule)}
      />
      <DMSModal 
       isOpen={dmsModalOpen} 
       onClose={() => setDmsModalOpen(false)} 
       dmsConnected={dmsConnected} 
       isSyncing={isSyncing} 
       onSync={handleDmsSync} 
       onDisconnect={handleDmsDisconnect} 
       onShowGuide={() => { setDmsModalOpen(false); setDmsGuideModalOpen(true); }} 
      />
      <DMSGuideModal 
       isOpen={dmsGuideModalOpen} 
       onClose={() => setDmsGuideModalOpen(false)} 
      />
      <VehicleDetailModal 
       isOpen={vehicleDetailModalOpen} 
       onClose={() => { setVehicleDetailModalOpen(false); setSelectedVehicle(null); }} 
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
      <MaintenanceModal 
       isOpen={maintenanceModalOpen} 
       onClose={() => setMaintenanceModalOpen(false)} 
       maintenanceRecords={maintenanceRecords} 
       vehicles={vehicles} 
       onAdd={handleAddMaintenance} 
       onDelete={handleDeleteMaintenance} 
      />
      <AppointmentScheduler 
       isOpen={appointmentModalOpen} 
       onClose={() => setAppointmentModalOpen(false)} 
       customers={customers} 
       vehicles={vehicles} 
       appointments={appointments} 
       onAdd={handleAddAppointment} 
       onComplete={handleCompleteAppointment} 
       onCancel={handleCancelAppointment} 
      />

    </div>
  );
}
