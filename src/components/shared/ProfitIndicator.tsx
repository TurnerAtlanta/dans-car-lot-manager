
import { TrendingUp } from 'lucide-react';

interface ProfitIndicatorProps {
  profit: number;
  margin: number;
}

export function ProfitIndicator({ profit, margin }: ProfitIndicatorProps) {

  const marginPercent = parseFloat(margin.toString());

  let color = 'text-red-600';
  if (marginPercent > 15) color = 'text-green-600';
  else if (marginPercent > 8) color = 'text-yellow-600';

  return (
    <div className="flex items-center gap-2">
      <TrendingUp size={16} className={color} />
      <span className={`font-bold ${color}`}>
        ${Math.abs(profit).toLocaleString()}
      </span>
      <span className={`text-sm ${color}`}>
        ({marginPercent.toFixed(1)}%)
      </span>
    </div>
  );
}
