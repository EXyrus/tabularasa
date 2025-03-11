
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
};
