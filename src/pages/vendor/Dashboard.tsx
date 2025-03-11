import React from 'react';
import { Typography, Card, Row, Col, Statistic, Space, Table } from 'antd';
import { TeamOutlined, BankOutlined, UserOutlined, ArrowUpOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, Users, School, ArrowRight } from 'lucide-react';
import { useInstitutions, useInstitutionStatistics } from '@/queries/use-institutions';

const { Title, Text } = Typography;

const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Use real data from queries
  const { data: institutionsData, isLoading: isLoadingInstitutions } = useInstitutions();
  const { data: statsData, isLoading: isLoadingStats } = useInstitutionStatistics();

  // Get institutions or default to empty array
  const institutions = institutionsData?.institutions || [];

  // Create stats from real data or fallback to placeholder
  const stats = [
    {
      title: 'Total Institutions',
      value: statsData?.total || institutions.length || 0,
      icon: <Building className="h-6 w-6" />,
      color: 'text-blue-500',
    },
    {
      title: 'Active Institutions',
      value: institutions.filter(i => i.status === 'active').length || 0,
      icon: <School className="h-6 w-6" />,
      color: 'text-green-500',
    },
    {
      title: 'Pending Approval',
      value: institutions.filter(i => i.status === 'pending').length || 0,
      icon: <Users className="h-6 w-6" />,
      color: 'text-purple-500',
    },
  ];

  // Get most recent institutions
  const recentInstitutions = institutions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  // Table columns configuration
  const columns = [
    {
      title: 'Institution Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : status === 'inactive'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <>
      <HeaderBar appType="vendor" userName={user?.name || 'Admin User'} userAvatar={user?.photo} />

      <div className="page-container pt-20 animate-fade-in">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <Title level={4} className="!mb-1 dark:text-white">
              Vendor Dashboard
            </Title>
            <Text type="secondary" className="dark:text-gray-400">
              Overview of all institutions and system metrics
            </Text>
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
          {isLoadingStats
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse"
                  >
                    <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                ))
            : stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1 dark:text-white">
                        {stat.value.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={`${stat.color} dark:text-white p-3 bg-gray-100 dark:bg-gray-700 rounded-full`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="mt-2 flex items-center text-green-500">
                      <ArrowUpOutlined />
                      <span className="ml-1 text-sm">Trending upward</span>
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

          {isLoadingInstitutions ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table
                dataSource={recentInstitutions}
                columns={columns}
                pagination={false}
                rowKey="id"
                className="dark:!bg-gray-800 [&_.ant-table-cell]:dark:!text-white [&_.ant-table-row:hover_.ant-table-cell]:dark:!bg-gray-700"
              />
            </div>
          )}
        </div>
      </div>

      <BottomNavigation appType="vendor" />
    </>
  );
};

export default VendorDashboard;
