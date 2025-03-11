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
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Vendor = User & {};

type UserRole = 'vendor' | 'employee' | 'student' | 'guest';

export type Gender = 'male' | 'female';

export type Employee = User & {
  organizationId?: string;
  institutionId?: string;
  status?: string;
  roles?: Role[];
  permissions?: Permission;
};

export type Employee = User & {
  organizationId?: string;
  institutionId?: string;
  status?: string;
  roles?: Role[];
  permissions?: Permission[];
};
