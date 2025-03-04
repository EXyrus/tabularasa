
import React, { useState } from 'react';
import { Dropdown, Menu, Typography, Space } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { cn } from '@/lib/utils';

export interface ContextMenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface ListItemWithContextProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  menuItems: ContextMenuItem[];
  className?: string;
  active?: boolean;
  disabled?: boolean;
  extra?: React.ReactNode;
}

export const ListItemWithContext: React.FC<ListItemWithContextProps> = ({
  title,
  description,
  icon,
  onClick,
  menuItems,
  className,
  active = false,
  disabled = false,
  extra,
}) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleMenuClick = (e: any) => {
    e.domEvent.stopPropagation();
    const item = menuItems.find(item => item.key === e.key);
    if (item && item.onClick) {
      item.onClick();
    }
    setMenuVisible(false);
  };

  const handleMenuVisibleChange = (flag: boolean) => {
    setMenuVisible(flag);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item
          key={item.key}
          disabled={item.disabled}
          danger={item.danger}
          icon={item.icon}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 border rounded-md mb-2 transition-all',
        active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex items-center flex-1">
        {icon && <div className="mr-3">{icon}</div>}
        <div className="flex-1 min-w-0">
          <Typography.Text
            className="block font-medium text-gray-900"
            ellipsis={{ tooltip: title }}
          >
            {title}
          </Typography.Text>
          {description && (
            <Typography.Text
              className="block text-sm text-gray-500"
              ellipsis={{ tooltip: description }}
            >
              {description}
            </Typography.Text>
          )}
        </div>
      </div>
      
      <Space>
        {extra}
        <Dropdown 
          overlay={menu} 
          trigger={['click']} 
          visible={menuVisible}
          onVisibleChange={handleMenuVisibleChange}
          placement="bottomRight"
        >
          <div 
            className="p-1 hover:bg-gray-100 rounded-full cursor-pointer" 
            onClick={e => e.stopPropagation()}
          >
            <EllipsisOutlined className="text-gray-500 text-lg" />
          </div>
        </Dropdown>
      </Space>
    </div>
  );
};

export default ListItemWithContext;
