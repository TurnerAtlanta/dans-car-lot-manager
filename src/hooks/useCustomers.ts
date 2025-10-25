import { useState, useEffect } from 'react';
import { Customer, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT || 'https://dans-car-lot-manager.workers.dev';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/customers`);
        const result: ApiResponse<Customer[]> = await response.json();
        if (result.error) throw new Error(result.error);
        setCustomers(result.data || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const addCustomer = async (customer: Omit<Customer, 'id'>) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      const result: ApiResponse<{ id: number }> = await response.json();
      if (result.error) throw new Error(result.error);
      setCustomers([...customers, { ...customer, id: result.data!.id }]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id: number, updated: Customer) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!response.ok) {
        const result: ApiResponse<never> = await response.json();
        throw new Error(result.error || 'Failed to update customer');
      }
      setCustomers(customers.map(c => c.id === id ? updated : c));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const result: ApiResponse<never> = await response.json();
        throw new Error(result.error || 'Failed to delete customer');
      }
      setCustomers(customers.filter(c => c.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { customers, addCustomer, updateCustomer, deleteCustomer, loading, error };
};
