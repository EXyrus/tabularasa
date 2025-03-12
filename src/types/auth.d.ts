
import type { EmployeeUserResponse } from './responses';
import type { User, UserRole } from './users';

export type LoginCredentials = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterDetails = {
  firstName: string;
  lastLame: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
};

export type AuthProviderType = {
  isAuthenticated: boolean;
  user: User | null;
  signin(user: User): Promise<void>;
  signout(): Promise<void>;
};

export type UserResetPasswordRequest = {
  token: string;
  password: string;
  confirmed: string;
  email: string;
  confirmPassword: string; // Changed from optional to required
};

export type UserForgotPasswordRequest = {
  email: string;
};

export type TokenResponse = {
  user: User;
  payload: string;
};

export type TokenPayload = {
  role: UserRole;
  token: string;
};

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};
