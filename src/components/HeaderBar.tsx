import React from 'react';
import { Typography, Avatar, Dropdown } from 'antd';
import { formatName } from '@/helpers/format-name';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type HeaderBarProps = {
  appType: 'vendor' | 'institution' | 'guardian';
  userName?: string;
  userAvatar?: string;
  hideActions?: boolean;
};

const HeaderBar: React.FC<HeaderBarProps> = ({ 
  appType, 
  userName, 
  userAvatar,
  hideActions = false 
}) => {
  const { user, logout } = useAuth();
  const displayName = userName || (user ? formatName(user) : '');
  const navigate = useNavigate();

  const items = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => navigate(`/${appType}/profile`),
    },
    {
      key: 'settings',
      label: 'Settings',
      onClick: () => navigate(`/${appType}/settings`),
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: () => logout(),
    },
  ];

  return (
    <div className="header-bar fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        <Typography.Title level={5} className="mb-0">
          {appType.toUpperCase()} Portal
        </Typography.Title>

        {!hideActions && (
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <div className="flex items-center cursor-pointer">
              <Avatar src={userAvatar} size="small" icon={<UserOutlined />} />
              <Typography.Text className="ml-2 dark:text-white">
                {displayName}
              </Typography.Text>
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;

import { UserOutlined } from '@ant-design/icons';
