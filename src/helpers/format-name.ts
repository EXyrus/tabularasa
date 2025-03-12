
import type { User } from '@/types';
import type { EmployeeUserResponse } from '@/types/responses';

/**
 * Format the user's name from firstName and lastName
 * @param user User object or EmployeeUserResponse
 * @returns Formatted name string
 */
export const formatName = (user: User | EmployeeUserResponse | null): string => {
  if (!user) return '';
  
  // Handle user with firstName and lastName
  if ('firstName' in user && 'lastName' in user) {
    return `${user.firstName} ${user.lastName}`;
  }
  
  // Fallback for employee responses or other user types
  if ('name' in user && typeof user.name === 'string') {
    return user.name;
  }
  
  return '';
};

export default formatName;
