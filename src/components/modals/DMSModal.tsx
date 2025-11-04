import { X, RefreshCw, Unplug, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';

interface DMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  dmsConnected: boolean;
  isSyncing: boolean;
  onSync: () => void;
  onDisconnect: () => void;
  onShowGuide: () => void;
}

export default function DMSModal({
  isOpen,
  onClose,
  dmsConnected,
  isSyncing,
  onSync,
  onDisconnect,
  onShowGuide
}: DMSModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">DMS Integration</h2>
            <p className="modal-subtitle">Connect to your dealer management system</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Connection Status */}
          <div className={`p-4 rounded-lg ${dmsConnected ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              {dmsConnected ? (
                <CheckCircle size={24} className="text-green-600" />
              ) : (
                <AlertCircle size={24} className="text-gray-400" />
              )}
              <div>
                <p className="font-bold text-gray-800">
                  {dmsConnected ? 'Connected' : 'Not Connected'}
                </p>
                <p className="text-sm text-gray-600">
                  {dmsConnected ? 'Syncing with Wayne Reeves DMS' : 'Connect to sync your inventory'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {dmsConnected ? (
            <div className="space-y-3">
              <button 
                onClick={onSync}
                disabled={isSyncing}
                className="btn-primary w-full"
              >
                <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </button>
              <button 
                onClick={onDisconnect}
                className="btn-secondary w-full"
              >
                <Unplug size={18} />
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={onShowGuide}
              className="btn-primary w-full"
            >
              <HelpCircle size={18} />
              Setup Guide
            </button>
          )}

          <div className="alert-info">
            <p className="text-sm">
              <strong>💡 Tip:</strong> DMS integration automatically syncs your inventory, 
              pricing, and vehicle details with Wayne Reeves system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
