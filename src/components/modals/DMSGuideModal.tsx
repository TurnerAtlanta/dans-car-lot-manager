import { X, Key, Server, CheckCircle } from 'lucide-react';

interface DMSGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DMSGuideModal({ isOpen, onClose }: DMSGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">DMS Setup Guide</h2>
            <p className="modal-subtitle">Connect to Wayne Reeves DMS</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="card">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">Get API Credentials</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Contact Wayne Reeves support to obtain your API key and endpoint URL.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Key size={16} />
                  <span>support@waynereeves.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">Configure Connection</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Enter your API credentials in the configuration panel.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Endpoint:</span>
                    <code className="ml-2 text-blue-600">https://api.waynereeves.com/v1</code>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">API Key:</span>
                    <code className="ml-2 text-gray-400">Your unique key</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">Test Connection</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Click "Test Connection" to verify your credentials are correct.
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle size={16} />
                  <span>Connection successful</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="alert-info">
            <Server size={16} />
            <p className="text-sm">
              <strong>🔒 Security:</strong> Your API credentials are encrypted and stored securely. 
              Never share your API key with unauthorized users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
