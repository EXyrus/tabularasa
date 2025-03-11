import type { Institution } from './institution';
import type { Employee } from './user';

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

export interface InstitutionStatusPayload {
  id: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface InstitutionDetailsPayload {
  id: string;
  name?: string;
  institutionType?: string;
  email?: string;
  phoneNumber?: string;
}

export interface CreateInstitutionDetailsPayload {
  name: string;
  email: string;
  phoneNumber: string;
  type: string;
}

export interface InstitutionDetailsPayload {
  id: string;
  name?: string;
  institutionType?: string;
  email?: string;
  phoneNumber?: string;
}

export interface BankAccountPayload {
  bank: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  password?: string;
}