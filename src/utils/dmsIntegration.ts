import { Vehicle, Customer, Sale } from '../types';

interface DMSData {
  vehicles?: Vehicle[];
  customers?: Customer[];
  sales?: Sale[];
}

export const syncDMS = async (): Promise<void> => {
  const endpoint = import.meta.env.VITE_DMS_API_ENDPOINT as string;
  if (!endpoint) throw new Error('DMS endpoint not configured.');

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Failed to fetch DMS data.');

  const data: DMSData = await response.json();
  // Note: Actual data update requires hook usage in components, as hooks can't be called here.
};
