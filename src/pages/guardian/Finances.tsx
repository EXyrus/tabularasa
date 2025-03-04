
import React from 'react';
import { Typography, Card, List, Tag, Button, Badge, Divider, Space } from 'antd';
import { DollarOutlined, CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

interface FeeItem {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  student: string;
  description: string;
}

const GuardianFinances: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for fees
  const fees: FeeItem[] = [
    { 
      id: 'FEE001', 
      title: 'School Fees - Term 1', 
      amount: 500, 
      dueDate: '2023-09-15', 
      status: 'paid', 
      student: 'Emma Smith',
      description: 'Regular school fees for the first term of the academic year.'
    },
    { 
      id: 'FEE002', 
      title: 'School Fees - Term 2', 
      amount: 500, 
      dueDate: '2024-01-10', 
      status: 'pending', 
      student: 'Emma Smith',
      description: 'Regular school fees for the second term of the academic year.'
    },
    { 
      id: 'FEE003', 
      title: 'Field Trip - Museum', 
      amount: 25, 
      dueDate: '2023-05-10', 
      status: 'overdue', 
      student: 'Noah Smith',
      description: 'Fee for the upcoming educational trip to the Science Museum.'
    },
    { 
      id: 'FEE004', 
      title: 'Extracurricular - Swimming', 
      amount: 120, 
      dueDate: '2023-06-01', 
      status: 'pending', 
      student: 'Noah Smith',
      description: 'Fee for the swimming lessons for the current term.'
    },
  ];

  const getTotalAmount = (status: 'paid' | 'pending' | 'overdue') => {
    return fees
      .filter(fee => fee.status === status)
      .reduce((total, fee) => total + fee.amount, 0);
  };

  const getStatusTag = (status: 'paid' | 'pending' | 'overdue') => {
    switch(status) {
      case 'paid':
        return <Tag color="success"><CheckOutlined /> Paid</Tag>;
      case 'pending':
        return <Tag color="processing"><ClockCircleOutlined /> Pending</Tag>;
      case 'overdue':
        return <Tag color="error">Overdue</Tag>;
      default:
        return null;
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
          <Title level={4} className="!mb-1">Finances</Title>
          <Text type="secondary">Manage your children's school fees and payments</Text>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <CheckOutlined className="text-green-600 text-xl" />
              </div>
              <div>
                <Text type="secondary">Paid Fees</Text>
                <Title level={4} className="!mb-0">${getTotalAmount('paid')}</Title>
              </div>
            </div>
          </Card>
          
          <Card className="shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <ClockCircleOutlined className="text-blue-600 text-xl" />
              </div>
              <div>
                <Text type="secondary">Pending Fees</Text>
                <Title level={4} className="!mb-0">${getTotalAmount('pending')}</Title>
              </div>
            </div>
          </Card>
          
          <Card className="shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 mr-4">
                <DollarOutlined className="text-red-600 text-xl" />
              </div>
              <div>
                <Text type="secondary">Overdue Fees</Text>
                <Title level={4} className="!mb-0">${getTotalAmount('overdue')}</Title>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Fee List */}
        <Card className="shadow-sm">
          <Title level={5} className="!mb-4">Fee Details</Title>
          
          <List
            itemLayout="vertical"
            dataSource={fees}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                extra={
                  item.status !== 'paid' && (
                    <Button type="primary" className="bg-sms-guardian">
                      Pay Now
                    </Button>
                  )
                }
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center mb-1">
                      <Text strong className="mr-2">{item.title}</Text>
                      {getStatusTag(item.status)}
                    </div>
                    <Text type="secondary" className="block mb-1">Amount: ${item.amount}</Text>
                    <Text type="secondary" className="block mb-1">Due Date: {item.dueDate}</Text>
                    <Badge color="blue" text={`Student: ${item.student}`} className="block mb-1" />
                    <Text className="text-gray-500">{item.description}</Text>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
      
      <BottomNavigation appType="guardian" />
    </>
  );
};

export default GuardianFinances;
