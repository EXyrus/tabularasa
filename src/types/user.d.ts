import { AppType } from "./app";
import { Permission } from './institution.d';
import { Attendance } from './attendance';
import { Role } from './institution';

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photo?: string;
  role: string;
  appType: AppType;
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