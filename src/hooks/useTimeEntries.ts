import { useLocalStorage } from './useLocalStorage';

export interface TimeEntry {
  id: number;
  date: string;
  clockIn: string;
  clockOut?: string;
  hours: number;
  description: string;
  status: 'active' | 'completed';
}

export interface UseTimeEntriesReturn {
  timeEntries: TimeEntry[];
  activeEntry: TimeEntry | undefined;
  clockIn: (entry: Omit<TimeEntry, 'id' | 'hours' | 'status'>) => void;
  clockOut: (id: number) => void;
  addManualEntry: (entry: Omit<TimeEntry, 'id' | 'status'>) => void;
  deleteEntry: (id: number) => void;
  getTodayHours: () => number;
  getWeekHours: () => number;
}

export function useTimeEntries(): UseTimeEntriesReturn {
  const [timeEntries, setTimeEntries] = useLocalStorage<TimeEntry[]>('carlot_time_entries', []);

  const activeEntry = timeEntries.find(e => e.status === 'active');

  const clockIn = (entry: Omit<TimeEntry, 'id' | 'hours' | 'status'>) => {
    const newEntry: TimeEntry = {
      ...entry,
      id: Date.now(),
      hours: 0,
      status: 'active'
    };
    setTimeEntries([...timeEntries, newEntry]);
  };

  const clockOut = (id: number) => {
    setTimeEntries(timeEntries.map(entry => {
      if (entry.id === id && entry.status === 'active') {
        const clockInTime = new Date(`${entry.date}T${entry.clockIn}`);
        const clockOutTime = new Date();
        const hours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
        
        return {
          ...entry,
          clockOut: clockOutTime.toTimeString().slice(0, 5),
          hours: Math.round(hours * 100) / 100,
          status: 'completed' as const
        };
      }
      return entry;
    }));
  };

  const addManualEntry = (entry: Omit<TimeEntry, 'id' | 'status'>) => {
    const newEntry: TimeEntry = {
      ...entry,
      id: Date.now(),
      status: 'completed'
    };
    setTimeEntries([...timeEntries, newEntry]);
  };

  const deleteEntry = (id: number) => {
    setTimeEntries(timeEntries.filter(e => e.id !== id));
  };

  const getTodayHours = (): number => {
    const today = new Date().toISOString().split('T')[0];
    return timeEntries
      .filter(e => e.date === today && e.status === 'completed')
      .reduce((sum, e) => sum + e.hours, 0);
  };

  const getWeekHours = (): number => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    
    return timeEntries
      .filter(e => {
        const entryDate = new Date(e.date);
        return entryDate >= weekStart && e.status === 'completed';
      })
      .reduce((sum, e) => sum + e.hours, 0);
  };

  return {
    timeEntries,
    activeEntry,
    clockIn,
    clockOut,
    addManualEntry,
    deleteEntry,
    getTodayHours,
    getWeekHours
  };
}
