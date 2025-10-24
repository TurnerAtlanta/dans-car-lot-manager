import { useLocalStorage } from './useLocalStorage';
import { Customer } from '../types';

export const useCustomers = () => {
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);

  const addCustomer = (customer: Customer) => setCustomers([...customers, customer]);
  const updateCustomer = (id: number, updated: Customer) => setCustomers(customers.map(c => c.id === id ? updated : c));
  const deleteCustomer = (id: number) => setCustomers(customers.filter(c => c.id !== id));

  return { customers, addCustomer, updateCustomer, deleteCustomer };
};
