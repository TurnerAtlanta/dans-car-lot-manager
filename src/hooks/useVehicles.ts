import { useLocalStorage } from './useLocalStorage';
import { Vehicle } from '../types';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useLocalStorage<Vehicle[]>('vehicles', []);

  const addVehicle = (vehicle: Vehicle) => setVehicles([...vehicles, vehicle]);
  const updateVehicle = (id: number, updated: Vehicle) => setVehicles(vehicles.map(v => v.id === id ? updated : v));
  const deleteVehicle = (id: number) => setVehicles(vehicles.filter(v => v.id !== id));

  return { vehicles, addVehicle, updateVehicle, deleteVehicle, setVehicles };
};
