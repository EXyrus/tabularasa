import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Typography, 
  Popconfirm, 
  Alert,
  Empty,
  Spin
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  BankOutlined, 
  CreditCardOutlined,
  LockOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { 
  useGetBankAccounts, 
  useAddBankAccount, 
  useUpdateBankAccount, 
  useDeleteBankAccount 
} from '@/queries/use-institutions';
import { useToast } from '@/hooks/use-toast';
import HeaderBar from '@/components/HeaderBar';
import { useAuth } from '@/context/AuthContext';
import { BankAccount } from '@/types';

const { Title, Text } = Typography;
const { Option } = Select;

const ManageBankAccounts: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordForm] = Form.useForm();
  const [newAccount, setNewAccount] = useState<Omit<BankAccount, 'id'> | null>(null);

  // Get bank accounts
  const { 
    data: bankAccounts = [], 
    isLoading, 
    isError, 
    error 
  } = useGetBankAccounts();

  // Add bank account mutation
  const addBankAccountMutation = useAddBankAccount();
  
  // Update bank account mutation
  const updateBankAccountMutation = useUpdateBankAccount();
  
  // Delete bank account mutation
  const deleteBankAccountMutation = useDeleteBankAccount();

  const showModal = (account?: BankAccount) => {
    if (account) {
      setEditingAccount(account);
      form.setFieldsValue({
        bank: account.bank,
        accountNumber: account.accountNumber,
        accountName: account.accountName,
        accountType: account.accountType
      });
    } else {
      setEditingAccount(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values: any) => {
    if (editingAccount) {
      updateBankAccountMutation.mutate(
        {
          id: editingAccount.id,
          ...values
        },
        {
          onSuccess: () => {
            setIsModalVisible(false);
            toast({
              title: "Success",
              description: "Bank account updated successfully",
              variant: "default",
            });
            queryClient.invalidateQueries({ queryKey: ['bank_accounts'] });
          },
          onError: (error: any) => {
            toast({
              title: "Error",
              description: `Failed to update bank account: ${error.message}`,
              variant: "destructive",
            });
          }
        }
      );
    } else {
      // For adding an account, we'll first store the data then show password modal
      setNewAccount(values);
      setConfirmPasswordVisible(true);
    }
  };

  const handlePasswordSubmit = (values: { password: string }) => {
    if (newAccount) {
      addBankAccountMutation.mutate(
        {
          ...newAccount,
          password: values.password
        },
        {
          onSuccess: () => {
            setConfirmPasswordVisible(false);
            setIsModalVisible(false);
            setNewAccount(null);
            passwordForm.resetFields();
            toast({
              title: "Success",
              description: "Bank account added successfully",
              variant: "default",
            });
            queryClient.invalidateQueries({ queryKey: ['bank_accounts'] });
          },
          onError: (error: any) => {
            toast({
              title: "Error",
              description: `Failed to add bank account: ${error.message}`,
              variant: "destructive",
            });
          }
        }
      );
    }
  };

  const handleDelete = (id: string) => {
    deleteBankAccountMutation.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Bank account deleted successfully",
          variant: "default",
        });
        queryClient.invalidateQueries({ queryKey: ['bank_accounts'] });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: `Failed to delete bank account: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };

  const columns = [
    {
      title: 'Bank',
      dataIndex: 'bank',
      key: 'bank',
      render: (text: string) => (
        <div className="flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
            <BankOutlined className="text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-medium">{text}</span>
        </div>
      )
    },
    {
      title: 'Account Name',
      dataIndex: 'accountName',
      key: 'accountName'
    },
    {
      title: 'Account Number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      render: (text: string) => {
        // Mask account number for security
        const visible = text.slice(-4);
        const masked = '*'.repeat(text.length - 4);
        return <span>{masked + visible}</span>;
      }
    },
    {
      title: 'Account Type',
      dataIndex: 'accountType',
      key: 'accountType',
      render: (text: string) => (
        <span className="capitalize">{text}</span>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: BankAccount) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          record.isDefault 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {record.isDefault ? 'Default' : 'Active'}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: BankAccount) => (
        <div className="flex space-x-2">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this account?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
            />
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className="page-container pt-20 animate-fade-in bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HeaderBar 
        appType="institution" 
        userName={user?.name || 'Institution User'} 
        userAvatar={user?.avatar}
      />
      
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={4} className="!mb-1 dark:text-white">Manage Bank Accounts</Title>
            <Text className="text-gray-500 dark:text-gray-400">Add and manage your institution's bank accounts</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            className="bg-blue-500"
          >
            Add Bank Account
          </Button>
        </div>
        
        <Card className="mb-8 shadow-sm dark:bg-gray-800 dark:text-white">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Spin size="large" />
            </div>
          ) : isError ? (
            <Alert 
              message="Error" 
              description={`Failed to load bank accounts: ${(error as Error)?.message}`}
              type="error" 
              showIcon 
            />
          ) : bankAccounts.length === 0 ? (
            <Empty 
              description="No bank accounts found" 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
              className="py-8 dark:text-gray-400"
            />
          ) : (
            <Table 
              columns={columns} 
              dataSource={bankAccounts} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
              className="dark:text-gray-300"
            />
          )}
        </Card>
        
        <Card className="mb-6 dark:bg-gray-800 dark:text-white">
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
              <LockOutlined className="text-blue-600 dark:text-blue-300 text-xl" />
            </div>
            <div>
              <Title level={5} className="!mb-1 dark:text-white">Bank Account Security</Title>
              <Text className="text-gray-600 dark:text-gray-400 block mb-2">
                Your bank account details are securely stored and encrypted. 
                When adding a new account, you'll need to verify with your password.
              </Text>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                <li>Bank account numbers are partially masked for security</li>
                <li>Account management actions require password verification</li>
                <li>All data is encrypted in transit and at rest</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Modal for adding/editing bank accounts */}
      <Modal
        title={editingAccount ? "Edit Bank Account" : "Add Bank Account"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={updateBankAccountMutation.isPending}
            onClick={handleOk}
          >
            {editingAccount ? 'Update' : 'Continue'}
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="bank"
            label="Bank Name"
            rules={[{ required: true, message: 'Please enter the bank name' }]}
          >
            <Input prefix={<BankOutlined />} placeholder="e.g., Chase Bank" />
          </Form.Item>
          
          <Form.Item
            name="accountName"
            label="Account Name"
            rules={[{ required: true, message: 'Please enter the account holder name' }]}
          >
            <Input placeholder="e.g., Acme School" />
          </Form.Item>
          
          <Form.Item
            name="accountNumber"
            label="Account Number"
            rules={[{ required: true, message: 'Please enter the account number' }]}
          >
            <Input 
              prefix={<CreditCardOutlined />} 
              placeholder="Account number" 
            />
          </Form.Item>
          
          <Form.Item
            name="accountType"
            label="Account Type"
            rules={[{ required: true, message: 'Please select the account type' }]}
          >
            <Select placeholder="Select account type">
              <Option value="checking">Checking</Option>
              <Option value="savings">Savings</Option>
              <Option value="business">Business</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Modal for password confirmation when adding new account */}
      <Modal
        title="Confirm Your Password"
        open={confirmPasswordVisible}
        onCancel={() => {
          setConfirmPasswordVisible(false);
          passwordForm.resetFields();
        }}
        footer={[
          <Button 
            key="back" 
            onClick={() => {
              setConfirmPasswordVisible(false);
              passwordForm.resetFields();
            }}
          >
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={addBankAccountMutation.isPending}
            onClick={() => passwordForm.submit()}
          >
            Confirm
          </Button>
        ]}
      >
        <Alert
          message="Security Verification"
          description="For your security, we need to verify your password before adding a new bank account."
          type="info"
          showIcon
          className="mb-4"
        />
        
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordSubmit}
        >
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder="Enter your password" 
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBankAccounts;
