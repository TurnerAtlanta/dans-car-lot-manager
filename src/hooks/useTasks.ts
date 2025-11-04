import { useLocalStorage } from './useLocalStorage';

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  completed: boolean;
  createdDate?: string;
  completedDate?: string;
}

export interface UseTasksReturn {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdDate'>) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
  getPendingTasks: () => Task[];
  getCompletedTasks: () => Task[];
  getHighPriorityTasks: () => Task[];
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useLocalStorage<Task[]>('carlot_tasks', []);

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'createdDate'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      completed: false,
      createdDate: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ));
  };

  const completeTask = (id: number) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: true, completedDate: new Date().toISOString() } : t
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getPendingTasks = (): Task[] => {
    return tasks.filter(t => !t.completed);
  };

  const getCompletedTasks = (): Task[] => {
    return tasks.filter(t => t.completed);
  };

  const getHighPriorityTasks = (): Task[] => {
    return tasks.filter(t => !t.completed && t.priority === 'High');
  };

  return {
    tasks,
    addTask,
    updateTask,
    completeTask,
    deleteTask,
    getPendingTasks,
    getCompletedTasks,
    getHighPriorityTasks
  };
}
