
export type AppType = 'vendor' | 'institution' | 'guardian';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  payload: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  appType: AppType;
}

export interface AdminLoginResponse {
  user: User;
  payload: string;
}

export interface InstitutionLoginResponse {
  user: User;
  payload: string;
}

export interface EmployeeUserResponse extends User {
  institutionId: string;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}

export interface UserForgotPasswordRequest {
  email: string;
}

export interface UserResetPasswordRequest {
  email?: string;
  password: string;
  confirmPassword: string;
  resetCode: string;
}
