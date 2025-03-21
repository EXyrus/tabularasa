
import type { Institution } from './institution';
import type { Employee } from './users';

export type InstitutionStatusPayload = {
  id: string;
  status: 'active' | 'pending' | 'inactive';
};

export type InstitutionDetailsPayload = {
  id: string;
  name?: string;
  institutionType?: string;
  email?: string;
  phoneNumber?: string;
};

export type CreateInstitutionDetailsPayload = {
  type: string;
  color?: string;
  logo?: string;
  name?: string;
  email?: string;
  slug?: string;
  phoneNumber?: string;
  moduleIds: string[];
};

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

export type ModulePayload = {
  institutionId?: string;
  moduleIds?: string[];
};

export type InstitutionRolePayload = {
  name: string;
  description: string;
  permissionIds: string[];
};

export type InstitutionSettingsPayload = {
  id?: string;
  slug?: string;
  logo?: string;
  color?: string;
};

export type EmployeePayload = {
  id: string;
};

export type BankAccountPayload = {
  bank: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  password?: string;
};
