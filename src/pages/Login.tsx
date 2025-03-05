
import React, { useState } from 'react';
import { message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { appType } = useParams<{ appType: 'vendor' | 'institution' | 'guardian' }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // Default to 'vendor' if appType is not valid
  const validAppType = appType || 'vendor';
  
  // For institution, direct to the specialized login
  if (validAppType === 'institution') {
    navigate('/institution-login');
    return null;
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(values.email, values.password, validAppType);
      message.success('Login successful!');
      navigate(`/${validAppType}/dashboard`);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex flex-col justify-center items-center p-4">
      <AuthForm
        appType={validAppType}
        formType="login"
        onSubmit={handleLogin}
        loading={loading}
      />
    </div>
  );
};

export default Login;
