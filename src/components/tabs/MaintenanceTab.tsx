import React from 'react';
import { useMaintenances } from '../../hooks';
import { Maintenance } from '../../types';

const MaintenanceTab: React.FC = () => {
  const { maintenances, loading, error } = useMaintenances();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Maintenance Records</h2>
      <table className="w-full border">
        <thead>
          <tr><th>Vehicle ID</th><th>Description</th><th>Date</th><th>Cost</th><th>Status</th></tr>
        </thead>
        <tbody>
          {maintenances.map((m: Maintenance) => (
            <tr key={m.id}>
              <td>{m.vehicleId}</td>
              <td>{m.description}</td>
              <td>{m.date}</td>
              <td>{m.cost}</td>
              <td>{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceTab;
