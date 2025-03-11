import React, { useState } from 'react';
import { Typography, Card, List, Badge, Tag, Button, Tabs, Empty } from 'antd';
import { BellOutlined, MailOutlined, AlertOutlined, CheckOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
  type: 'announcement' | 'message' | 'alert';
  sender?: string;
  student?: string;
}

const GuardianNotifications: React.FC = () => {
  const { user } = useAuth();

  // Mock data for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'NOT001',
      title: 'School Closed for Memorial Day',
      content:
        'Please be informed that the school will be closed on Monday, May 29th for Memorial Day. Classes will resume on Tuesday, May 30th.',
      date: '2023-05-15T10:30:00',
      read: true,
      type: 'announcement',
      sender: 'School Admin',
    },
    {
      id: 'NOT002',
      title: "Emma's Math Test Result",
      content:
        'Emma scored an A on her recent math test. She demonstrated excellent understanding of fractions and decimals. Please congratulate her on this achievement!',
      date: '2023-05-14T14:15:00',
      read: false,
      type: 'message',
      sender: 'Ms. Johnson',
      student: 'Emma Smith',
    },
    {
      id: 'NOT003',
      title: 'Field Trip Permission Slip',
      content:
        "Noah's class will be visiting the Science Museum on May 18th. Please fill out the permission slip and return it by Friday, May 12th.",
      date: '2023-05-10T09:45:00',
      read: false,
      type: 'alert',
      sender: 'Mr. Davis',
      student: 'Noah Smith',
    },
    {
      id: 'NOT004',
      title: 'Parent-Teacher Meeting Schedule',
      content:
        'The annual parent-teacher meetings will be held next week. Please book your slot through the school portal.',
      date: '2023-05-08T11:20:00',
      read: true,
      type: 'announcement',
      sender: 'School Admin',
    },
    {
      id: 'NOT005',
      title: 'Summer Program Registration',
      content:
        'Registration for the summer enrichment program is now open. The program offers various activities for students during the summer break.',
      date: '2023-05-05T13:00:00',
      read: true,
      type: 'announcement',
      sender: 'School Admin',
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const getTypeIcon = (type: 'announcement' | 'message' | 'alert') => {
    switch (type) {
      case 'announcement':
        return <BellOutlined style={{ color: '#1890ff' }} />;
      case 'message':
        return <MailOutlined style={{ color: '#52c41a' }} />;
      case 'alert':
        return <AlertOutlined style={{ color: '#fa8c16' }} />;
      default:
        return null;
    }
  };

  const getTypeTag = (type: 'announcement' | 'message' | 'alert') => {
    switch (type) {
      case 'announcement':
        return <Tag color="blue">Announcement</Tag>;
      case 'message':
        return <Tag color="green">Message</Tag>;
      case 'alert':
        return <Tag color="orange">Alert</Tag>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <HeaderBar
        appType="guardian"
        userName={user?.name || 'Guardian User'}
        userAvatar={user?.photo}
      />

      <div className="page-container pt-20 pb-24 animate-fade-in">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <Title level={4} className="!mb-1">
              Notifications
            </Title>
            <Text type="secondary">Stay updated with important information</Text>
          </div>

          {unreadCount > 0 && (
            <Button type="text" icon={<CheckOutlined />} onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultActiveKey="all">
          <TabPane
            tab={
              <span>
                All
                {unreadCount > 0 && <Badge count={unreadCount} className="ml-2" />}
              </span>
            }
            key="all"
          >
            <Card className="shadow-sm">
              {notifications.length > 0 ? (
                <List
                  itemLayout="vertical"
                  dataSource={notifications}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      className={!item.read ? 'bg-blue-50' : ''}
                      extra={
                        !item.read && (
                          <Button type="text" size="small" onClick={() => markAsRead(item.id)}>
                            Mark as read
                          </Button>
                        )
                      }
                    >
                      <List.Item.Meta
                        avatar={getTypeIcon(item.type)}
                        title={
                          <div className="flex items-center">
                            <span className="mr-2">{item.title}</span>
                            {!item.read && <Badge status="processing" />}
                          </div>
                        }
                        description={
                          <div>
                            <div className="flex items-center mb-1">
                              <Text type="secondary" className="mr-2">
                                {formatDate(item.date)}
                              </Text>
                              {getTypeTag(item.type)}
                              {item.student && (
                                <Tag color="purple" className="ml-1">
                                  {item.student}
                                </Tag>
                              )}
                            </div>
                            {item.sender && <Text type="secondary">From: {item.sender}</Text>}
                          </div>
                        }
                      />
                      <Paragraph>{item.content}</Paragraph>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="No notifications yet" />
              )}
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <BellOutlined /> Announcements
              </span>
            }
            key="announcements"
          >
            <Card className="shadow-sm">
              <List
                itemLayout="vertical"
                dataSource={notifications.filter(n => n.type === 'announcement')}
                renderItem={item => (
                  <List.Item key={item.id} className={!item.read ? 'bg-blue-50' : ''}>
                    <List.Item.Meta
                      title={
                        <div className="flex items-center">
                          <span className="mr-2">{item.title}</span>
                          {!item.read && <Badge status="processing" />}
                        </div>
                      }
                      description={`${formatDate(item.date)} • From: ${item.sender}`}
                    />
                    <Paragraph>{item.content}</Paragraph>
                  </List.Item>
                )}
                locale={{ emptyText: <Empty description="No announcements yet" /> }}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <MailOutlined /> Messages
              </span>
            }
            key="messages"
          >
            <Card className="shadow-sm">
              <List
                itemLayout="vertical"
                dataSource={notifications.filter(n => n.type === 'message')}
                renderItem={item => (
                  <List.Item key={item.id} className={!item.read ? 'bg-blue-50' : ''}>
                    <List.Item.Meta
                      title={
                        <div className="flex items-center">
                          <span className="mr-2">{item.title}</span>
                          {!item.read && <Badge status="processing" />}
                        </div>
                      }
                      description={
                        <div>
                          <Text type="secondary">{formatDate(item.date)}</Text>
                          {item.student && (
                            <Tag color="purple" className="ml-2">
                              {item.student}
                            </Tag>
                          )}
                          {item.sender && (
                            <div>
                              <Text type="secondary">From: {item.sender}</Text>
                            </div>
                          )}
                        </div>
                      }
                    />
                    <Paragraph>{item.content}</Paragraph>
                  </List.Item>
                )}
                locale={{ emptyText: <Empty description="No messages yet" /> }}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <AlertOutlined /> Alerts
              </span>
            }
            key="alerts"
          >
            <Card className="shadow-sm">
              <List
                itemLayout="vertical"
                dataSource={notifications.filter(n => n.type === 'alert')}
                renderItem={item => (
                  <List.Item key={item.id} className={!item.read ? 'bg-blue-50' : ''}>
                    <List.Item.Meta
                      title={
                        <div className="flex items-center">
                          <span className="mr-2">{item.title}</span>
                          {!item.read && <Badge status="processing" />}
                        </div>
                      }
                      description={
                        <div>
                          <Text type="secondary">{formatDate(item.date)}</Text>
                          {item.student && (
                            <Tag color="purple" className="ml-2">
                              {item.student}
                            </Tag>
                          )}
                          {item.sender && (
                            <div>
                              <Text type="secondary">From: {item.sender}</Text>
                            </div>
                          )}
                        </div>
                      }
                    />
                    <Paragraph>{item.content}</Paragraph>
                  </List.Item>
                )}
                locale={{ emptyText: <Empty description="No alerts yet" /> }}
              />
            </Card>
          </TabPane>
        </Tabs>
      </div>

      <BottomNavigation appType="guardian" />
    </>
  );
};

export default GuardianNotifications;
