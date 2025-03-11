import type {
  EmployeePayload,
  Gender,
  Institution,
  InstitutionRole,
  Role,
  Permission,
  Student,
  User
} from 'types';

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
  institutions: Institution[];
}

export interface InstitutionsResponse {
  registered: number | string;
  active: number | string;
  inactive: number | string;
  pending: number | string;
  tertiary: number | string;
  secondary: number | string;
  primary: number | string;
}

export type ErrorResponse = {
  message: string;
  statusCode?: number;
};


export type AdminLoginResponse = {
  payload: string;
  user: User;
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
};

export type InstitutionResponse = {
  type: string;
  id: string;
  name: string;
  logo: string;
  status: 'pending' | 'active' | 'inactive';
}[];

