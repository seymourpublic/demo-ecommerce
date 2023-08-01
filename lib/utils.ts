import { twMerge } from "tailwind-merge"
import clsx from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'ZAR',
});