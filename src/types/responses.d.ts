
import type {
  Gender,
  Institution,
  InstitutionRole,
  Role,
  Permission,
  User,
  UserRole
} from '@/types';

export type ErrorResponse = {
  message: string;
  statusCode?: number;
};

export type InstitutionLoginResponse = {
  payload: string;
  user: EmployeeUserResponse;
};

export type EmployeeUserResponse = {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  password: string | null;
  institutionId: string | null;
  status: string | null;
  phoneNumber: string;
  createdAt: string;
  roles?: Role[];
  permissions: Permission[];
  name?: string; // Add name property for compatibility
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  user?: User;
};

export type SchoolResponse = {
  students: number | string;
  activeStudents: number | string;
  employee: number | string;
  activeEmployee: number | string;
};

export type SingleEmployeeResponse = EmployeeUserResponse & { role: string[] };

export type AllEmployeeResponse = (EmployeeUserResponse & { role: string[] })[];

export type StudentDashboardResponse = {
  total: number;
  active: number;
  suspended: number;
  students: Student[];
};

export type InstitutionRoleResponse = InstitutionRole[];

// Add Student type interface
export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth?: string;
  phoneNumber?: string;
  email?: string;
  photo: string;
  name?: string;
  status?: string;
  guardianName?: string;
  guardianEmail?: string;
  guardianPhone?: string;
  grade?: string;
  section?: string;
  attendance?: number;
  avatar?: string; // Add avatar as an alternative to photo
};

export type StudentData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    gender: Gender;
    dateOfBirth: string | null;
    phoneNumber: string;
    email: string;
    photo: string;
  };
  unitInfo: {
    level: number;
    unitId: number;
    term: string;
    registrationNumber: string;
    academicYear: string | null;
  };
  guardianInfo: {
    guardianName: string;
    guardianPhoneNumber: string;
    guardianAlternatePhoneNumber: string;
    guardianAddress: string;
    guardianEmail: string;
  };
};

export type SuspensionData = {
  studentId: string;
  reason: string;
  message: string;
  startDate: string;
  endDate: string;
  notifyParent: boolean;
};

export interface BankAccountResponse {
  id: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
}

export interface InstitutionResponse {
  institutions: Array<{
    id: string;
    name: string;
    slug: string;
    type: string;
    logo: string;
    status: 'active' | 'inactive' | 'pending';
    createdAt: string;
    email: string;
  }>;
  type: string;
}

export interface InstitutionsResponse {
  registered: number | string;
  active: number | string;
  inactive: number | string;
  pending: number | string;
  tertiary: number | string;
  secondary: number | string;
  primary: number | string;
  total: number | string;
}

export type AdminLoginResponse = {
  payload: string;
  user: User;
};

// Define Payment type
export type Payment = {
  id: string;
  amount: number;
  description: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  studentId?: string;
  studentName?: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
};

// Define FinanceTransaction type
export type FinanceTransaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  reference: string;
  date: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
};
