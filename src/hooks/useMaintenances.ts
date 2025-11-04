import { useLocalStorage } from './useLocalStorage';

export interface MaintenanceRecord {
  id: number;
  stock: string;
  date: string;
  serviceType: string;
  cost: number | string;
  description?: string;
  recordedDate?: string;
}

export interface UseMaintenanceReturn {
  maintenanceRecords: MaintenanceRecord[];
  addMaintenanceRecord: (record: Omit<MaintenanceRecord, 'id' | 'recordedDate'>) => void;
  updateMaintenanceRecord: (id: number, updates: Partial<MaintenanceRecord>) => void;
  deleteMaintenanceRecord: (id: number) => void;
  getMaintenanceByStock: (stock: string) => MaintenanceRecord[];
  getTotalMaintenanceCost: () => number;
  getMaintenanceCostByVehicle: (stock: string) => number;
}

export function useMaintenance(): UseMaintenanceReturn {
  const [maintenanceRecords, setMaintenanceRecords] = useLocalStorage<MaintenanceRecord[]>('carlot_maintenance', []);

  const addMaintenanceRecord = (record: Omit<MaintenanceRecord, 'id' | 'recordedDate'>) => {
    const newRecord: MaintenanceRecord = {
      ...record,
      id: Date.now(),
      recordedDate: new Date().toISOString()
    };
    setMaintenanceRecords([...maintenanceRecords, newRecord]);
  };

  const updateMaintenanceRecord = (id: number, updates: Partial<MaintenanceRecord>) => {
    setMaintenanceRecords(maintenanceRecords.map(r => 
      r.id === id ? { ...r, ...updates } : r
    ));
  };

  const deleteMaintenanceRecord = (id: number) => {
    setMaintenanceRecords(maintenanceRecords.filter(r => r.id !== id));
  };

  const getMaintenanceByStock = (stock: string): MaintenanceRecord[] => {
    return maintenanceRecords.filter(r => r.stock === stock);
  };

  const getTotalMaintenanceCost = (): number => {
    return maintenanceRecords.reduce((sum, record) => {
      const cost = parseFloat(record.cost?.toString().replace(/[$,]/g, '') || '0');
      return sum + cost;
    }, 0);
  };

  const getMaintenanceCostByVehicle = (stock: string): number => {
    return maintenanceRecords
      .filter(r => r.stock === stock)
      .reduce((sum, record) => {
        const cost = parseFloat(record.cost?.toString().replace(/[$,]/g, '') || '0');
        return sum + cost;
      }, 0);
  };

  return {
    maintenanceRecords,
    addMaintenanceRecord,
    updateMaintenanceRecord,
    deleteMaintenanceRecord,
    getMaintenanceByStock,
    getTotalMaintenanceCost,
    getMaintenanceCostByVehicle
  };
}
