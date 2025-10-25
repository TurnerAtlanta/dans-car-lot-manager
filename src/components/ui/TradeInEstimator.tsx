import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';

interface TradeInEstimatorProps {
  onEstimate: (value: number) => void;
}

const TradeInEstimator: React.FC<TradeInEstimatorProps> = ({ onEstimate }) => {
  const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    mileage: '',
    condition: 'average',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock estimation logic
    const baseValue = 10000;
    const yearFactor = (new Date().getFullYear() - Number(formData.year)) * -500;
    const mileageFactor = Number(formData.mileage) / 10000 * -1000;
    const conditionFactor = formData.condition === 'excellent' ? 1000 : formData.condition === 'poor' ? -1000 : 0;
    const estimatedValue = Math.max(1000, baseValue + yearFactor + mileageFactor + conditionFactor);
    onEstimate(estimatedValue);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h4 className="font-bold mb-2">Trade-In Estimator</h4>
      <form onSubmit={handleSubmit}>
        <input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="Year" className="border p-2 mb-2 w-full" required />
        <input name="make" value={formData.make} onChange={handleChange} placeholder="Make" className="border p-2 mb-2 w-full" required />
        <input name="model" value={formData.model} onChange={handleChange} placeholder="Model" className="border p-2 mb-2 w-full" required />
        <input name="mileage" type="number" value={formData.mileage} onChange={handleChange} placeholder="Mileage" className="border p-2 mb-2 w-full" required />
        <select name="condition" value={formData.condition} onChange={handleChange} className="border p-2 mb-2 w-full" required>
          <option value="excellent">Excellent</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">Estimate</button>
      </form>
    </div>
  );
};

export default TradeInEstimator;
