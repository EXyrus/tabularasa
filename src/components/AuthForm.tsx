
import React from 'react';
import { Form, Input, Button, Typography, Divider, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

type AppType = 'vendor' | 'institution' | 'guardian';
type FormType = 'login' | 'register' | 'forgotPassword' | 'resetPassword';

interface AuthFormProps {
  appType: AppType;
  formType: FormType;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ appType, formType, onSubmit, loading = false }) => {
  const [form] = Form.useForm();

  // Get app-specific styling
  const getAppColor = () => {
    switch (appType) {
      case 'vendor':
        return 'bg-sms-vendor hover:bg-sms-vendor/90';
      case 'institution':
        return 'bg-sms-institution hover:bg-sms-institution/90';
      case 'guardian':
        return 'bg-sms-guardian hover:bg-sms-guardian/90';
      default:
        return 'bg-sms-blue hover:bg-sms-blue/90';
    }
  };

  // Get form title based on form type
  const getTitle = () => {
    switch (formType) {
      case 'login':
        return 'Welcome Back';
      case 'register':
        return 'Create Account';
      case 'forgotPassword':
        return 'Forgot Password';
      case 'resetPassword':
        return 'Reset Password';
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 card-glass animate-scale-in">
      <div className="text-center mb-6">
        <div className={`w-16 h-1 mx-auto ${getAppColor().split(' ')[0]} rounded-full mb-4`}></div>
        <Title level={3} className="!mb-2">{getTitle()}</Title>
        <Text type="secondary" className="block mb-6 capitalize">{appType} Portal</Text>
      </div>

      <Form
        form={form}
        name={`${appType}-${formType}`}
        onFinish={onSubmit}
        layout="vertical"
        requiredMark={false}
        className="space-y-4"
      >
        {/* Email field - shown in all forms except resetPassword */}
        {formType !== 'resetPassword' && (
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<MailOutlined className="text-gray-400 mr-2" />} 
              placeholder="Email" 
              size="large" 
              className="rounded-lg" 
            />
          </Form.Item>
        )}

        {/* Username field - only shown in register form */}
        {formType === 'register' && (
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please enter your username' },
              { min: 4, message: 'Username must be at least 4 characters' }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400 mr-2" />} 
              placeholder="Username" 
              size="large" 
              className="rounded-lg" 
            />
          </Form.Item>
        )}

        {/* Password field - shown in login, register, and resetPassword forms */}
        {(formType === 'login' || formType === 'register' || formType === 'resetPassword') && (
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              formType === 'register' ? { min: 8, message: 'Password must be at least 8 characters' } : {}
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400 mr-2" />} 
              placeholder="Password" 
              size="large" 
              className="rounded-lg" 
            />
          </Form.Item>
        )}

        {/* Confirm Password field - only shown in register and resetPassword forms */}
        {(formType === 'register' || formType === 'resetPassword') && (
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400 mr-2" />} 
              placeholder="Confirm Password" 
              size="large" 
              className="rounded-lg" 
            />
          </Form.Item>
        )}

        {/* Reset Code field - only shown in resetPassword form */}
        {formType === 'resetPassword' && (
          <Form.Item
            name="resetCode"
            rules={[{ required: true, message: 'Please enter the reset code' }]}
          >
            <Input 
              placeholder="Reset Code" 
              size="large" 
              className="rounded-lg" 
            />
          </Form.Item>
        )}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
            className={`h-12 text-white ${getAppColor()} border-none font-medium text-base rounded-lg`}
          >
            {formType === 'login' ? 'Sign In' : 
             formType === 'register' ? 'Create Account' :
             formType === 'forgotPassword' ? 'Send Reset Link' : 'Reset Password'}
          </Button>
        </Form.Item>

        <Divider plain>
          <Text type="secondary">OR</Text>
        </Divider>

        {/* Footer links */}
        <div className="text-center">
          {formType === 'login' && (
            <Space direction="vertical" size="middle" className="w-full">
              <Link to={`/${appType}/forgot-password`} className="text-sms-blue hover:underline">
                Forgot password?
              </Link>
              <Text type="secondary">
                Don't have an account?{' '}
                <Link to={`/${appType}/register`} className="text-sms-blue hover:underline">
                  Sign up
                </Link>
              </Text>
            </Space>
          )}

          {formType === 'register' && (
            <Text type="secondary">
              Already have an account?{' '}
              <Link to={`/${appType}/login`} className="text-sms-blue hover:underline">
                Sign in
              </Link>
            </Text>
          )}

          {(formType === 'forgotPassword' || formType === 'resetPassword') && (
            <Link to={`/${appType}/login`} className="text-sms-blue hover:underline">
              Back to login
            </Link>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
