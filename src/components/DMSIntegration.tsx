import React from 'react';
import { syncDMS } from '../utils/dmsIntegration';

const DMSIntegration = () => {
  const handleSync = async () => {
    try {
      await syncDMS();
      alert('DMS sync completed successfully.');
    } catch (error) {
      alert('DMS sync failed: ' + error.message);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">DMS Integration</h2>
      <button onClick={handleSync} className="bg-green-500 text-white p-2">Sync with DMS</button>
    </div>
  );
};

export default DMSIntegration;
