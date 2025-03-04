
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, TeamOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';

type AppType = 'vendor' | 'institution' | 'guardian';

interface BottomNavigationProps {
  appType: AppType;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ appType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const basePath = `/${appType}`;

  // Navigation items for each app type
  const navigationItems = {
    vendor: [
      { icon: <HomeOutlined />, label: 'Home', path: `${basePath}/dashboard` },
      { icon: <TeamOutlined />, label: 'Institutions', path: `${basePath}/institutions` },
      { icon: <FileTextOutlined />, label: 'Reports', path: `${basePath}/reports` },
      { icon: <SettingOutlined />, label: 'Settings', path: `${basePath}/settings` },
    ],
    institution: [
      { icon: <HomeOutlined />, label: 'Home', path: `${basePath}/dashboard` },
      { icon: <TeamOutlined />, label: 'Students', path: `${basePath}/students` },
      { icon: <FileTextOutlined />, label: 'Classes', path: `${basePath}/classes` },
      { icon: <SettingOutlined />, label: 'Settings', path: `${basePath}/settings` },
    ],
    guardian: [
      { icon: <HomeOutlined />, label: 'Home', path: `${basePath}/dashboard` },
      { icon: <TeamOutlined />, label: 'Children', path: `${basePath}/children` },
      { icon: <FileTextOutlined />, label: 'Activities', path: `${basePath}/activities` },
      { icon: <SettingOutlined />, label: 'Profile', path: `${basePath}/profile` },
    ],
  };

  const items = navigationItems[appType];

  return (
    <div className="bottom-nav animate-slide-up">
      <div className="flex justify-around items-center">
        {items.map((item, index) => (
          <button
            key={index}
            className={`nav-item ${pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
