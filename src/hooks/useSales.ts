import { useLocalStorage } from './useLocalStorage';

export interface Sale {
  id: number;
  date: string;
  customer: string;
  vehicle: string;
  stock: string;
  soldPrice: string;
  purchasePrice: string;
  profit: string;
  paymentMethod: 'Cash' | 'Finance' | 'Lease' | 'Trade-in';
  salesperson: string;
  recordedDate?: string;
}

export interface UseSalesReturn {
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'recordedDate'>) => Sale;
  updateSale: (id: number, updates: Partial<Sale>) => void;
  deleteSale: (id: number) => void;
  getSaleByStock: (stock: string) => Sale | undefined;
  getSalesByCustomer: (customerName: string) => Sale[];
  getSalesByDateRange: (startDate: string, endDate: string) => Sale[];
  getTotalRevenue: () => number;
  getTotalProfit: () => number;
  getAverageProfit: () => number;
}

export function useSales(): UseSalesReturn {
  const [sales, setSales] = useLocalStorage<Sale[]>('carlot_sales', []);

  const addSale = (sale: Omit<Sale, 'id' | 'recordedDate'>): Sale => {
    const newSale: Sale = {
      ...sale,
      id: Date.now(),
      recordedDate: new Date().toISOString()
    };
    setSales([...sales, newSale]);
    return newSale;
  };

  const updateSale = (id: number, updates: Partial<Sale>) => {
    setSales(sales.map(s => 
      s.id === id ? { ...s, ...updates } : s
    ));
  };

  const deleteSale = (id: number) => {
    setSales(sales.filter(s => s.id !== id));
  };

  const getSaleByStock = (stock: string): Sale | undefined => {
    return sales.find(s => s.stock === stock);
  };

  const getSalesByCustomer = (customerName: string): Sale[] => {
    return sales.filter(s => s.customer === customerName);
  };

  const getSalesByDateRange = (startDate: string, endDate: string): Sale[] => {
    return sales.filter(s => {
      const saleDate = new Date(s.date);
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
  };

  const getTotalRevenue = (): number => {
    return sales.reduce((sum, sale) => {
      const price = parseFloat(sale.soldPrice?.replace(/[$,]/g, '') || '0');
      return sum + price;
    }, 0);
  };

  const getTotalProfit = (): number => {
    return sales.reduce((sum, sale) => {
      const profit = parseFloat(sale.profit?.replace(/[$,]/g, '') || '0');
      return sum + profit;
    }, 0);
  };

  const getAverageProfit = (): number => {
    if (sales.length === 0) return 0;
    return getTotalProfit() / sales.length;
  };

  return {
    sales,
    addSale,
    updateSale,
    deleteSale,
    getSaleByStock,
    getSalesByCustomer,
    getSalesByDateRange,
    getTotalRevenue,
    getTotalProfit,
    getAverageProfit
  };
}
