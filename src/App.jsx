import React, { useState } from 'react';
import TaskManagement from './components/TaskManagement.jsx';
import VehicleInventory from './components/VehicleInventory.jsx';
import MaintenanceRecords from './components/MaintenanceRecords.jsx';
import FollowUpReminders from './components/FollowUpReminders.jsx';
import CustomerDatabase from './components/CustomerDatabase.jsx';
import SalesTracking from './components/SalesTracking.jsx';
import ScheduledReports from './components/ScheduledReports.jsx';
import DMSIntegration from './components/DMSIntegration.jsx';
import ExportReports from './components/ExportReports.jsx';

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
        <button onClick={() => setActiveTab('scheduledReports')} className={activeTab === 'scheduledReports' ? 'active' : ''}>Scheduled Reports</button>
        <button onClick={() => setActiveTab('dmsIntegration')} className={activeTab === 'dmsIntegration' ? 'active' : ''}>DMS Integration</button>
        <button onClick={() => setActiveTab('exportReports')} className={activeTab === 'exportReports' ? 'active' : ''}>Export Reports</button>
      </nav>

      <main className="p-4">
        {activeTab === 'tasks' && <TaskManagement tasks={tasks} setTasks={setTasks} />}
        {activeTab === 'vehicles' && <VehicleInventory vehicles={vehicles} setVehicles={setVehicles} />}
        {activeTab === 'maintenance' && <MaintenanceRecords maintenanceRecords={maintenanceRecords} setMaintenanceRecords={setMaintenanceRecords} />}
        {activeTab === 'followups' && <FollowUpReminders followUps={followUps} setFollowUps={setFollowUps} />}
        {activeTab === 'customers' && <CustomerDatabase customers={customers} setCustomers={setCustomers} />}
        {activeTab === 'sales' && <SalesTracking sales={sales} setSales={setSales} />}
        {activeTab === 'scheduledReports' && <ScheduledReports scheduledReports={scheduledReports} setScheduledReports={setScheduledReports} />}
        {activeTab === 'dmsIntegration' && <DMSIntegration dmsConfig={dmsConfig} setDmsConfig={setDmsConfig} syncStatus={syncStatus} />}
        {activeTab === 'exportReports' && <ExportReports generateReport={generateReport} />}
      </main>

      {dmsConnected && (
        <footer className="p-4 border-t border-gray-300 text-sm text-green-700">
          DMS Connected - Last Synced: {lastSyncTime}
        </footer>
      )}
    </div>
  );
}
