import React from 'react';
import { X } from 'lucide-react';

export default function DMSGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Wayne Reeves DMS Integration Guide</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <div className="alert-warning">
            <h3 className="text-lg font-bold text-orange-900 mt-0">📞 Step 1: Contact Wayne Reeves Support</h3>
            <p className="text-sm text-orange-800 mb-2">
              Call or email Wayne Reeves support to request API access:
            </p>
            <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
              <li><strong>Support Phone:</strong> 1-800-XXX-XXXX (Check your DMS documentation)</li>
              <li><strong>Support Email:</strong> support@waynereeves.com</li>
              <li><strong>What to Request:</strong> "API credentials for third-party integration"</li>
            </ul>
          </div>

          <div className="alert-info">
            <h3 className="text-lg font-bold text-blue-900 mt-0">📋 Step 2: Information You'll Need</h3>
            <p className="text-sm text-blue-800 mb-2">
              When contacting Wayne Reeves, have this information ready:
            </p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Your dealership name and ID</li>
              <li>DMS account administrator name</li>
              <li>Purpose: "Employee time tracking and task management integration"</li>
              <li>Data needed: Vehicle inventory, service records, customer data (optional)</li>
              <li>Your technical contact email for receiving credentials</li>
            </ul>
          </div>

          <div className="alert-success">
            <h3 className="text-lg font-bold text-green-900 mt-0">🔑 Step 3: Credentials You'll Receive</h3>
            <p className="text-sm text-green-800 mb-2">
              Wayne Reeves will provide you with:
            </p>
            <div className="space-y-3 text-sm text-green-800">
              <div className="bg-white rounded p-3">
                <strong>API Key</strong>
                <p className="text-xs mt-1">
                  A long string like: <code className="bg-gray-100 px-2 py-1 rounded">WR_ak_1234567890abcdef...</code>
                </p>
              </div>
              <div className="bg-white rounded p-3">
                <strong>Dealership ID</strong>
                <p className="text-xs mt-1">
                  Your unique dealer code: <code className="bg-gray-100 px-2 py-1 rounded">DEAL12345</code>
                </p>
              </div>
              <div className="bg-white rounded p-3">
                <strong>API Endpoint URL</strong>
                <p className="text-xs mt-1">
                  Usually: <code className="bg-gray-100 px-2 py-1 rounded">https://api.waynereeves.com/v1</code>
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-purple-50">
            <h3 className="text-lg font-bold text-purple-900 mt-0">⚙️ Step 4: What Data Can Be Synced</h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-purple-800">
              <div>
                <strong>✓ Vehicle Data:</strong>
                <ul className="text-xs mt-1 space-y-1 list-disc list-inside">
                  <li>Stock numbers</li>
                  <li>VIN, Make, Model, Year</li>
                  <li>Pricing and status</li>
                  <li>Photos (if available)</li>
                </ul>
              </div>
              <div>
                <strong>✓ Service Records:</strong>
                <ul className="text-xs mt-1 space-y-1 list-disc list-inside">
                  <li>Maintenance history</li>
                  <li>Reconditioning status</li>
                  <li>Service appointments</li>
                  <li>Work order details</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mt-0">🚀 Step 5: After You Receive Credentials</h3>
            <ol className="text-sm text-gray-800 space-y-2 list-decimal list-inside">
              <li>Enter your API Key, Dealership ID, and Endpoint in the DMS integration settings</li>
              <li>Click "Test Connection" to verify the credentials work</li>
              <li>Choose which data to sync (vehicles, maintenance, customers)</li>
              <li>Set sync frequency (real-time, hourly, daily)</li>
              <li>Enable automatic syncing or manual sync on-demand</li>
            </ol>
          </div>

          <div className="alert-warning">
            <p className="text-sm text-yellow-800 mb-0">
              <strong>⚠️ Important:</strong> Keep your API credentials secure. Never share them publicly or in unsecured emails. 
              These credentials give access to your dealership data.
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">
            Close Guide
          </button>
          <button onClick={onClose} className="btn-warning flex-1">
            Return to Setup
          </button>
        </div>
      </div>
    </div>
  );
}
