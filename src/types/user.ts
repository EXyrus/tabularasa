
import { AppType } from "./app";
import { Permission } from './institution';
import { Attendance } from './student';
import { Role } from './institution';

export type UserRole = 'vendor' | 'employee' | 'student' | 'guest';

export type Gender = 'male' | 'female';

export type User = {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  photo?: string;
  avatar?: string;
  role: string | UserRole;
  appType: AppType;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Vendor = User & {};

export type Employee = User & {
    organizationId?: string;
    institutionId?: string;
    status?: string;
    roles?: Role[];
    permissions?: Permission[];
};
