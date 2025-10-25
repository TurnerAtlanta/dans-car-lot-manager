import React, { useState } from 'react';
import { connectToDMS, checkConnection } from '../../utils/dmsIntegration';

interface DMSModalProps {
  onClose: () => void;
}

const DMSModal: React.FC<DMSModalProps> = ({ onClose }) => {
  const [config, setConfig] = useState({
    apiKey: '',
    dealershipId: '',
    endpoint: import.meta.env.VITE_DMS_API_ENDPOINT || '',
    syncVehicles: true,
    syncMaintenance: true,
    syncCustomers: true,
    pushTimeLogs: false,
  });
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig({ ...config, [name]: type === 'checkbox' ? checked : value });
  };

  const handleTestConnection = async () => {
    setLoading(true);
    const status = await checkConnection(config);
    setConnectionStatus(status ? 'connected' : 'disconnected');
    setLoading(false);
  };

  const handleSync = async () => {
    setLoading(true);
    await connectToDMS(config);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-h-[80vh] overflow-y-auto w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">DMS Configuration</h3>
        <p className={connectionStatus === 'connected' ? 'text-green-500' : 'text-red-500'}>
          Status: {connectionStatus}
        </p>
        <form>
          <input
            name="apiKey"
            type="password"
            value={config.apiKey}
            onChange={handleChange}
            placeholder="API Key"
            className="border p-2 mb-2 w-full"
            required
          />
          <input
            name="dealershipId"
            value={config.dealershipId}
            onChange={handleChange}
            placeholder="Dealership ID"
            className="border p-2 mb-2 w-full"
            required
          />
          <input
            name="endpoint"
            value={config.endpoint}
            onChange={handleChange}
            placeholder="API Endpoint"
            className="border p-2 mb-2 w-full"
            required
          />
          <label className="flex items-center mb-2">
            <input name="syncVehicles" type="checkbox" checked={config.syncVehicles} onChange={handleChange} className="mr-2" />
            Sync Vehicles
          </label>
          <label className="flex items-center mb-2">
            <input name="syncMaintenance" type="checkbox" checked={config.syncMaintenance} onChange={handleChange} className="mr-2" />
            Sync Maintenance
          </label>
          <label className="flex items-center mb-2">
            <input name="syncCustomers" type="checkbox" checked={config.syncCustomers} onChange={handleChange} className="mr-2" />
            Sync Customers
          </label>
          <label className="flex items-center mb-2">
            <input name="pushTimeLogs" type="checkbox" checked={config.pushTimeLogs} onChange={handleChange} className="mr-2" />
            Push Time Logs
          </label>
          <div className="flex justify-end space-x-2">
            <button onClick={handleTestConnection} className="bg-blue-500 text-white p-2" disabled={loading}>
              Test Connection
            </button>
            <button onClick={handleSync} className="bg-green-500 text-white p-2" disabled={loading}>
              Sync Now
            </button>
            <button onClick={onClose} className="bg-red-500 text-white p-2">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DMSModal;
