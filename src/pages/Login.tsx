
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { setLocalStorageItem } from '@/helpers/local-storage';

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [appType, setAppType] = useState<'vendor' | 'institution' | 'guardian'>('vendor');

  // Determine the app type by checking the URL's pathname
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    let currentAppType: 'vendor' | 'institution' | 'guardian' = 'vendor';
    
    if (path.includes('institution')) {
      currentAppType = 'institution';
    } else if (path.includes('guardian')) {
      currentAppType = 'guardian';
    } else if (path.includes('vendor')) {
      currentAppType = 'vendor';
    }
    
    setAppType(currentAppType);
    
    // Save the app type to localStorage
    setLocalStorageItem('appType', currentAppType);
  }, [location.pathname]);

  // For 'institution', redirect to its specialized login page
  useEffect(() => {
    if (appType === 'institution') {
      navigate('/institution-login');
    }
  }, [appType, navigate]);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login({ 
        email: values.email, 
        password: values.password,
        remember: true
      });
      message.success('Login successful!');
      navigate(`/${appType}/dashboard`);
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Render nothing if already navigating away
  if (appType === 'institution') return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex flex-col justify-center items-center p-4">
      <AuthForm
        appType={appType}
        formType="login"
        onSubmit={handleLogin}
        loading={loading}
      />
    </div>
  );
};

export default Login;
