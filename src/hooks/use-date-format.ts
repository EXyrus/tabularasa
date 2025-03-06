
import dayjs from 'dayjs';

/**
 * Formats a date string to use with Ant Design DatePicker components
 * This helps avoid the "date.isValid is not a function" error
 * 
 * @param dateString - Date string to format
 * @returns Dayjs object or null if date is invalid
 */
export function formatDate(dateString: string | null | undefined) {
  if (!dateString) return null;
  
  // Convert string to dayjs object
  const date = dayjs(dateString);
  
  // Check if date is valid
  if (!date.isValid()) return null;
  
  return date;
}

/**
 * Custom hook for date utilities
 */
export default function useDateFormat() {
  return {
    formatDate
  };
}
