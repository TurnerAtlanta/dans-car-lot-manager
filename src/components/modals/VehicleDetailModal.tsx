import React, { useState } from 'react';
import { useMaintenances } from '../../hooks';
import { Vehicle, Maintenance } from '../../types';
import InventoryAgeBadge from '../ui/InventoryAgeBadge';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onSave: (vehicle: Vehicle) => void;
  onClose: () => void;
}

const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ vehicle, onSave, onClose }) => {
  const { maintenances } = useMaintenances();
  const [formData, setFormData] = useState<Vehicle>(
    vehicle || {
      id: 0,
      make: '',
      model: '',
      year: 0,
      price: 0,
      purchasePrice: 0,
      reconditioningCost: 0,
      mileage: 0,
      status: 'available',
      stockNumber: '',
      vin: '',
      photos: [],
      dateAdded: new Date().toISOString().split('T')[0],
    }
  );
  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let photos = formData.photos || [];
    if (newPhoto) {
      const photoUrl = await uploadPhoto(newPhoto); // Implement uploadPhoto in utils
      photos = [...photos, photoUrl];
    }
    onSave({
      ...formData,
      year: Number(formData.year),
      price: Number(formData.price),
      purchasePrice: Number(formData.purchasePrice),
      reconditioningCost: Number(formData.reconditioningCost),
      mileage: Number(formData.mileage),
      photos,
    });
  };

  const vehicleMaintenances = maintenances.filter(m => m.vehicleId === formData.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-h-[80vh] overflow-y-auto w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">{vehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
        <form onSubmit={handleSubmit}>
          <input name="make" value={formData.make} onChange={handleChange} placeholder="Make" className="border p-2 mb-2 w-full" required />
          <input name="model" value={formData.model} onChange={handleChange} placeholder="Model" className="border p-2 mb-2 w-full" required />
          <input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="Year" className="border p-2 mb-2 w-full" required />
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="List Price" className="border p-2 mb-2 w-full" required />
          <input name="purchasePrice" type="number" value={formData.purchasePrice} onChange={handleChange} placeholder="Purchase Price" className="border p-2 mb-2 w-full" required />
          <input name="reconditioningCost" type="number" value={formData.reconditioningCost} onChange={handleChange} placeholder="Reconditioning Cost" className="border p-2 mb-2 w-full" required />
          <input name="mileage" type="number" value={formData.mileage} onChange={handleChange} placeholder="Mileage" className="border p-2 mb-2 w-full" required />
          <input name="stockNumber" value={formData.stockNumber} onChange={handleChange} placeholder="Stock Number" className="border p-2 mb-2 w-full" required />
          <input name="vin" value={formData.vin || ''} onChange={handleChange} placeholder="VIN" className="border p-2 mb-2 w-full" />
          <select name="status" value={formData.status} onChange={handleChange} className="border p-2 mb-2 w-full" required>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="mb-2" />
          <div className="mb-2">
            {formData.photos?.map((url, i) => (
              <img key={i} src={url} alt="Vehicle" className="w-24 h-24 object-cover inline-block mr-2" />
            ))}
          </div>
          <InventoryAgeBadge dateAdded={formData.dateAdded} />
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 mr-2">Save</button>
            <button onClick={onClose} className="bg-red-500 text-white p-2">Cancel</button>
          </div>
        </form>
        <div className="mt-4">
          <h4 className="font-bold">Maintenance History</h4>
          {vehicleMaintenances.map((m: Maintenance) => (
            <div key={m.id} className="border-b py-2">
              <p>{m.description} - {m.date}</p>
              <p>Cost: ${m.cost} ({m.status})</p>
              {m.photos?.map((url, i) => (
                <img key={i} src={url} alt="Maintenance" className="w-16 h-16 object-cover inline-block mr-2" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

async function uploadPhoto(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('photo', file);
  const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/upload-photo`, {
    method: 'POST',
    body: formData,
  });
  const result: { url: string } = await response.json();
  return result.url;
}

export default VehicleDetailModal;
