import { useLocalStorage } from './useLocalStorage';
import { FollowUp } from '../types';

export const useFollowUps = () => {
  const [followUps, setFollowUps] = useLocalStorage<FollowUp[]>('followUps', []);

  const addFollowUp = (followUp: FollowUp) => setFollowUps([...followUps, followUp]);
  const updateFollowUp = (id: number, updated: FollowUp) => setFollowUps(followUps.map(f => f.id === id ? updated : f));
  const deleteFollowUp = (id: number) => setFollowUps(followUps.filter(f => f.id !== id));

  return { followUps, addFollowUp, updateFollowUp, deleteFollowUp };
};
