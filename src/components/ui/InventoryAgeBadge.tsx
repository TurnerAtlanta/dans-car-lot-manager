import React from 'react';
import { calculateDaysInInventory } from '../../utils/calculations';

interface InventoryAgeBadgeProps {
  dateAdded: string;
}

const InventoryAgeBadge: React.FC<InventoryAgeBadgeProps> = ({ dateAdded }) => {
  const days = calculateDaysInInventory(dateAdded);
  const color = days <= 30 ? 'bg-green-500' : days <= 60 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <span className={`text-white text-sm px-2 py-1 rounded ${color}`}>
      {days} days
    </span>
  );
};

export default InventoryAgeBadge;
