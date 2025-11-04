import { useLocalStorage } from './useLocalStorage';

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  status: 'Hot Lead' | 'Warm Lead' | 'Cold Lead' | 'New Lead';
  added: string;
}

export interface UseCustomersReturn {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'added'>) => void;
  updateCustomer: (id: number, updates: Partial<Customer>) => void;
  deleteCustomer: (id: number) => void;
  getCustomerById: (id: number) => Customer | undefined;
  getHotLeads: () => Customer[];
  getWarmLeads: () => Customer[];
  getColdLeads: () => Customer[];
}

export function useCustomers(): UseCustomersReturn {
  const [customers, setCustomers] = useLocalStorage<Customer[]>('carlot_customers', []);

  const addCustomer = (customer: Omit<Customer, 'id' | 'added'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now(),
      added: new Date().toISOString().split('T')[0],
      status: customer.status || 'New Lead'
    };
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (id: number, updates: Partial<Customer>) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const getCustomerById = (id: number): Customer | undefined => {
    return customers.find(c => c.id === id);
  };

  const getHotLeads = (): Customer[] => {
    return customers.filter(c => c.status === 'Hot Lead');
  };

  const getWarmLeads = (): Customer[] => {
    return customers.filter(c => c.status === 'Warm Lead');
  };

  const getColdLeads = (): Customer[] => {
    return customers.filter(c => c.status === 'Cold Lead');
  };

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    getHotLeads,
    getWarmLeads,
    getColdLeads
  };
}
