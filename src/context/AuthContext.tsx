
import React, { createContext, useState, useEffect } from 'react';
import config from '../config';
import { useLogin, useLogout, useTokenQuery, useForgotPassword } from '@/queries/use-auth';
import type { AppType } from '@/types/app-type';
import type { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggingIn: boolean;
  login: (email: string, password: string, appType: AppType) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any, appType: AppType) => Promise<void>;
  forgotPassword: (email: string, appType: AppType) => Promise<void>;
  resetPassword: (data: any, appType: AppType) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const { login: apiLogin, user: loginUser } = useLogin();
  const { logout: apiLogout } = useLogout();
  const { data: tokenData } = useTokenQuery();
  const { forgotPassword: apiForgotPassword } = useForgotPassword();

  useEffect(() => {
    // Check if auth is enabled in the config
    const authEnabled = config.AUTH_ENABLED;
    
    // Initialize dark mode from localStorage settings
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
    
    if (!authEnabled) {
      // If auth is disabled (dev mode), create a mock user
      const mockUser: User = {
        id: '123456',
        name: 'Tabula Rasa',
        email: 'tabula@rasa.ng',
        role: 'Admin',
        appType: 'institution',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      setUser(mockUser);
      localStorage.setItem('sms_user_data', JSON.stringify(mockUser));
      setLoading(false);
    } else {
      // Check if user is already logged in (for auth-enabled environments)
      if (tokenData) {
        // If we have token data from the API, use that
        setUser(loginUser as User);
      } else {
        // Otherwise check local storage
        const userData = localStorage.getItem('sms_user_data');
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (error) {
            console.error('Failed to parse user data from localStorage:', error);
            localStorage.removeItem('sms_user_data');
          }
        }
      }
      setLoading(false);
    }
    
    // Initialize dark mode
    initializeDarkMode();
  }, [user?.appType, tokenData, loginUser]);

  const login = async (email: string, password: string, appType: AppType) => {
    setIsLoggingIn(true);
    try {
      if (config.AUTH_ENABLED) {
        // Use API login
        await apiLogin({ email, password });
      } else {
        // Mock login
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUser: User = {
          id: '123456',
          name: 'John Doe',
          email: email,
          role: appType === 'vendor' ? 'Admin' : appType === 'institution' ? 'Teacher' : 'Parent',
          appType,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        };
        
        // Set user data
        setUser(mockUser);
        
        // Save to localStorage
        localStorage.setItem('sms_auth_token', 'mock_token_' + appType);
        localStorage.setItem('sms_user_data', JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      if (config.AUTH_ENABLED) {
        await apiLogout();
      }
      setUser(null);
      localStorage.removeItem('sms_auth_token');
      localStorage.removeItem('sms_user_data');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenRegistered');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API logout fails, clear local data
      setUser(null);
      localStorage.removeItem('sms_auth_token');
      localStorage.removeItem('sms_user_data');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenRegistered');
    }
  };

  const register = async (data: any, appType: AppType) => {
    setLoading(true);
    try {
      if (config.AUTH_ENABLED) {
        // This would integrate with the register API
        throw new Error('Registration API not implemented yet');
      } else {
        // Mock registration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUser: User = {
          id: '123456',
          name: data.username || 'New User',
          email: data.email,
          role: appType === 'vendor' ? 'Admin' : appType === 'institution' ? 'Teacher' : 'Parent',
          appType,
        };
        
        // Set user data
        setUser(mockUser);
        
        // Save to localStorage
        localStorage.setItem('sms_auth_token', 'mock_token_' + appType);
        localStorage.setItem('sms_user_data', JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string, appType: AppType) => {
    setLoading(true);
    try {
      if (config.AUTH_ENABLED) {
        await apiForgotPassword({ email });
      } else {
        // Mock forgot password request
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Password reset email sent to ${email} for ${appType} app`);
      }
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw new Error('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data: any, appType: AppType) => {
    setLoading(true);
    try {
      if (config.AUTH_ENABLED) {
        // This would integrate with the reset password API
        // Placeholder for API integration
        throw new Error('Reset password API not implemented yet'); 
      } else {
        // Mock password reset
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Password reset successful for ${appType} app`);
      }
    } catch (error) {
      console.error('Reset password failed:', error);
      throw new Error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isLoggingIn,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the useAuth hook directly from this file to maintain backwards compatibility
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
