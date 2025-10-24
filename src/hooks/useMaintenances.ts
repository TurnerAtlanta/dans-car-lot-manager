import { useLocalStorage } from './useLocalStorage';
import { Maintenance } from '../types';

export const useMaintenances = () => {
  const [maintenances, setMaintenances] = useLocalStorage<Maintenance[]>('maintenances', []);

  const addMaintenance = (maintenance: Maintenance) => setMaintenances([...maintenances, maintenance]);
  const updateMaintenance = (id: number, updated: Maintenance) => setMaintenances(maintenances.map(m => m.id === id ? updated : m));
  const deleteMaintenance = (id: number) => setMaintenances(maintenances.filter(m => m.id !== id));

  return { maintenances, addMaintenance, updateMaintenance, deleteMaintenance };
};
