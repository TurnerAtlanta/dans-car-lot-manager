import React from 'react';
import { calculateProfitMargin } from '../../utils/calculations';
import { formatPercentage } from '../../utils/formatters';

interface ProfitIndicatorProps {
  salePrice: number;
  totalCost: number;
}

const ProfitIndicator: React.FC<ProfitIndicatorProps> = ({ salePrice, totalCost }) => {
  const margin = calculateProfitMargin(salePrice, totalCost);
  const color = margin > 15 ? 'text-green-500' : margin >= 8 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className={`flex items-center ${color}`}>
      <span>Profit Margin: {formatPercentage(margin)}</span>
      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
        <path d={margin > 0 ? "M10 3l7 14H3L10 3z" : "M10 17l-7-14h14L10 17z"} />
      </svg>
    </div>
  );
};

export default ProfitIndicator;
