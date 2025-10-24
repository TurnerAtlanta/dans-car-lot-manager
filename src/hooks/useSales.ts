import { useLocalStorage } from './useLocalStorage';
import { Sale } from '../types';

export const useSales = () => {
  const [sales, setSales] = useLocalStorage<Sale[]>('sales', []);

  const addSale = (sale: Sale) => setSales([...sales, sale]);
  const updateSale = (id: number, updated: Sale) => setSales(sales.map(s => s.id === id ? updated : s));
  const deleteSale = (id: number) => setSales(sales.filter(s => s.id !== id));

  return { sales, addSale, updateSale, deleteSale };
};
