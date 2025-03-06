
import dayjs from 'dayjs';

/**
 * Formats a date string to be compatible with Ant Design's DatePicker
 * This resolves the "date.isValid is not a function" error that occurs
 * when using the DatePicker with certain date formats
 * 
 * @param dateString Date in string format
 * @returns Formatted dayjs date object or null if invalid
 */
export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return null;
  
  try {
    const date = dayjs(dateString);
    return date.isValid() ? date : null;
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
};

/**
 * Safely converts a date to a string format
 * 
 * @param date Date object, dayjs object, or date string
 * @param format Format string (default: 'YYYY-MM-DD')
 * @returns Formatted date string or empty string if invalid
 */
export const dateToString = (date: any, format = 'YYYY-MM-DD') => {
  if (!date) return '';
  
  try {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid() ? dayjsDate.format(format) : '';
  } catch (error) {
    console.error('Error converting date to string:', error);
    return '';
  }
};

/**
 * Check if a value is a valid date
 * 
 * @param date Value to check
 * @returns Boolean indicating if the value is a valid date
 */
export const isValidDate = (date: any) => {
  if (!date) return false;
  
  try {
    return dayjs(date).isValid();
  } catch (error) {
    return false;
  }
};
