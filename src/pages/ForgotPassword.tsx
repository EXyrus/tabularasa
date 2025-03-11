
import React, { useState } from 'react';
import { message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { UserForgotPasswordRequest } from '@/types/auth';

const ForgotPassword: React.FC = () => {
  const { appType } = useParams<{ appType: 'vendor' | 'institution' | 'guardian' }>();
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  // Default to 'vendor' if appType is not valid
  const validAppType = appType || 'vendor';

  const handleForgotPassword = async (values: { email: string }) => {
    try {
      setLoading(true);
      const data: UserForgotPasswordRequest = { email: values.email };
      await forgotPassword(data);
      message.success('Password reset link sent to your email!');
      navigate(`/${validAppType}/reset-password`);
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
        appType={validAppType}
        formType="forgotPassword"
        onSubmit={handleForgotPassword}
        loading={loading}
      />
    </div>
  );
};

export default ForgotPassword;
