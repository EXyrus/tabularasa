
import React, { createContext, useState, useEffect } from 'react';
import { useTokenQuery, useLogin, useLogout, useInstitutionLogin, useForgotPassword, useUpdatePasswordMutation } from '@/queries/use-auth';
import type {
  AuthContextType,
  User,
  UserRole,
  AppType,
  LoginCredentials,
  UserForgotPasswordRequest,
  EmployeeUserResponse,
  UserResetPasswordRequest,
} from '@/types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<EmployeeUserResponse |User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { data: tokenData, isLoading: isTokenLoading, isSuccess } = useTokenQuery();
  const { user: vendorUser, userRole, login } = useLogin();
  const { user: institutionUser, institutionLogin } = useInstitutionLogin();
  const { logout } = useLogout();
  const { updatePassword } = useUpdatePasswordMutation();
  const { forgotPassword } = useForgotPassword();

  useEffect(() => {
    if (vendorUser) {
      setUser(vendorUser as User);
    } else if (institutionUser) {
      setUser(institutionUser as User);
    }

    if (isSuccess && tokenData?.user) {
      setUser(tokenData.user);
    }

    if (!isTokenLoading) {
      setLoading(false);
    }
  }, [institutionUser, isSuccess, tokenData, vendorUser, isTokenLoading]);

  // Initialize dark mode from localStorage settings
  useEffect(() => {
    const initializeDarkMode = () => {
      // Check settings for current user type or default to vendor
      const appType = user?.appType || 'vendor';
      const settingsKey = `sms_settings_${appType}`;
      
      try {
        const storedSettings = localStorage.getItem(settingsKey);
        if (storedSettings) {
          const settings = JSON.parse(storedSettings);
          if (settings.darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      } catch (error) {
        console.error('Failed to parse settings for dark mode:', error);
      }
    };
    
    initializeDarkMode();
  }, [user?.appType]);

 

  const value: AuthContextType = {
    user,
    userRole,
    isLoggingIn: isTokenLoading,
    login,
    institutionLogin,
    logout,
    forgotPassword,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the hook for ease of use
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
