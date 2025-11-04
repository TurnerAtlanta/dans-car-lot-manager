import { useState } from 'react';
import { X, Car, TrendingUp, DollarSign } from 'lucide-react';

interface TradeInEstimatorProps {
  onEstimate: (value: number) => void;
}

export default function TradeInEstimator({ onEstimate }: TradeInEstimatorProps) {
  const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    mileage: '',
    condition: 'average' as 'excellent' | 'average' | 'poor',
  });
  
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock estimation logic
    const baseValue = 10000;
    const yearFactor = (new Date().getFullYear() - Number(formData.year)) * -500;
    const mileageFactor = Number(formData.mileage) / 10000 * -1000;
    const conditionFactor = 
      formData.condition === 'excellent' ? 1000 : 
      formData.condition === 'poor' ? -1000 : 
      0;
    
    const calculatedValue = Math.max(1000, baseValue + yearFactor + mileageFactor + conditionFactor);
    setEstimatedValue(calculatedValue);
    onEstimate(calculatedValue);
  };

  const handleReset = () => {
    setFormData({
      year: '',
      make: '',
      model: '',
      mileage: '',
      condition: 'average',
    });
    setEstimatedValue(null);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Car size={20} className="text-blue-600" />
          <h4 className="font-bold text-lg text-gray-800">Trade-In Estimator</h4>
        </div>
        {estimatedValue && (
          <button onClick={handleReset} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        )}
      </div>

      {!estimatedValue ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input 
              name="year" 
              type="number" 
              value={formData.year} 
              onChange={handleChange} 
              placeholder="2020" 
              className="input-field" 
              required 
              min="1980"
              max={new Date().getFullYear() + 1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
            <input 
              name="make" 
              value={formData.make} 
              onChange={handleChange} 
              placeholder="Honda" 
              className="input-field" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input 
              name="model" 
              value={formData.model} 
              onChange={handleChange} 
              placeholder="Accord" 
              className="input-field" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
            <input 
              name="mileage" 
              type="number" 
              value={formData.mileage} 
              onChange={handleChange} 
              placeholder="50000" 
              className="input-field" 
              required 
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select 
              name="condition" 
              value={formData.condition} 
              onChange={handleChange} 
              className="select-field" 
              required
            >
              <option value="excellent">Excellent</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <button type="submit" className="btn-primary w-full">
            <TrendingUp size={18} />
            Estimate Trade-In Value
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Estimated Trade-In Value</p>
            <p className="text-3xl font-bold text-blue-600 flex items-center gap-2">
              <DollarSign size={28} />
              {estimatedValue.toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-bold text-gray-800 mb-2">Vehicle Details</h5>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-600">Year:</span> <span className="font-medium">{formData.year}</span></p>
              <p><span className="text-gray-600">Make:</span> <span className="font-medium">{formData.make}</span></p>
              <p><span className="text-gray-600">Model:</span> <span className="font-medium">{formData.model}</span></p>
              <p><span className="text-gray-600">Mileage:</span> <span className="font-medium">{Number(formData.mileage).toLocaleString()} miles</span></p>
              <p><span className="text-gray-600">Condition:</span> <span className="font-medium capitalize">{formData.condition}</span></p>
            </div>
          </div>

          <div className="alert-info">
            <p className="text-xs">
              <strong>Note:</strong> This is an estimated value. Final offer may vary based on vehicle inspection and market conditions.
            </p>
          </div>

          <button onClick={handleReset} className="btn-secondary w-full">
            Get Another Estimate
          </button>
        </div>
      )}
    </div>
  );
}
