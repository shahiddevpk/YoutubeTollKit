import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return parseFloat((num / 1_000_000_000).toPrecision(3)) + 'B';
  }
  if (num >= 1_000_000) {
    return parseFloat((num / 1_000_000).toPrecision(3)) + 'M';
  }
  if (num >= 1_000) {
    return parseFloat((num / 1_000).toPrecision(3)) + 'K';
  }
  return num.toLocaleString();
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
