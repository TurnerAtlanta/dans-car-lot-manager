import React, { useState } from 'react';

export default function DMSIntegration({ dmsConfig, setDmsConfig, syncStatus }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const syncWithDMS = () => {
    if (!dmsConfig.apiKey || !dmsConfig.dealershipId) {
      alert('API Key and Dealership ID required');
      return;
    }
    setIsSyncing(true);
    // Simulated async sync process
    setTimeout(() => {
      setIsSyncing(false);
      alert('Successfully synced with DMS');
      syncStatus(true, new Date().toLocaleTimeString());
    }, 2000);
  };

  return (
    <section>
      <h2 className="section-header mb-4">DMS Integration</h2>
      <div className="p-4 bg-yellow-50 rounded-lg mb-6">
        <label className="block mb-2">
          API Key:
          <input
            type="text"
            value={dmsConfig.apiKey}
            onChange={(e) => setDmsConfig({ ...dmsConfig, apiKey: e.target.value })}
            className="input-field"
          />
        </label>

        <label className="block mb-2">
          Dealership ID:
          <input
            type="text"
            value={dmsConfig.dealershipId}
            onChange={(e) => setDmsConfig({ ...dmsConfig, dealershipId: e.target.value })}
            className="input-field"
          />
        </label>

        <button
          onClick={syncWithDMS}
          disabled={isSyncing}
          className="btn-warning px-4 py-2"
        >
          {isSyncing ? 'Syncing...' : 'Sync with DMS'}
        </button>
      </div>
    </section>
  );
}
