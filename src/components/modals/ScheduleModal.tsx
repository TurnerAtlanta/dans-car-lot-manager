import React from 'react';

const ScheduleModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2">Schedule Report</h3>
        <p>Set report scheduling (implementation pending, e.g., via browser notifications).</p>
        <button onClick={onClose} className="bg-red-500 text-white p-2 mt-4">Close</button>
      </div>
    </div>
  );
};

export default ScheduleModal;
