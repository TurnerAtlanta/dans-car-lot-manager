import React from 'react';

const FinancialModal = ({ totalSales, totalCosts, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2">Financial Summary</h3>
        <p>Total Sales: ${totalSales}</p>
        <p>Total Costs: ${totalCosts}</p>
        <button onClick={onClose} className="bg-red-500 text-white p-2 mt-4">Close</button>
      </div>
    </div>
  );
};

export default FinancialModal;
