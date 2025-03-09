
import { Employee } from '@/types';

export const getRole = (employee: Employee | null | undefined): string => {
  if (!employee) return '';
  
  if (employee.roles && employee.roles.length > 0) {
    return employee.roles[0].name;
  }
  
  return employee.role || '';
};

export default getRole;
