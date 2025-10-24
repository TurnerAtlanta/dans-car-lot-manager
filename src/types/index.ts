export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  status: 'available' | 'sold' | 'maintenance';
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Sale {
  id: number;
  vehicleId: number;
  customerId: number;
  saleDate: string;
  salePrice: number;
}

export interface Task {
  id: number;
  description: string;
  dueDate: string;
  status: 'pending' | 'in progress' | 'completed';
}

export interface TimeLog {
  id: number;
  taskId: number;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface Maintenance {
  id: number;
  vehicleId: number;
  description: string;
  date: string;
  cost: number;
}

export interface FollowUp {
  id: number;
  customerId: number;
  date: string;
  notes: string;
}
