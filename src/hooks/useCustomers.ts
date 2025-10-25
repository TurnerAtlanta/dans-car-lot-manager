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
      } catch (err
