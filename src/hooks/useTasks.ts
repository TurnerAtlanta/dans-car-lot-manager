import { useLocalStorage } from './useLocalStorage';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const addTask = (task: Task) => setTasks([...tasks, task]);
  const updateTask = (id: number, updated: Task) => setTasks(tasks.map(t => t.id === id ? updated : t));
  const deleteTask = (id: number) => setTasks(tasks.filter(t => t.id !== id));

  return { tasks, addTask, updateTask, deleteTask };
};
