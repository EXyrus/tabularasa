
import React from 'react';
import { Typography, Card, Row, Col, Statistic, Space, List, Avatar } from 'antd';
import { 
  TeamOutlined, 
  BookOutlined, 
  CalendarOutlined, 
  CheckCircleOutlined, 
  SettingOutlined, 
  DollarOutlined, 
  UserOutlined, 
  BellOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import ListItemWithContext from '../../components/ListItemWithContext';

const { Title, Text } = Typography;

const InstitutionDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data for statistics
  const stats = [
    { title: 'Total Students', value: 856, icon: <TeamOutlined />, color: 'text-blue-500' },
    { title: 'Classes', value: 42, icon: <BookOutlined />, color: 'text-green-500' },
    { title: 'Attendance', value: '94%', icon: <CheckCircleOutlined />, color: 'text-purple-500' },
  ];
  
  // Mock data for menu items
  const menuItems = [
    { 
      title: 'Control Panel', 
      icon: <SettingOutlined className="text-blue-500" />, 
      path: '/institution/control-panel',
      description: 'System settings and configuration'
    },
    { 
      title: 'Finances', 
      icon: <DollarOutlined className="text-green-500" />, 
      path: '/institution/finances',
      description: 'Manage fees, payments and expenses'
    },
    { 
      title: 'Students', 
      icon: <TeamOutlined className="text-orange-500" />, 
      path: '/institution/students',
      description: 'Student records and information'
    },
    { 
      title: 'Employees', 
      icon: <UserOutlined className="text-purple-500" />, 
      path: '/institution/employees',
      description: 'Staff and teacher management'
    },
    { 
      title: 'Class Management', 
      icon: <BookOutlined className="text-red-500" />, 
      path: '/institution/classes',
      description: 'Schedules, subjects and curriculum'
    },
    { 
      title: 'Events/Notifications', 
      icon: <BellOutlined className="text-amber-500" />, 
      path: '/institution/events',
      description: 'School events and announcements'
    },
  ];
  
  // Mock data for upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2023-05-15', time: '14:00 - 16:00' },
    { id: 2, title: 'Science Fair', date: '2023-05-20', time: '09:00 - 15:00' },
    { id: 3, title: 'Board Meeting', date: '2023-05-25', time: '13:00 - 14:30' },
  ];
  
  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'Jane Smith', action: 'Added new student', time: '2 hours ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, user: 'Mike Johnson', action: 'Updated class schedule', time: '5 hours ago', avatar: 'https://randomuser.me/api/portraits/men/35.jpg' },
    { id: 3, user: 'Sarah Williams', action: 'Sent report to parents', time: '1 day ago', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 4, user: 'David Clark', action: 'Created new announcement', time: '2 days ago', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  ];

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <HeaderBar 
        appType="institution" 
        userName={user?.name || 'Institution User'} 
        userAvatar={user?.avatar} 
      />
      
      <div className="page-container pt-20 animate-fade-in">
        <div className="mb-8">
          <Title level={4} className="!mb-1">Institution Dashboard</Title>
          <Text type="secondary">Overview of school performance and activities</Text>
        </div>
        
        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          {stats.map((stat, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card hoverable className="shadow-sm h-full">
                <Statistic 
                  title={
                    <Space>
                      <span className={stat.color}>{stat.icon}</span>
                      <span>{stat.title}</span>
                    </Space>
                  }
                  value={stat.value} 
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Menu Items */}
        <div className="mb-8">
          <Title level={5} className="mb-4">Quick Access</Title>
          <Row gutter={[16, 16]}>
            {menuItems.map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card 
                  hoverable 
                  className="shadow-sm h-full cursor-pointer"
                  onClick={() => handleMenuItemClick(item.path)}
                >
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-3">{item.icon}</div>
                    <div>
                      <Title level={5} className="!mb-0">{item.title}</Title>
                      <Text type="secondary">{item.description}</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        
        {/* Two column layout for desktop */}
        <Row gutter={[16, 16]}>
          {/* Upcoming Events */}
          <Col xs={24} md={12}>
            <Card 
              title={
                <Space>
                  <CalendarOutlined className="text-sms-institution" />
                  <span>Upcoming Events</span>
                </Space>
              } 
              className="shadow-sm mb-8 h-full"
            >
              <List
                dataSource={upcomingEvents}
                renderItem={item => (
                  <ListItemWithContext
                    key={item.id}
                    content={
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-1">
                          <Text strong>{item.title}</Text>
                          <Text type="secondary">{item.date}</Text>
                        </div>
                        <Text type="secondary">{item.time}</Text>
                      </div>
                    }
                    menuItems={[
                      { label: 'View Details', key: 'view' },
                      { label: 'Edit Event', key: 'edit' },
                      { label: 'Delete Event', key: 'delete', danger: true }
                    ]}
                    onMenuClick={(key) => console.log(`Event ${item.id}: ${key}`)}
                  />
                )}
              />
            </Card>
          </Col>
          
          {/* Recent Activities */}
          <Col xs={24} md={12}>
            <Card 
              title="Recent Activities" 
              className="shadow-sm mb-8 h-full"
            >
              <List
                dataSource={recentActivities}
                renderItem={item => (
                  <ListItemWithContext
                    key={item.id}
                    content={
                      <div className="flex items-center w-full">
                        <Avatar src={item.avatar} />
                        <div className="ml-3 flex-grow">
                          <div>{item.user}</div>
                          <div className="text-gray-500">{item.action}</div>
                        </div>
                        <Text type="secondary">{item.time}</Text>
                      </div>
                    }
                    menuItems={[
                      { label: 'View Details', key: 'view' },
                      { label: 'Mark as Read', key: 'mark-read' },
                      { label: 'Remove', key: 'remove', danger: true }
                    ]}
                    onMenuClick={(key) => console.log(`Activity ${item.id}: ${key}`)}
                  />
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
      
      <BottomNavigation appType="institution" />
    </>
  );
};

export default InstitutionDashboard;
