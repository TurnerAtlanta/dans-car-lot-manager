import { useState, useEffect } from 'react';
import { Vehicle, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT || 'https://dans-car-lot-manager.workers.dev';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/vehicles`);
        const result: ApiResponse<Vehicle[]> = await response.json();
        if (result.error) throw new Error(result.error);
        setVehicles(result.data || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const addVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle),
      });
      const result: ApiResponse<{ id: number }> = await response.json();
      if (result.error) throw new Error(result.error);
      setVehicles([...vehicles, { ...vehicle, id: result.data!.id }]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (id: number, updated: Vehicle) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!response.ok) {
        const result: ApiResponse<never> = await response.json();
        throw new Error(result.error || 'Failed to update vehicle');
      }
      setVehicles(vehicles.map(v => v.id === id ? updated : v));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const result: ApiResponse<never> = await response.json();
        throw new Error(result.error || 'Failed to delete vehicle');
      }
      setVehicles(vehicles.filter(v => v.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { vehicles, addVehicle, updateVehicle, deleteVehicle, loading, error };
};
