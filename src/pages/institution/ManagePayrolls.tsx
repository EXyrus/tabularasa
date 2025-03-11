import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Typography,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Popconfirm,
  Empty,
  message,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useToast } from '@/hooks/use-toast';
import HeaderBar from '@/components/HeaderBar';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;
const { Option } = Select;

// Mock types and data (replace with actual API calls)
interface Payroll {
  id: string;
  employeeName: string;
  employeeId: string;
  position: string;
  department: string;
  payPeriod: string;
  salary: number;
  deductions: number;
  netPay: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentDate?: string;
}

const ManagePayrolls = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPayroll, setEditingPayroll] = useState<Payroll | null>(null);

  // Mocked payroll data (replace with API call)
  const [payrolls, setPayrolls] = useState<Payroll[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP-001',
      position: 'Senior Teacher',
      department: 'Science',
      payPeriod: 'October 2023',
      salary: 5000,
      deductions: 500,
      netPay: 4500,
      status: 'completed',
      paymentDate: '2023-10-30',
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      employeeId: 'EMP-002',
      position: 'Administrator',
      department: 'Administration',
      payPeriod: 'October 2023',
      salary: 4500,
      deductions: 450,
      netPay: 4050,
      status: 'completed',
      paymentDate: '2023-10-30',
    },
    {
      id: '3',
      employeeName: 'Michael Johnson',
      employeeId: 'EMP-003',
      position: 'Junior Teacher',
      department: 'Mathematics',
      payPeriod: 'November 2023',
      salary: 3800,
      deductions: 380,
      netPay: 3420,
      status: 'pending',
    },
  ]);

  // In a real application, you would fetch this data from an API
  const { isLoading: isLoadingEmployees, data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      // Simulate API call
      return [
        { id: 'EMP-001', name: 'John Doe', position: 'Senior Teacher', department: 'Science' },
        {
          id: 'EMP-002',
          name: 'Jane Smith',
          position: 'Administrator',
          department: 'Administration',
        },
        {
          id: 'EMP-003',
          name: 'Michael Johnson',
          position: 'Junior Teacher',
          department: 'Mathematics',
        },
        { id: 'EMP-004', name: 'Sarah Brown', position: 'Principal', department: 'Administration' },
        { id: 'EMP-005', name: 'Robert Davis', position: 'Teacher', department: 'English' },
      ];
    },
  });

  // Mock API calls
  const createPayrollMutation = useMutation({
    mutationFn: async (payroll: Omit<Payroll, 'id'>) => {
      // Simulate API call to create payroll
      const newPayroll = {
        ...payroll,
        id: `payroll-${Date.now()}`,
      };
      return newPayroll;
    },
    onSuccess: data => {
      setPayrolls([...payrolls, data]);
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      toast({
        title: 'Success',
        description: 'Payroll created successfully',
        variant: 'default',
      });
      setIsModalVisible(false);
      form.resetFields();
    },
  });

  const updatePayrollMutation = useMutation({
    mutationFn: async (payroll: Payroll) => {
      // Simulate API call to update payroll
      return payroll;
    },
    onSuccess: data => {
      setPayrolls(payrolls.map(p => (p.id === data.id ? data : p)));
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      toast({
        title: 'Success',
        description: 'Payroll updated successfully',
        variant: 'default',
      });
      setIsModalVisible(false);
      form.resetFields();
    },
  });

  const deletePayrollMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call to delete payroll
      return id;
    },
    onSuccess: id => {
      setPayrolls(payrolls.filter(p => p.id !== id));
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      toast({
        title: 'Success',
        description: 'Payroll deleted successfully',
        variant: 'default',
      });
    },
  });

  const showModal = (payroll?: Payroll) => {
    if (payroll) {
      setEditingPayroll(payroll);
      form.setFieldsValue({
        ...payroll,
        paymentDate: payroll.paymentDate ? dayjs(payroll.paymentDate) : undefined,
      });
    } else {
      setEditingPayroll(null);
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
    const formattedValues = {
      ...values,
      paymentDate: values.paymentDate?.format('YYYY-MM-DD'),
      salary: parseFloat(values.salary),
      deductions: parseFloat(values.deductions),
      netPay: parseFloat(values.salary) - parseFloat(values.deductions),
    };

    if (editingPayroll) {
      updatePayrollMutation.mutate({ ...formattedValues, id: editingPayroll.id });
    } else {
      createPayrollMutation.mutate(formattedValues);
    }
  };

  const handleDelete = (id: string) => {
    deletePayrollMutation.mutate(id);
  };

  const handleEmployeeSelect = (employeeId: string) => {
    const selectedEmployee = employees?.find(e => e.id === employeeId);
    if (selectedEmployee) {
      form.setFieldsValue({
        employeeName: selectedEmployee.name,
        position: selectedEmployee.position,
        department: selectedEmployee.department,
      });
    }
  };

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text: string, record: Payroll) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-gray-500 text-xs">{record.employeeId}</div>
        </div>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (text: string, record: Payroll) => (
        <div>
          <div>{text}</div>
          <div className="text-gray-500 text-xs">{record.department}</div>
        </div>
      ),
    },
    {
      title: 'Pay Period',
      dataIndex: 'payPeriod',
      key: 'payPeriod',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (text: number) => `$${text.toLocaleString()}`,
    },
    {
      title: 'Deductions',
      dataIndex: 'deductions',
      key: 'deductions',
      render: (text: number) => `$${text.toLocaleString()}`,
    },
    {
      title: 'Net Pay',
      dataIndex: 'netPay',
      key: 'netPay',
      render: (text: number) => <span className="font-medium">${text.toLocaleString()}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        let text = '';

        switch (status) {
          case 'pending':
            color = 'bg-yellow-100 text-yellow-800';
            text = 'Pending';
            break;
          case 'completed':
            color = 'bg-green-100 text-green-800';
            text = 'Completed';
            break;
          case 'cancelled':
            color = 'bg-red-100 text-red-800';
            text = 'Cancelled';
            break;
        }

        return <span className={`px-2 py-1 rounded-full text-xs ${color}`}>{text}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Payroll) => (
        <div className="flex space-x-2">
          <Button icon={<EditOutlined />} size="small" onClick={() => showModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this payroll?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="page-container pt-20 animate-fade-in bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HeaderBar
        appType="institution"
        userName={user?.name || 'Institution User'}
        userAvatar={user?.photo}
      />

      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={4} className="!mb-1 dark:text-white">
              Manage Payrolls
            </Title>
            <Text className="text-gray-500 dark:text-gray-400">
              Create and manage employee payrolls
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            className="bg-sms-institution"
          >
            Create Payroll
          </Button>
        </div>

        <Card className="mb-8 shadow-sm dark:bg-gray-800 dark:text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-3">
                  <UserOutlined className="text-blue-500 dark:text-blue-300 text-xl" />
                </div>
                <div>
                  <Text className="text-gray-500 dark:text-gray-400 text-sm">Total Employees</Text>
                  <div className="text-2xl font-semibold dark:text-white">5</div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3">
                  <DollarOutlined className="text-green-500 dark:text-green-300 text-xl" />
                </div>
                <div>
                  <Text className="text-gray-500 dark:text-gray-400 text-sm">
                    Total Payroll (Current Month)
                  </Text>
                  <div className="text-2xl font-semibold dark:text-white">$13,300</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full mr-3">
                  <CalendarOutlined className="text-purple-500 dark:text-purple-300 text-xl" />
                </div>
                <div>
                  <Text className="text-gray-500 dark:text-gray-400 text-sm">Pending Payrolls</Text>
                  <div className="text-2xl font-semibold dark:text-white">1</div>
                </div>
              </div>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={payrolls}
            rowKey="id"
            loading={false}
            pagination={{ pageSize: 10 }}
            className="dark:text-gray-300"
          />
        </Card>
      </div>

      <Modal
        title={editingPayroll ? 'Edit Payroll' : 'Create Payroll'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={createPayrollMutation.isPending || updatePayrollMutation.isPending}
            onClick={handleOk}
          >
            {editingPayroll ? 'Update' : 'Create'}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="employeeId"
              label="Select Employee"
              rules={[{ required: true, message: 'Please select an employee' }]}
            >
              <Select
                placeholder="Select employee"
                onChange={handleEmployeeSelect}
                loading={isLoadingEmployees}
              >
                {employees?.map((employee: any) => (
                  <Option key={employee.id} value={employee.id}>
                    {employee.name} ({employee.position})
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="employeeName"
              label="Employee Name"
              rules={[{ required: true, message: 'Please enter employee name' }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item name="position" label="Position">
              <Input disabled />
            </Form.Item>

            <Form.Item name="department" label="Department">
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="payPeriod"
              label="Pay Period"
              rules={[{ required: true, message: 'Please enter pay period' }]}
            >
              <Input placeholder="e.g., November 2023" />
            </Form.Item>

            <Form.Item name="paymentDate" label="Payment Date">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="salary"
              label="Salary Amount"
              rules={[{ required: true, message: 'Please enter salary amount' }]}
            >
              <Input type="number" prefix="$" min={0} />
            </Form.Item>

            <Form.Item
              name="deductions"
              label="Deductions"
              rules={[{ required: true, message: 'Please enter deductions' }]}
            >
              <Input type="number" prefix="$" min={0} />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status' }]}
              className="col-span-full"
            >
              <Select placeholder="Select status">
                <Option value="pending">Pending</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePayrolls;
