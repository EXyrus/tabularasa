import { Permission } from './institution.d';
import { Attendance } from './attendance';
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

export type Student = User & {
    registrationNumber: string;
    dateOfBirth: string;
    gender: Gender;
    institutionId: string;
    organizationId: string;
    unit: string;
    level: string;
    status: 'pending' | 'active' | 'inactive' | 'terminated';
    createdAt: string;
    guardianName?: string;
    guardianPhoneNumber?: string;
    guardianEmail?: string;
    guardianAddress?: string;
    attendance?: Attendance[];
};
