import React, { useState } from 'react';
import { Typography, Card, Button, Form, Input, DatePicker, Select, Row, Col, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import SearchableSelect from '../../components/SearchableSelect';
import ListItemWithContext from '../../components/ListItemWithContext';
import dayjs from 'dayjs';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'on leave' | 'terminated';
  photo?: string;
}

const { Title, Text } = Typography;
const { Option } = Select;

const InstitutionEmployees: React.FC = () => {
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form] = Form.useForm();
  
  const [employees, setEmployees] = useState<Employee[]>([
    { 
      id: '1', 
      name: 'Robert Johnson', 
      position: 'Principal', 
      department: 'Administration',
      email: 'robert.johnson@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown',
      joinDate: '2018-06-15',
      salary: 85000,
      status: 'active',
      photo: 'https://randomuser.me/api/portraits/men/10.jpg'
    },
    { 
      id: '2', 
      name: 'Emily Williams', 
      position: 'Vice Principal', 
      department: 'Administration',
      email: 'emily.williams@example.com',
      phone: '234-567-8901',
      address: '456 Oak St, Anytown',
      joinDate: '2019-07-10',
      salary: 75000,
      status: 'active',
      photo: 'https://randomuser.me/api/portraits/women/10.jpg'
    },
    { 
      id: '3', 
      name: 'Michael Brown', 
      position: 'Science Teacher', 
      department: 'Science',
      email: 'michael.brown@example.com',
      phone: '345-678-9012',
      address: '789 Pine St, Anytown',
      joinDate: '2020-08-20',
      salary: 60000,
      status: 'active',
      photo: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    { 
      id: '4', 
      name: 'Jessica Smith', 
      position: 'Math Teacher', 
      department: 'Mathematics',
      email: 'jessica.smith@example.com',
      phone: '456-789-0123',
      address: '101 Elm St, Anytown',
      joinDate: '2021-01-05',
      salary: 60000,
      status: 'on leave',
      photo: 'https://randomuser.me/api/portraits/women/11.jpg'
    },
    { 
      id: '5', 
      name: 'David Miller', 
      position: 'IT Administrator', 
      department: 'IT',
      email: 'david.miller@example.com',
      phone: '567-890-1234',
      address: '202 Maple St, Anytown',
      joinDate: '2022-03-15',
      salary: 65000,
      status: 'active',
      photo: 'https://randomuser.me/api/portraits/men/12.jpg'
    },
  ]);
  
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  
  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredEmployees(employees);
      return;
    }
    
    const filtered = employees.filter(employee => 
      employee.name.toLowerCase().includes(value.toLowerCase()) ||
      employee.position.toLowerCase().includes(value.toLowerCase()) ||
      employee.department.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };
  
  const showModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      form.setFieldsValue({
        ...employee,
        joinDate: employee.joinDate ? dayjs(employee.joinDate) : undefined
      });
    } else {
      setEditingEmployee(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  
  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      joinDate: values.joinDate?.format('YYYY-MM-DD'),
      id: editingEmployee ? editingEmployee.id : `${employees.length + 1}`
    };
    
    if (editingEmployee) {
      const updatedEmployees = employees.map(employee => 
        employee.id === editingEmployee.id ? formattedValues : employee
      );
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
    } else {
      const newEmployees = [...employees, formattedValues];
      setEmployees(newEmployees);
      setFilteredEmployees(newEmployees);
    }
    
    setIsModalVisible(false);
    form.resetFields();
  };
  
  const handleDelete = (id: string) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
  };
  
  return (
    <>
      <HeaderBar 
        appType="institution" 
        userName={user?.name || 'Institution User'} 
        userAvatar={user?.avatar} 
      />
      
      <div className="page-container pt-20 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={4} className="!mb-1">Employees</Title>
            <Text type="secondary">Manage staff and teachers</Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            className="bg-sms-institution"
          >
            Add Employee
          </Button>
        </div>
        
        <Card className="mb-6">
          <div className="mb-4">
            <SearchableSelect
              placeholder="Search employees by name, position or department"
              onSearch={handleSearch}
              className="w-full"
              options={employees.map(employee => ({
                value: employee.id,
                label: `${employee.name} (${employee.position})`
              }))}
              onChange={(value) => {
                if (value) {
                  const selected = employees.find(e => e.id === value);
                  setFilteredEmployees(selected ? [selected] : []);
                } else {
                  setFilteredEmployees(employees);
                }
              }}
              allowClear
            />
          </div>
          
          {filteredEmployees.map(employee => (
            <ListItemWithContext
              key={employee.id}
              menuItems={[
                { label: 'View Details', key: 'view' },
                { label: 'Edit Employee', key: 'edit' },
                { label: 'Delete Employee', key: 'delete', danger: true }
              ]}
              onMenuClick={(key) => {
                if (key === 'edit') {
                  showModal(employee);
                } else if (key === 'delete') {
                  handleDelete(employee.id);
                } else if (key === 'view') {
                  console.log('View employee:', employee);
                }
              }}
            >
              <div className="flex items-center w-full py-2">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={employee.photo || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                    alt={employee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-gray-500">{employee.position} | {employee.department}</div>
                </div>
                <div className="text-right">
                  <div>{employee.email}</div>
                  <div className="text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.status === 'active' ? 'bg-green-100 text-green-800' : 
                      employee.status === 'on leave' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </ListItemWithContext>
          ))}
          
          {filteredEmployees.length === 0 && (
            <div className="text-center py-8">
              <Text type="secondary">No employees found</Text>
            </div>
          )}
        </Card>
      </div>
      
      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter employee name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: 'Please enter position' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: 'Please enter department' }]}
              >
                <Select>
                  <Option value="Administration">Administration</Option>
                  <Option value="Science">Science</Option>
                  <Option value="Mathematics">Mathematics</Option>
                  <Option value="English">English</Option>
                  <Option value="Social Studies">Social Studies</Option>
                  <Option value="Physical Education">Physical Education</Option>
                  <Option value="Arts">Arts</Option>
                  <Option value="IT">IT</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="Salary"
                rules={[{ required: true, message: 'Please enter salary' }]}
              >
                <Input type="number" prefix="$" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="joinDate"
                label="Join Date"
                rules={[{ required: true, message: 'Please select join date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select>
                  <Option value="active">Active</Option>
                  <Option value="on leave">On Leave</Option>
                  <Option value="terminated">Terminated</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={handleCancel} className="mr-2">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-sms-institution">
                {editingEmployee ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      
      <BottomNavigation appType="institution" />
    </>
  );
};

export default InstitutionEmployees;
