
import React, { createContext, useContext, useState, useEffect } from 'react';

type AppType = 'vendor' | 'institution' | 'guardian';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  appType: AppType;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, appType: AppType) => Promise<void>;
  logout: () => void;
  register: (data: any, appType: AppType) => Promise<void>;
  forgotPassword: (email: string, appType: AppType) => Promise<void>;
  resetPassword: (data: any, appType: AppType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('sms_user_data');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        localStorage.removeItem('sms_user_data');
      }
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would connect to a backend
  const login = async (email: string, password: string, appType: AppType) => {
    setLoading(true);
    try {
      // This would be an API call in a real app
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
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sms_auth_token');
    localStorage.removeItem('sms_user_data');
  };

  const register = async (data: any, appType: AppType) => {
    setLoading(true);
    try {
      // This would be an API call in a real app
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
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock success
      console.log(`Password reset email sent to ${email} for ${appType} app`);
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
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock success
      console.log(`Password reset successful for ${appType} app`);
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
    login,
    logout,
    register,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
