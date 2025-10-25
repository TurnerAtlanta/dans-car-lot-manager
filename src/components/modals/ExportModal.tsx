import React from 'react';
import { exportToCSV } from '../../utils/exportUtils';

const ExportModal = ({ data, filename, onClose }) => {
  const handleExport = () => {
    exportToCSV(data, filename);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2">Export Data</h3>
        <p>Export {filename}?</p>
        <button onClick={handleExport} className="bg-blue-500 text-white p-2 mr-2">Export</button>
        <button onClick={onClose} className="bg-red-500 text-white p-2">Cancel</button>
      </div>
    </div>
  );
};

export default ExportModal;
