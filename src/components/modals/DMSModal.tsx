import React, { useState } from 'react';
import { X, Share2 } from 'lucide-react';

export default function DMSModal({
  isOpen,
  onClose,
  dmsConnected,
  isSyncing,
  onSync,
  onDisconnect,
  onShowGuide,
}) {
  const [apiKey, setApiKey] = useState('');
  const [dealershipId, setDealershipId] = useState('');
  const [endpoint, setEndpoint] = useState('https://api.waynereeves.com/v1');

  if (!isOpen) return null;

  const handleSync = () => {
    onSync({ apiKey, dealershipId, endpoint });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Wayne Reeves DMS Integration</h2>
            <p className="modal-subtitle">Sync your inventory and data with Wayne Reeves DMS</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition">
            <X size={24} />
          </button>
        </div>

        {!dmsConnected ? (
          <div className="space-y-4">
            <div className="alert-info">
              <h3 className="font-bold text-blue-900 mb-2">📋 Setup Required</h3>
              <p className="text-sm text-blue-800 mb-3">
                To connect with Wayne Reeves DMS, you'll need API credentials from your DMS administrator.
              </p>
              <button
                onClick={onShowGuide}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
              >
                View Setup Guide →
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Wayne Reeves API key"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dealership ID</label>
              <input
                type="text"
                value={dealershipId}
                onChange={(e) => setDealershipId(e.target.value)}
                placeholder="Your dealership ID"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="alert-warning">
              <h4 className="font-bold text-yellow-900 mb-2">🔒 Demo Mode</h4>
              <p className="text-sm text-yellow-800 mb-3">
                This is a demo interface. Click "Test Connection" below to simulate syncing with Wayne Reeves DMS.
              </p>
            </div>

            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="btn-warning w-full"
            >
              {isSyncing ? (
                <>
                  <div className="spinner"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <Share2 size={20} />
                  Test Connection & Sync
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="alert-success">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="font-bold text-green-900">Connected to Wayne Reeves DMS</h3>
              </div>
              <p className="text-sm text-green-800">Last sync: {new Date().toLocaleTimeString()}</p>
            </div>

            <div className="card">
              <h3 className="font-bold text-gray-800 mb-3">Sync Options</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="checkbox-field" />
                  <span>Vehicle Inventory</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="checkbox-field" />
                  <span>Maintenance Records</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="checkbox-field" />
                  <span>Customer Data</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox-field" />
                  <span>Push Time Logs to DMS</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="btn-warning w-full"
            >
              {isSyncing ? (
                <>
                  <div className="spinner"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <Share2 size={20} />
                  Sync Now
                </>
              )}
            </button>

            <button onClick={onDisconnect} className="btn-secondary w-full">
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

