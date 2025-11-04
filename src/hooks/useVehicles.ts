import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface Vehicle {
  id: number;
  stock: string;
  year: string;
  make: string;
  model: string;
  price: string;
  purchasePrice: string;
  status: 'Available' | 'Sold' | 'Pending';
  daysInInventory: number;
  addedDate: string;
  photos?: string[];
}

export interface UseVehiclesReturn {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'addedDate' | 'daysInInventory'>) => void;
  updateVehicle: (id: number, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: number) => void;
  getVehicleByStock: (stock: string) => Vehicle | undefined;
  getAvailableVehicles: () => Vehicle[];
  getSoldVehicles: () => Vehicle[];
}

export function useVehicles(): UseVehiclesReturn {
  const [vehicles, setVehicles] = useLocalStorage<Vehicle[]>('carlot_vehicles', []);

  const addVehicle = (vehicle: Omit<Vehicle, 'id' | 'addedDate' | 'daysInInventory'>) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: Date.now(),
      addedDate: new Date().toISOString(),
      daysInInventory: 0
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const updateVehicle = (id: number, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => 
      v.id === id ? { ...v, ...updates } : v
    ));
  };

  const deleteVehicle = (id: number) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const getVehicleByStock = (stock: string): Vehicle | undefined => {
    return vehicles.find(v => v.stock === stock);
  };

  const getAvailableVehicles = (): Vehicle[] => {
    return vehicles.filter(v => v.status !== 'Sold');
  };

  const getSoldVehicles = (): Vehicle[] => {
    return vehicles.filter(v => v.status === 'Sold');
  };

  // Update days in inventory
  useEffect(() => {
    const updateDaysInInventory = () => {
      const updated = vehicles.map(vehicle => {
        if (vehicle.addedDate && vehicle.status !== 'Sold') {
          const addedDate = new Date(vehicle.addedDate);
          const today = new Date();
          const daysDiff = Math.floor((today.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24));
          return { ...vehicle, daysInInventory: daysDiff };
        }
        return vehicle;
      });
      setVehicles(updated);
    };

    const interval = setInterval(updateDaysInInventory, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, [vehicles]);

  return {
    vehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleByStock,
    getAvailableVehicles,
    getSoldVehicles
  };
}
