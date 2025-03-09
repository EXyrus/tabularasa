
import { User, UserRole } from './user';

export interface TokenPayload {
  token: string;
  refreshToken?: string;
  user?: User;
  expiresIn?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  appType?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface AdminLoginResponse extends LoginResponse {}
export interface InstitutionLoginResponse extends LoginResponse {}
export interface EmployeeUserResponse extends LoginResponse {}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}
