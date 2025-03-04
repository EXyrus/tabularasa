import React, { useState } from 'react';
import { Typography, Card, Button, Form, Input, DatePicker, Select, Row, Col, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar';
import BottomNavigation from '../../components/BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import SearchableSelect from '../../components/SearchableSelect';
import ListItemWithContext from '../../components/ListItemWithContext';

const { Title, Text } = Typography;
const { Option } = Select;

interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  section: string;
  gender: string;
  contactNo: string;
  email: string;
  address: string;
  guardianName: string;
  admissionDate: string;
  photo?: string;
}

const InstitutionStudents: React.FC = () => {
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form] = Form.useForm();
  
  const [students, setStudents] = useState<Student[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      age: 15, 
      grade: '10', 
      section: 'A',
      gender: 'Male',
      contactNo: '123-456-7890',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown',
      guardianName: 'Jane Doe',
      admissionDate: '2022-08-15',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    { 
      id: '2', 
      name: 'Alice Smith', 
      age: 14, 
      grade: '9', 
      section: 'B',
      gender: 'Female',
      contactNo: '234-567-8901',
      email: 'alice.smith@example.com',
      address: '456 Oak St, Anytown',
      guardianName: 'Bob Smith',
      admissionDate: '2021-08-10',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    { 
      id: '3', 
      name: 'David Wilson', 
      age: 16, 
      grade: '11', 
      section: 'A',
      gender: 'Male',
      contactNo: '345-678-9012',
      email: 'david.wilson@example.com',
      address: '789 Pine St, Anytown',
      guardianName: 'Sarah Wilson',
      admissionDate: '2020-08-20',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    { 
      id: '4', 
      name: 'Emma Brown', 
      age: 13, 
      grade: '8', 
      section: 'C',
      gender: 'Female',
      contactNo: '456-789-0123',
      email: 'emma.brown@example.com',
      address: '101 Elm St, Anytown',
      guardianName: 'Michael Brown',
      admissionDate: '2022-08-05',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    { 
      id: '5', 
      name: 'James Johnson', 
      age: 17, 
      grade: '12', 
      section: 'A',
      gender: 'Male',
      contactNo: '567-890-1234',
      email: 'james.johnson@example.com',
      address: '202 Maple St, Anytown',
      guardianName: 'Linda Johnson',
      admissionDate: '2019-08-25',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
  ]);
  
  const [filteredStudents, setFilteredStudents] = useState(students);
  
  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredStudents(students);
      return;
    }
    
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(value.toLowerCase()) ||
      student.grade.includes(value) ||
      student.section.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };
  
  const showModal = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      form.setFieldsValue({
        ...student,
        admissionDate: student.admissionDate ? new Date(student.admissionDate) : undefined
      });
    } else {
      setEditingStudent(null);
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
      admissionDate: values.admissionDate?.format('YYYY-MM-DD'),
      id: editingStudent ? editingStudent.id : `${students.length + 1}`
    };
    
    if (editingStudent) {
      const updatedStudents = students.map(student => 
        student.id === editingStudent.id ? formattedValues : student
      );
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
    } else {
      const newStudents = [...students, formattedValues];
      setStudents(newStudents);
      setFilteredStudents(newStudents);
    }
    
    setIsModalVisible(false);
    form.resetFields();
  };
  
  const handleDelete = (id: string) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
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
            <Title level={4} className="!mb-1">Students</Title>
            <Text type="secondary">Manage student records</Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            className="bg-sms-institution"
          >
            Add Student
          </Button>
        </div>
        
        <Card className="mb-6">
          <div className="mb-4">
            <SearchableSelect
              placeholder="Search students by name, grade or section"
              onSearch={handleSearch}
              className="w-full"
              options={students.map(student => ({
                value: student.id,
                label: `${student.name} (Grade ${student.grade}-${student.section})`
              }))}
              onChange={(value) => {
                if (value) {
                  const selected = students.find(s => s.id === value);
                  setFilteredStudents(selected ? [selected] : []);
                } else {
                  setFilteredStudents(students);
                }
              }}
              allowClear
            />
          </div>
          
          {filteredStudents.map(student => (
            <ListItemWithContext
              key={student.id}
              menuItems={[
                { label: 'View Details', key: 'view' },
                { label: 'Edit Student', key: 'edit' },
                { label: 'Delete Student', key: 'delete', danger: true }
              ]}
              onMenuClick={(key) => {
                if (key === 'edit') {
                  showModal(student);
                } else if (key === 'delete') {
                  handleDelete(student.id);
                } else if (key === 'view') {
                  console.log('View student:', student);
                }
              }}
            >
              <div className="flex items-center w-full py-2">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={student.photo || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="font-medium">{student.name}</div>
                  <div className="text-gray-500">Grade {student.grade}-{student.section} | {student.age} yrs</div>
                </div>
                <div className="text-right">
                  <div>{student.guardianName}</div>
                  <div className="text-gray-500">{student.contactNo}</div>
                </div>
              </div>
            </ListItemWithContext>
          ))}
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Text type="secondary">No students found</Text>
            </div>
          )}
        </Card>
      </div>
      
      <Modal
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
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
                rules={[{ required: true, message: 'Please enter student name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                rules={[{ required: true, message: 'Please enter age' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="grade"
                label="Grade"
                rules={[{ required: true, message: 'Please select grade' }]}
              >
                <Select>
                  {[...Array(12)].map((_, i) => (
                    <Option key={i + 1} value={`${i + 1}`}>{i + 1}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="section"
                label="Section"
                rules={[{ required: true, message: 'Please select section' }]}
              >
                <Select>
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="C">C</Option>
                  <Option value="D">D</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select gender' }]}
              >
                <Select>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contactNo"
                label="Contact Number"
                rules={[{ required: true, message: 'Please enter contact number' }]}
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
                name="guardianName"
                label="Guardian Name"
                rules={[{ required: true, message: 'Please enter guardian name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="admissionDate"
                label="Admission Date"
                rules={[{ required: true, message: 'Please select admission date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={handleCancel} className="mr-2">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-sms-institution">
                {editingStudent ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      
      <BottomNavigation appType="institution" />
    </>
  );
};

export default InstitutionStudents;
