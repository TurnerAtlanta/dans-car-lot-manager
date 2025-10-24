import { Sale, Maintenance } from '../types';

export const calculateTotalSales = (sales: Sale[]): number => sales.reduce((sum, s) => sum + Number(s.salePrice), 0);

export const calculateTotalCosts = (maintenances: Maintenance[]): number => maintenances.reduce((sum, m) => sum + Number(m.cost), 0);
