
import { AppType } from "./app";
import { BankAccount } from './bank-account';

export interface Permission {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Institution {
  id: string;
  name: string;
  slug: string;
  logo: string;
  color: string;
  type: string;
  email: string;
  phoneNumber: string;
  status: 'pending' | 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionRole {
  id: string;
  name: string;
  description: string;
  institutionId: string;
  permissionIds: string[];
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionTheme {
  data: {
    id: string;
    color: string;
    logo: string;
    name: string;
  };
}

export interface Module {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Event and RecipientGroup types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  allDay?: boolean;
  type?: string;
}

export interface RecipientGroup {
  id: string;
  name: string;
  type?: string;
}

// Finance types
export interface FinanceTransaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  paymentMethod?: string;
}

// Response types
export interface InstitutionResponse {
  institution: Institution;
}

export interface InstitutionsResponse {
  institutions: Institution[];
  total: number;
}

export type { BankAccount };
