
// Base types
export * from './app';

// Auth related types
export * from './auth';

// Bank account types
export * from './bank-account';

// Context types
export * from './contexts';

// Event types
export type { Event, RecipientGroup } from './event';

// Fetch related types
export * from './fetch';

// Finance types
export type { 
  FinanceTransaction,
  Paystack,
  Transaction 
} from './finance';

// Institution types
export * from './institution';

// Payload types
export * from './payloads';

// Response types
export type { 
  AdminLoginResponse,
  EmployeeUserResponse,
  InstitutionLoginResponse,
  LoginResponse,
  LoginCredentials,
  TokenResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest
} from './auth';

export type { BankAccountResponse } from './bank-account';

export type { EmployeePayload } from './payloads';

// Service worker types
export * from './service-worker';

// Student types
export * from './student';

// User types
export * from './user';

// Utility types
export * from './utilities';

// Explicitly add the institution types needed
export type { InstitutionResponse, InstitutionsResponse } from './institution';

// Add or export types for InstitutionStatusPayload and InstitutionDetailsPayload
export interface InstitutionStatusPayload {
  id: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface InstitutionDetailsPayload {
  id: string;
  name?: string;
  institutionType?: string;
}

export interface CreateInstitutionDetailsPayload {
  name: string;
  email: string;
  phoneNumber: string;
  type: string;
}
