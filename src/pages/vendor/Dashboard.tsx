
import React from 'react';
import { Typography, Card, Row, Col, Statistic, Space, Table } from 'antd';
import { TeamOutlined, BankOutlined, UserOutlined, ArrowUpOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, Users, School, ArrowRight } from 'lucide-react';

const { Title, Text } = Typography;

const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data for statistics
  const stats = [
    { title: 'Total Institutions', value: 248, icon: <Building className="h-6 w-6" />, color: 'text-blue-500' },
    { title: 'Total Users', value: 12489, icon: <Users className="h-6 w-6" />, color: 'text-purple-500' },
    { title: 'Active Schools', value: 189, icon: <School className="h-6 w-6" />, color: 'text-green-500' },
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
          status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <Title level={4} className="!mb-1 dark:text-white">Vendor Dashboard</Title>
            <Text type="secondary" className="dark:text-gray-400">Overview of all institutions and system metrics</Text>
          </div>
          <Button 
            onClick={() => navigate('/vendor/institutions')}
            className="bg-sms-vendor text-white flex items-center gap-2"
          >
            Manage Institutions <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1 dark:text-white">{stat.value.toLocaleString()}</p>
                </div>
                <div className={`${stat.color} dark:text-white p-3 bg-gray-100 dark:bg-gray-700 rounded-full`}>
                  {stat.icon}
                </div>
              </div>
              {index === 0 && (
                <div className="mt-2 flex items-center text-green-500">
                  <ArrowUpOutlined />
                  <span className="ml-1 text-sm">3.2% from last week</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Recent Institutions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold dark:text-white">Recent Institutions</h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/vendor/institutions')}
              className="text-sms-blue dark:text-blue-400"
            >
              View All
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table 
              dataSource={recentInstitutions} 
              columns={columns} 
              pagination={false} 
              rowKey="id"
              className="dark:!bg-gray-800 [&_.ant-table-cell]:dark:!text-white [&_.ant-table-row:hover_.ant-table-cell]:dark:!bg-gray-700"
            />
          </div>
        </div>
      </div>
      
      <BottomNavigation appType="vendor" />
    </>
  );
};

export default VendorDashboard;
