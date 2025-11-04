

interface Vehicle {
  id: number;
  year: string;
  make: string;
  model: string;
  price: string;
  purchasePrice: string;
  reconCost?: string;
}

interface VehicleComparisonCardProps {
  vehicles: Vehicle[];
}

export function VehicleComparisonCard({ vehicles }: VehicleComparisonCardProps) {
  if (vehicles.length < 2) return null;

  return (
    <div className="card">
      <h3 className="font-bold text-gray-800 mb-3">Compare Vehicles</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Vehicle</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Cost</th>
              <th className="text-right py-2">Profit</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(v => {
              const purchaseCost = parseFloat(v.purchasePrice.replace(/[$,]/g, ''));
              const reconCost = parseFloat((v.reconCost || '$0').replace(/[$,]/g, ''));
              const totalCost = purchaseCost + reconCost;
              const price = parseFloat(v.price.replace(/[$,]/g, ''));
              const profit = price - totalCost;

              return (
                <tr key={v.id} className="border-b">
                  <td className="py-2">{v.year} {v.make} {v.model}</td>
                  <td className="text-right py-2">{v.price}</td>
                  <td className="text-right py-2">${totalCost.toLocaleString()}</td>
                  <td className={`text-right py-2 ${profit > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                    ${profit.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
