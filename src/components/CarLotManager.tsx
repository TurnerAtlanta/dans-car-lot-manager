import React, { useState } from 'react';
import { User } from '../types';
import TimeLogTab from './tabs/TimeLogTab';
import TasksTab from './tabs/TasksTab';
import VehiclesTab from './tabs/VehiclesTab';
import MaintenanceTab from './tabs/MaintenanceTab';
import Customers from './Customers';
import SalesTracking from './SalesTracking';
import FollowUps from './FollowUps';
import DMSIntegration from './DMSIntegration';
import ScheduledReports from './ScheduledReports';
import QuickActionMenu from './ui/QuickActionMenu';
import DailySummaryWidget from './ui/DailySummaryWidget';
import PerformanceMetrics from './ui/PerformanceMetrics';

const CarLotManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [user] = useState<User>({ role: 'Dan' }); // Mock user; integrate with auth in production

  const tabs = [
    { id: 'time-log', label: 'Time Log', component: <TimeLogTab /> },
    { id: 'tasks', label: 'Tasks', component: <TasksTab /> },
    { id: 'vehicles', label: 'Vehicles', component: <VehiclesTab /> },
    { id: 'maintenance', label: 'Maintenance', component: <MaintenanceTab /> },
    { id: 'customers', label: 'Customers', component: <Customers /> },
    { id: 'sales', label: 'Sales', component: <SalesTracking /> },
    { id: 'follow-ups', label: 'Follow-ups', component: <FollowUps /> },
    { id: 'dms', label: 'DMS Integration', component: <DMSIntegration /> },
    { id: 'reports', label: 'Reports', component: <ScheduledReports /> },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <DailySummaryWidget />
        <PerformanceMetrics />
        <QuickActionMenu />
      </div>
      <div className="flex flex-wrap border-b mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`p-2 ${activeTab === tab.id ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            disabled={tab.id === 'dms' && user.role !== 'Boss'} // Boss-only access for DMS
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="animate-fade-in">{tabs.find(t => t.id === activeTab)?.component}</div>
    </div>
  );
};

export default CarLotManager;
