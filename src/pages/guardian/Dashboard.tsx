
import React from 'react';
import { Typography, Card, Row, Col, List, Avatar, Badge, Progress, Space } from 'antd';
import { BookOutlined, CalendarOutlined, NotificationOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const GuardianDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for children
  const children = [
    { 
      id: 1, 
      name: 'Emma Smith', 
      grade: '5th Grade', 
      teacher: 'Ms. Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
      attendance: 98,
      nextClass: 'Mathematics'
    },
    { 
      id: 2, 
      name: 'Noah Smith', 
      grade: '3rd Grade', 
      teacher: 'Mr. Davis',
      avatar: 'https://randomuser.me/api/portraits/men/90.jpg',
      attendance: 95,
      nextClass: 'Science'
    }
  ];
  
  // Mock data for upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Science Project Due', date: '2023-05-15', child: 'Emma Smith' },
    { id: 2, title: 'Field Trip to Museum', date: '2023-05-18', child: 'Noah Smith' },
    { id: 3, title: 'Parent-Teacher Meeting', date: '2023-05-20', child: 'All Children' },
  ];
  
  // Mock data for announcements
  const announcements = [
    { id: 1, title: 'School Closed for Memorial Day', time: '2 days ago', content: 'The school will be closed on Monday, May 29th for Memorial Day.' },
    { id: 2, title: 'Summer Program Registration Open', time: '3 days ago', content: 'Registration for the summer enrichment program is now open. Visit the school website to register.' },
  ];

  return (
    <>
      <HeaderBar 
        appType="guardian" 
        userName={user?.name || 'Guardian User'} 
        userAvatar={user?.avatar} 
      />
      
      <div className="page-container pt-20 animate-fade-in">
        <div className="mb-8">
          <Title level={4} className="!mb-1">Guardian Dashboard</Title>
          <Text type="secondary">Overview of your children's activities and performance</Text>
        </div>
        
        {/* Children Cards */}
        <div className="mb-8">
          <Text strong className="block mb-4">Your Children</Text>
          <Row gutter={[16, 16]}>
            {children.map((child) => (
              <Col xs={24} sm={12} key={child.id}>
                <Card hoverable className="shadow-sm h-full">
                  <div className="flex items-center mb-4">
                    <Avatar src={child.avatar} size={64} />
                    <div className="ml-4">
                      <Title level={5} className="!mb-0">{child.name}</Title>
                      <Text type="secondary">{child.grade} • {child.teacher}</Text>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <Text>Attendance</Text>
                      <Text strong>{child.attendance}%</Text>
                    </div>
                    <Progress percent={child.attendance} showInfo={false} strokeColor="#34C759" />
                  </div>
                  
                  <div className="bg-sms-gray p-3 rounded-lg">
                    <div className="flex items-center">
                      <BookOutlined className="mr-2 text-sms-guardian" />
                      <Text>Next Class: <Text strong>{child.nextClass}</Text></Text>
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
                  <CalendarOutlined className="text-sms-guardian" />
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
                      <Badge color="gold" text={item.child} />
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          
          {/* Announcements */}
          <Col xs={24} md={12}>
            <Card 
              title={
                <Space>
                  <NotificationOutlined className="text-sms-guardian" />
                  <span>Announcements</span>
                </Space>
              } 
              className="shadow-sm mb-8 h-full"
            >
              <List
                dataSource={announcements}
                renderItem={item => (
                  <List.Item>
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <Text strong>{item.title}</Text>
                        <Text type="secondary">{item.time}</Text>
                      </div>
                      <Text type="secondary">{item.content}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
      
      <BottomNavigation appType="guardian" />
    </>
  );
};

export default GuardianDashboard;
