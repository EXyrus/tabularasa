
import React from 'react';
import { Typography, Card, Row, Col, Statistic, Space, Table } from 'antd';
import { TeamOutlined, BankOutlined, UserOutlined, ArrowUpOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for statistics
  const stats = [
    { title: 'Total Institutions', value: 248, icon: <BankOutlined />, color: 'text-blue-500' },
    { title: 'Total Users', value: 12489, icon: <UserOutlined />, color: 'text-purple-500' },
    { title: 'Active Schools', value: 189, icon: <TeamOutlined />, color: 'text-green-500' },
  ];
  
  // Mock data for recent institutions
  const recentInstitutions = [
    { id: 1, name: 'Springfield Elementary', students: 450, status: 'Active', joined: '2023-05-12' },
    { id: 2, name: 'Westfield High School', students: 820, status: 'Active', joined: '2023-05-10' },
    { id: 3, name: 'Oakridge Academy', students: 340, status: 'Pending', joined: '2023-05-09' },
    { id: 4, name: 'Riverside Middle School', students: 560, status: 'Active', joined: '2023-05-08' },
  ];
  
  const columns = [
    {
      title: 'Institution Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'joined',
      key: 'joined',
    },
  ];

  return (
    <>
      <HeaderBar 
        appType="vendor" 
        userName={user?.name || 'Admin User'} 
        userAvatar={user?.avatar} 
      />
      
      <div className="page-container pt-20 animate-fade-in">
        <div className="mb-8">
          <Title level={4} className="!mb-1">Vendor Dashboard</Title>
          <Text type="secondary">Overview of all institutions and system metrics</Text>
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
                  prefix={index === 0 ? <ArrowUpOutlined /> : null}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Recent Institutions */}
        <Card 
          title="Recent Institutions" 
          className="shadow-sm mb-8"
          extra={<a href="#" className="text-sms-blue">View All</a>}
        >
          <Table 
            dataSource={recentInstitutions} 
            columns={columns} 
            pagination={false} 
            rowKey="id"
            className="overflow-x-auto"
          />
        </Card>
      </div>
      
      <BottomNavigation appType="vendor" />
    </>
  );
};

export default VendorDashboard;
