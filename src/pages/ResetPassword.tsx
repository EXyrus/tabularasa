
import React, { useState } from 'react';
import { message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { UserResetPasswordRequest } from '@/types/auth';

const ResetPassword: React.FC = () => {
  const { appType } = useParams<{ appType: 'vendor' | 'institution' | 'guardian' }>();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  // Default to 'vendor' if appType is not valid
  const validAppType = appType || 'vendor';

  const handleResetPassword = async (values: { password: string; confirmPassword: string; resetCode: string }) => {
    try {
      setLoading(true);
      const resetData: UserResetPasswordRequest = {
        token: values.resetCode,
        password: values.password,
        confirmPassword: values.confirmPassword
      };
      
      await resetPassword(resetData);
      message.success('Password reset successful!');
      navigate(`/${validAppType}/login`);
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
        formType="resetPassword"
        onSubmit={handleResetPassword}
        loading={loading}
      />
    </div>
  );
};

export default ResetPassword;
