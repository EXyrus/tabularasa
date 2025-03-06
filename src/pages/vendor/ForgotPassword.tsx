
import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const appType = 'vendor';

  const handleForgotPassword = async (values: { email: string }) => {
    try {
      setLoading(true);
      await forgotPassword(values.email, appType);
      message.success('Password reset link sent to your email!');
      navigate(`/${appType}/reset-password`);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center items-center p-4">
      <AuthForm
        appType={appType}
        formType="forgotPassword"
        onSubmit={handleForgotPassword}
        loading={loading}
      />
    </div>
  );
};

export default ForgotPassword;
