
import { AppType } from './app';
import { Permission } from './institution';
import { Attendance } from './student';
import { Role } from './institution';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  phoneNumber: string;
  email: string;
  role: UserRole;
  name: string; // Required for better type safety
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Vendor = User & {};

export type UserRole = 'vendor' | 'employee' | 'student' | 'guest';

export type Gender = 'male' | 'female';

export type Employee = User & {
  organizationId?: string;
  institutionId?: string;
  status?: string;
  roles?: Role[];
  permissions?: Permission[];
};
