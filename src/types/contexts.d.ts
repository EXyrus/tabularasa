import type { User, UserRole } from './users';
import type { EmployeeUserResponse } from './responses';
import type {
    LoginCredentials,
    UserForgotPasswordRequest,
    UserResetPasswordRequest
} from './auth';

export type AuthContextType = {
    user: User | EmployeeUserResponse | null;
    userRole: UserRole;
    isLoggingIn: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    institutionLogin: (
        url: string,
        credentials: LoginCredentials
    ) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (params: UserForgotPasswordRequest) => Promise<void>;
    updatePassword: (variables: UserResetPasswordRequest) => Promise<void>;
};

export type Theme = 'light' | 'dark' | 'system';

export type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
