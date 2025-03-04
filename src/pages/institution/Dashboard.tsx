
import React from 'react';
import { Typography, Card, Row, Col, Statistic, Space, List, Avatar } from 'antd';
import { TeamOutlined, BookOutlined, CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const InstitutionDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for statistics
  const stats = [
    { title: 'Total Students', value: 856, icon: <TeamOutlined />, color: 'text-blue-500' },
    { title: 'Classes', value: 42, icon: <BookOutlined />, color: 'text-green-500' },
    { title: 'Attendance', value: '94%', icon: <CheckCircleOutlined />, color: 'text-purple-500' },
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
                  <List.Item>
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <Text strong>{item.title}</Text>
                        <Text type="secondary">{item.date}</Text>
                      </div>
                      <Text type="secondary">{item.time}</Text>
                    </div>
                  </List.Item>
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
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.user}
                      description={item.action}
                    />
                    <Text type="secondary">{item.time}</Text>
                  </List.Item>
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
