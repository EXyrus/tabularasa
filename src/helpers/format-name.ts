
import type { User, EmployeeUserResponse } from '@/types';

/**
 * Formats a user's name from firstName and lastName properties
 */
export const formatName = (user: User | EmployeeUserResponse | null | undefined): string => {
  if (!user) return '';
  
  return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
};
