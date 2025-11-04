import { useLocalStorage } from './useLocalStorage';

export interface FollowUp {
  id: number;
  customer: string;
  vehicle: string;
  date: string;
  notes: string;
  completed: boolean;
  createdDate?: string;
  completedDate?: string;
}

export interface UseFollowUpsReturn {
  followUps: FollowUp[];
  addFollowUp: (followUp: Omit<FollowUp, 'id' | 'completed' | 'createdDate'>) => void;
  updateFollowUp: (id: number, updates: Partial<FollowUp>) => void;
  completeFollowUp: (id: number) => void;
  deleteFollowUp: (id: number) => void;
  getPendingFollowUps: () => FollowUp[];
  getCompletedFollowUps: () => FollowUp[];
  getOverdueFollowUps: () => FollowUp[];
  getFollowUpsByCustomer: (customerName: string) => FollowUp[];
}

export function useFollowUps(): UseFollowUpsReturn {
  const [followUps, setFollowUps] = useLocalStorage<FollowUp[]>('carlot_followups', []);

  const addFollowUp = (followUp: Omit<FollowUp, 'id' | 'completed' | 'createdDate'>) => {
    const newFollowUp: FollowUp = {
      ...followUp,
      id: Date.now(),
      completed: false,
      createdDate: new Date().toISOString()
    };
    setFollowUps([...followUps, newFollowUp]);
  };

  const updateFollowUp = (id: number, updates: Partial<FollowUp>) => {
    setFollowUps(followUps.map(f => 
      f.id === id ? { ...f, ...updates } : f
    ));
  };

  const completeFollowUp = (id: number) => {
    setFollowUps(followUps.map(f => 
      f.id === id ? { ...f, completed: true, completedDate: new Date().toISOString() } : f
    ));
  };

  const deleteFollowUp = (id: number) => {
    setFollowUps(followUps.filter(f => f.id !== id));
  };

  const getPendingFollowUps = (): FollowUp[] => {
    return followUps.filter(f => !f.completed);
  };

  const getCompletedFollowUps = (): FollowUp[] => {
    return followUps.filter(f => f.completed);
  };

  const getOverdueFollowUps = (): FollowUp[] => {
    const today = new Date();
    return followUps.filter(f => {
      if (f.completed) return false;
      const dueDate = new Date(f.date);
      return dueDate < today;
    });
  };

  const getFollowUpsByCustomer = (customerName: string): FollowUp[] => {
    return followUps.filter(f => f.customer === customerName);
  };

  return {
    followUps,
    addFollowUp,
    updateFollowUp,
    completeFollowUp,
    deleteFollowUp,
    getPendingFollowUps,
    getCompletedFollowUps,
    getOverdueFollowUps,
    getFollowUpsByCustomer
  };
}
