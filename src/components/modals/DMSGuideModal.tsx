import React from 'react';

const DMSGuideModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2">DMS Integration Guide</h3>
        <p>Configure VITE_DMS_API_ENDPOINT in .env.local and use the sync button to import data.</p>
        <button onClick={onClose} className="bg-red-500 text-white p-2 mt-4">Close</button>
      </div>
    </div>
  );
};

export default DMSGuideModal;
