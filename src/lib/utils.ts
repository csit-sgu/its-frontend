import { type ClassValue, clsx } from 'clsx';
import { Dayjs } from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Dayjs) {
  return date.format('DD.MM.YYYY HH:mm');
}
