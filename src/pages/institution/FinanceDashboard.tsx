import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Receipt,
  CreditCard,
  FileText,
  DollarSign,
  Building,
  Wallet,
  BarChart,
} from 'lucide-react';

const FinanceDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const financeItems = [
    {
      title: 'Fee Management',
      description: 'Create and manage fee structures',
      icon: <Receipt className="h-6 w-6" />,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300',
      path: '/institution/finance/fees',
    },
    {
      title: 'Payment Processing',
      description: 'Record and track student payments',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
      path: '/institution/finance/payments',
    },
    {
      title: 'Transaction History',
      description: 'View all financial transactions',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
      path: '/institution/finance/transactions',
    },
    {
      title: 'Financial Reports',
      description: 'Generate and view financial reports',
      icon: <BarChart className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
      path: '/institution/finance/reports',
    },
    {
      title: 'Payroll Management',
      description: 'Process and manage employee payrolls',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300',
      path: '/institution/finance/payrolls',
    },
    {
      title: 'Bank Accounts',
      description: 'Manage institution bank accounts',
      icon: <Building className="h-6 w-6" />,
      color: 'bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300',
      path: '/institution/finance/bank-accounts',
    },
    {
      title: 'Budget Planning',
      description: 'Create and manage institution budgets',
      icon: <Wallet className="h-6 w-6" />,
      color: 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300',
      path: '/institution/finance/budgets',
    },
  ];

  return (
    <>
      <HeaderBar appType="institution" userName={user?.name || 'Admin'} userAvatar={user?.photo} />

      <div className="page-container pt-20 pb-20 px-4 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 dark:text-white">Finance Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all financial aspects of your institution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {financeItems.map((item, index) => (
            <Card
              key={index}
              className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-lg ${item.color}`}>{item.icon}</div>
                </div>
                <CardTitle className="text-xl mt-4 dark:text-white">{item.title}</CardTitle>
                <CardDescription className="dark:text-gray-400">{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate(item.path)} className="w-full">
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation appType="institution" />
    </>
  );
};

export default FinanceDashboard;
