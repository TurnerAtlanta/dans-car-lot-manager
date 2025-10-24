import React from 'react';
import VehicleInventory from './VehicleInventory';
import Customers from './Customers';
import SalesTracking from './SalesTracking';
import TaskManagement from './TaskManagement';
import TimeLog from './TimeLog';
import Maintenance from './Maintenance';
import FollowUps from './FollowUps';
import DMSIntegration from './DMSIntegration';
import ScheduledReports from './ScheduledReports';

const CarLotManager: React.FC = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <VehicleInventory />
      <Customers />
      <SalesTracking />
      <TaskManagement />
      <TimeLog />
      <Maintenance />
      <FollowUps />
      <DMSIntegration />
      <ScheduledReports />
    </div>
  );
};

export default CarLotManager;
