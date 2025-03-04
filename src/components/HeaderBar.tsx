
import React from 'react';
import { Avatar, Typography, Space, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

type AppType = 'vendor' | 'institution' | 'guardian';

interface HeaderBarProps {
  appType: AppType;
  userName: string;
  userAvatar?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ appType, userName, userAvatar }) => {
  const navigate = useNavigate();

  // Color based on app type
  const getAppColor = () => {
    switch (appType) {
      case 'vendor':
        return 'bg-sms-vendor';
      case 'institution':
        return 'bg-sms-institution';
      case 'guardian':
        return 'bg-sms-guardian';
      default:
        return 'bg-sms-blue';
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('sms_auth_token');
    localStorage.removeItem('sms_user_data');
    
    // Navigate to login page
    navigate(`/${appType}/login`);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm animate-slide-down`}>
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${getAppColor()} mr-2`}></div>
          <Text className="text-lg font-medium capitalize">{appType}</Text>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 text-sms-darkGray">
            <BellOutlined style={{ fontSize: '20px' }} />
          </button>
          
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Profile',
                  icon: <UserOutlined />,
                  onClick: () => navigate(`/${appType}/profile`)
                },
                {
                  key: '2',
                  label: 'Logout',
                  icon: <LogoutOutlined />,
                  onClick: handleLogout
                }
              ]
            }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Space className="cursor-pointer">
              <Text className="mr-2 hidden sm:inline">{userName}</Text>
              <Avatar 
                src={userAvatar} 
                icon={!userAvatar && <UserOutlined />} 
                size="default"
                className="border-2 border-gray-100"
              />
            </Space>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
