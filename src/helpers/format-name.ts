
import type { Student, User } from '@/types';

/**
 * Helper function to format a user or student name
 * @param user User or Student object
 * @returns Formatted name string
 */
export const formatName = (user: User | Student | null): string => {
  if (!user) return '';

  if ('firstName' in user && 'lastName' in user) {
    return `${user.firstName} ${user.lastName}`;
  }
  
  if ('name' in user && user.name) {
    return user.name;
  }
  
  return '';
};

export default formatName;
