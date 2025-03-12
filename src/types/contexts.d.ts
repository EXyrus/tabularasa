
import type { 
    User, 
    UserRole, 
    LoginCredentials,
    UserForgotPasswordRequest,
    UserResetPasswordRequest
} from '@/types';
import type { EmployeeUserResponse } from '@/types/responses';

export type AuthContextType = {
    user: User | EmployeeUserResponse | null;
    userRole?: UserRole;
    isLoggingIn: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    institutionLogin: (url: string, credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (data: UserForgotPasswordRequest) => Promise<void>;
    updatePassword: (data: UserResetPasswordRequest) => Promise<void>;
    resetPassword: (data: UserResetPasswordRequest) => Promise<void>;
};

export type Theme = 'light' | 'dark' | 'system';

export type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
