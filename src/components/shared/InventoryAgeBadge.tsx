

interface InventoryAgeBadgeProps {
  daysInInventory: number;
}

export function InventoryAgeBadge({ daysInInventory }: InventoryAgeBadgeProps) {
  let className = 'inline-block px-2 py-1 rounded text-xs font-medium';
  let text = 'Fresh';
  let colorClass = 'bg-green-100 text-green-700';

  if (daysInInventory > 60) {
    colorClass = 'bg-red-100 text-red-700';
    text = 'Aging';
  } else if (daysInInventory > 30) {
    colorClass = 'bg-yellow-100 text-yellow-700';
    text = 'Moderate';
  }

  return (
    <span className={`${className} ${colorClass}`}>
      {text} ({daysInInventory}d)
    </span>
  );
}
