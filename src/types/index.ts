
// Re-export all types from their respective module files
import type { Event, RecipientGroup, Organization, OrganizationNode } from './event';
import type { FinanceTransaction } from './finance';
import type { UpdatePasswordPayload } from './auth';
import type { Student as StudentType } from './student';
import type { User, UserRole, Employee } from './users';
import type { Payment, Transaction } from './finance';
import type { SchoolResponse, InstitutionResponse, InstitutionsResponse, 
  StudentDashboardResponse, StudentData, SuspensionData, SingleEmployeeResponse } from './responses';

// Export all types from their respective files
export * from './app';
export * from './auth';
export * from './bank-account';
export * from './contexts';
export * from './event';
export * from './fetch';
export * from './finance';
export * from './institution';
export * from './payloads';
export * from './service-worker';
export * from './utilities';
export * from './users';
export * from './student';

// Export responses separately to avoid naming conflicts
import type * as ResponseTypes from './responses';
export { ResponseTypes };

// Explicitly re-export to avoid duplicate export warnings
export {
  Event,
  RecipientGroup,
  Organization,
  OrganizationNode,
  FinanceTransaction,
  UpdatePasswordPayload,
  StudentType as Student,
  User,
  UserRole,
  Employee,
  Payment,
  Transaction,
  SchoolResponse,
  InstitutionResponse,
  InstitutionsResponse,
  StudentDashboardResponse,
  StudentData,
  SuspensionData,
  SingleEmployeeResponse
};
