// Shared constants

export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.insighthunter.app'
  : 'http://localhost:8787';

export const TRANSACTION_CATEGORIES = [
  'Payroll',
  'Marketing',
  'Office Supplies',
  'Software',
  'Travel',
  'Utilities',
  'Rent',
  'Other'
];

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
};

export const CLIENT_STATUS = {
  ACTIVE: 'active',
  TRIAL: 'trial',
  INACTIVE: 'inactive'
};

export const REPORT_TYPES = {
  PL: 'pl',
  BALANCE_SHEET: 'balance_sheet',
  CASH_FLOW: 'cash_flow',
  FORECAST: 'forecast'
};

