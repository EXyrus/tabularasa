
import React, { useState } from 'react';
import { Typography, Card, Form, Input, Button, Avatar, Upload, Divider, Space, Switch } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, BellOutlined, UploadOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const { Title, Text } = Typography;

const GuardianAccount: React.FC = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    
    // Mock API success
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your account information has been successfully updated.",
        duration: 3000
      });
    }, 1000);
  };
  
  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    
    if (info.file.status === 'done') {
      setUploading(false);
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been changed successfully.",
        duration: 3000
      });
    }
  };
  
  return (
    <>
      <HeaderBar 
        appType="guardian" 
        userName={user?.name || 'Guardian User'} 
        userAvatar={user?.avatar} 
      />
      
      <div className="page-container pt-20 pb-24 animate-fade-in">
        <div className="mb-6">
          <Title level={4} className="!mb-1">My Account</Title>
          <Text type="secondary">Update your profile and account settings</Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card className="shadow-sm text-center">
              <div className="mb-4">
                <Avatar 
                  size={100} 
                  src={user?.avatar} 
                  icon={!user?.avatar && <UserOutlined />} 
                />
              </div>
              
              <Upload
                name="avatar"
                showUploadList={false}
                onChange={handleAvatarUpload}
                beforeUpload={() => false}
              >
                <Button 
                  icon={<UploadOutlined />} 
                  loading={uploading}
                  className="mb-4"
                >
                  Change Picture
                </Button>
              </Upload>
              
              <Title level={4} className="!mb-1">{user?.name || 'Guardian User'}</Title>
              <Text type="secondary">{user?.email || 'guardian@example.com'}</Text>
              <Text type="secondary" className="block">Role: Guardian</Text>
              
              <Divider />
              
              <div className="text-left">
                <Text strong className="block mb-2">Account Details</Text>
                <div className="flex items-center mb-2">
                  <MailOutlined className="mr-2 text-gray-500" />
                  <Text>{user?.email || 'guardian@example.com'}</Text>
                </div>
                <div className="flex items-center mb-2">
                  <PhoneOutlined className="mr-2 text-gray-500" />
                  <Text>+1 (555) 123-4567</Text>
                </div>
                <div className="flex items-center">
                  <UserOutlined className="mr-2 text-gray-500" />
                  <Text>Parent/Guardian</Text>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Settings Tabs */}
          <div className="md:col-span-2">
            <Card className="shadow-sm">
              <Title level={5} className="!mb-4">Profile Information</Title>
              
              <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  name: user?.name || 'Guardian User',
                  email: user?.email || 'guardian@example.com',
                  phone: '+1 (555) 123-4567',
                  address: '123 Main St, Anytown, USA',
                }}
              >
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input prefix={<UserOutlined className="text-gray-400" />} />
                </Form.Item>
                
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email address!' }
                  ]}
                >
                  <Input prefix={<MailOutlined className="text-gray-400" />} />
                </Form.Item>
                
                <Form.Item
                  label="Phone Number"
                  name="phone"
                >
                  <Input prefix={<PhoneOutlined className="text-gray-400" />} />
                </Form.Item>
                
                <Form.Item
                  label="Address"
                  name="address"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
                
                <Divider />
                
                <Title level={5} className="!mb-4">Security Settings</Title>
                
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                >
                  <Input.Password prefix={<LockOutlined className="text-gray-400" />} />
                </Form.Item>
                
                <Form.Item
                  label="New Password"
                  name="newPassword"
                >
                  <Input.Password prefix={<LockOutlined className="text-gray-400" />} />
                </Form.Item>
                
                <Form.Item
                  label="Confirm New Password"
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password prefix={<LockOutlined className="text-gray-400" />} />
                </Form.Item>
                
                <Divider />
                
                <Title level={5} className="!mb-4">Notification Settings</Title>
                
                <Space direction="vertical" size="middle" className="w-full mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <Text strong className="block">Email Notifications</Text>
                      <Text type="secondary">Receive email updates about your children</Text>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Text strong className="block">SMS Notifications</Text>
                      <Text type="secondary">Receive text messages for important alerts</Text>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Text strong className="block">App Notifications</Text>
                      <Text type="secondary">Receive push notifications on your device</Text>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </Space>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="bg-sms-guardian">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
      
      <BottomNavigation appType="guardian" />
    </>
  );
};

export default GuardianAccount;
