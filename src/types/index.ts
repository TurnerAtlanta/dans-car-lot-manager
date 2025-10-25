export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  purchasePrice: number;
  reconditioningCost: number;
  mileage: number;
  status: 'available' | 'sold' | 'maintenance';
  stockNumber: string;
  vin?: string;
  photos?: string[];
  dateAdded: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'hot' | 'warm' | 'cold';
  vehicleInterest?: number[];
  lastContactDate?: string;
  testDrive: boolean;
  notes?: string;
}

export interface Sale {
  id: number;
  vehicleId: number;
  customerId: number;
  saleDate: string;
  salePrice: number;
  purchasePrice: number;
  paymentMethod: 'cash' | 'finance';
  salesperson: string;
}

export interface Task {
  id: number;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in progress' | 'completed';
  assignedTo: 'Dan' | 'Boss';
  notes?: string;
}

export interface TimeLog {
  id: number;
  taskId: number;
  startTime: string;
  endTime: string;
  duration: number;
  description?: string;
  user: 'Dan' | 'Boss';
}

export interface Maintenance {
  id: number;
  vehicleId: number;
  description: string;
  date: string;
  cost: number;
  status: 'completed' | 'in progress';
  photos?: string[];
  notes?: string;
}

export interface FollowUp {
  id: number;
  customerId: number;
  date: string;
  notes: string;
  type: 'test_drive' | 'price_quote' | 'trade_in' | 'financing' | 'general' | 'service';
  status: 'pending' | 'completed';
  vehicleId?: number;
}

export interface Appointment {
  id: number;
  type: 'test_drive' | 'service' | 'consultation';
  date: string;
  time: string;
  customerId: number;
  vehicleId?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface DMSApiResponse {
  success: boolean;
  error?: string;
}

export interface User {
  role: 'Dan' | 'Boss';
}

export interface ReportSchedule {
  id: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  deliveryMethod: 'email' | 'sms';
  recipient: string;
}
