
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

export type LoginCredentials = LoginRequest;

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  payload: string;
}

export interface TokenResponse extends LoginResponse {}

export interface AdminLoginResponse extends LoginResponse {}
export interface InstitutionLoginResponse extends LoginResponse {}
export interface EmployeeUserResponse extends LoginResponse {}

export interface ForgotPasswordRequest {
  email: string;
}

export type UserForgotPasswordRequest = ForgotPasswordRequest;

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export type UserResetPasswordRequest = ResetPasswordRequest;
