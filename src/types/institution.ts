
import { Role, Permission } from './auth';
import { AppType } from './app';
import { BankAccount } from './bank-account';

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

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecipientGroup {
  id: string;
  name: string;
  description: string;
  institutionId: string;
  recipients: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FinanceTransaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

export { BankAccount };
