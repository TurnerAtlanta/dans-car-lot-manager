import { useLocalStorage } from './useLocalStorage';
import { TimeLog } from '../types';

export const useTimeLogs = () => {
  const [timeLogs, setTimeLogs] = useLocalStorage<TimeLog[]>('timeLogs', []);

  const addTimeLog = (timeLog: TimeLog) => setTimeLogs([...timeLogs, timeLog]);
  const updateTimeLog = (id: number, updated: TimeLog) => setTimeLogs(timeLogs.map(tl => tl.id === id ? updated : tl));
  const deleteTimeLog = (id: number) => setTimeLogs(timeLogs.filter(tl => tl.id !== id));

  return { timeLogs, addTimeLog, updateTimeLog, deleteTimeLog };
};
