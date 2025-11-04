

interface Sale {
  soldPrice: string;
  profit: string;
  daysToSell?: number;
}

interface Vehicle {
  id: number;
}

interface Customer {
  id: number;
}

interface PerformanceMetricsProps {
  sales: Sale[];
  vehicles: Vehicle[];
  customers: Customer[];
}

export function PerformanceMetrics({ sales, customers }: PerformanceMetricsProps) {
  const totalRevenue = sales.reduce((sum, s) =>
    sum + parseFloat(s.soldPrice.replace(/[$,]/g, '')), 0
  );

  const totalProfit = sales.reduce((sum, s) =>
    sum + parseFloat(s.profit.replace(/[$,]/g, '')), 0
  );

  const avgDaysToSell = sales.length > 0 ?
    Math.floor(sales.reduce((sum, s) => sum + (s.daysToSell || 30), 0) / sales.length) : 0;

  const conversionRate = customers.length > 0 ?
    ((sales.length / customers.length) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="stat-card-blue">
        <p className="stat-label text-blue-600">Total Revenue</p>
        <p className="stat-value text-blue-900">${totalRevenue.toLocaleString()}</p>
      </div>

      <div className="stat-card-green">
        <p className="stat-label text-green-600">Total Profit</p>
        <p className="stat-value text-green-900">${totalProfit.toLocaleString()}</p>
      </div>
      
      <div className="stat-card-purple">
        <p className="stat-label text-purple-600">Avg Days to Sell</p>
        <p className="stat-value text-purple-900">{avgDaysToSell}</p>
      </div>

      <div className="stat-card-orange">
        <p className="stat-label text-orange-600">Conversion Rate</p>
        <p className="stat-value text-orange-900">{conversionRate}%</p>
      </div>
    </div>
  );
}
