import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import TimeLog from './components/TimeLog.jsx';
import Tasks from './components/Tasks.jsx';
import Vehicles from './components/Vehicles.jsx';
import Maintenance from './components/Maintenance.jsx';
import FollowUps from './components/FollowUps.jsx';
import Customers from './components/Customers.jsx';
import Sales from './components/Sales.jsx';
import Financials from './components/Financials.jsx';


export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  const [tasks, setTasks] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [scheduledReports, setScheduledReports] = useState([]);
  const [dmsConfig, setDmsConfig] = useState({ apiKey: '', dealershipId: '' });
  const [dmsConnected, setDmsConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const ExportModal = lazy(() => import('./components/modals/ExportModal'));
  const DMSModal = lazy(() => import('./components/modals/DMSModal'));
  const syncStatus = (connected, lastTime) => {
    setDmsConnected(connected);
    setLastSyncTime(lastTime);
  };

  const generateReport = () => {
    // Implement your report generation logic here
    return `Car Lot Report - ${new Date().toLocaleDateString()}\n\n(Report contents...)`;
  };

  return (
    <div>
      <nav className="flex space-x-4 p-4 border-b border-gray-300">
        <button onClick={() => setActiveTab('tasks')} className={activeTab === 'tasks' ? 'active' : ''}>Tasks</button>
        <button onClick={() => setActiveTab('vehicles')} className={activeTab === 'vehicles' ? 'active' : ''}>Vehicles</button>
        <button onClick={() => setActiveTab('maintenance')} className={activeTab === 'maintenance' ? 'active' : ''}>Maintenance</button>
        <button onClick={() => setActiveTab('followups')} className={activeTab === 'followups' ? 'active' : ''}>Follow-ups</button>
        <button onClick={() => setActiveTab('customers')} className={activeTab === 'customers' ? 'active' : ''}>Customers</button>
        <button onClick={() => setActiveTab('sales')} className={activeTab === 'sales' ? 'active' : ''}>Sales</button>
        <button onClick={() => setActiveTab('financials')} className={activeTab === 'financials' ? 'active' : ''}>Financial</button>
      </nav>

      <main className="p-4">
        {activeTab === 'tasks' && <Task tasks={tasks} setTasks={setTasks} />}
        {activeTab === 'vehicles' && <Vehicles vehicles={vehicles} setVehicles={setVehicles} />}
        {activeTab === 'maintenance' && <Maintenance maintenanceRecords={maintenanceRecords} setMaintenanceRecords={setMaintenanceRecords} />}
        {activeTab === 'followups' && <FollowUps followUps={followUps} setFollowUps={setFollowUps} />}
        {activeTab === 'customers' && <Customers customers={customers} setCustomers={setCustomers} />}
        {activeTab === 'sales' && <Sales sales={sales} setSales={setSales} />}
        {activeTab === 'Financials' && <Financials scheduledReports={scheduledReports} setScheduledReports={setScheduledReports} />}
      </main>

      {dmsConnected && (
        <footer className="p-4 border-t border-gray-300 text-sm text-green-700">
          DMS Connected - Last Synced: {lastSyncTime}
        </footer>
      )}
    </div>
  );
}
