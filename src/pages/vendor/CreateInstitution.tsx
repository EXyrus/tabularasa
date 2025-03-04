
import React, { useState } from 'react';
import { 
  Steps, 
  Button, 
  Form, 
  Input, 
  Card, 
  Typography, 
  message,
  Checkbox,
  Row,
  Col,
  Badge,
  Tag
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  BuildingIcon, 
  GraduationCapIcon,
  CreditCardIcon,
  ClipboardCheckIcon,
  UsersIcon,
  CalendarIcon,
  MessageSquareIcon
} from 'lucide-react';

const { Title, Paragraph, Text } = Typography;

interface StepItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  content: React.ReactNode;
}

const CreateInstitution: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // Track which modules are completed in setup process
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>({
    finance: false,
    attendance: false,
    account: false,
    class: false,
    event: false,
    community: false
  });

  // Track which steps in the form have been completed
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    0: false,
    1: false
  });
  
  const handleNext = async () => {
    try {
      // Always try to validate current form if it's step 0 or 1
      if (currentStep <= 1) {
        await form.validateFields();
        
        // Mark current step as completed
        setCompletedSteps(prev => ({
          ...prev,
          [currentStep]: true
        }));
      }
      
      if (currentStep === steps.length - 1) {
        message.success('Institution created successfully!');
        navigate('/vendor/dashboard');
        return;
      }
      
      setCurrentStep(current => current + 1);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };
  
  const handlePrev = () => {
    setCurrentStep(current => current - 1);
  };
  
  // Handle module selection in step 2
  const handleModuleToggle = (module: string) => {
    setSelectedModules(prev => ({
      ...prev,
      [module]: !prev[module]
    }));
  };
  
  const steps: StepItem[] = [
    {
      title: 'Get Started',
      icon: <GraduationCapIcon className="h-6 w-6" />,
      description: 'Start by entering basic details about the institution',
      content: (
        <Card className="w-full max-w-md">
          <Title level={4}>Get Started</Title>
          <Paragraph className="text-gray-500 mb-6">
            Start by entering basic details about the new institution.
          </Paragraph>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
              <div className="flex items-start">
                <BuildingIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <Text strong className="text-blue-700">Institution Details</Text>
                  <Paragraph className="text-sm text-blue-600 mb-0">
                    View institution, edit details, manage account, view account and others
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-100 rounded-md p-4 mb-6">
              <div className="flex items-start">
                <CreditCardIcon className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                <div>
                  <Text strong className="text-orange-700">Assign Modules</Text>
                  <Paragraph className="text-sm text-orange-600 mb-0">
                    Assign modules, manage features and options for your institution
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-100 rounded-md p-4">
              <div className="flex items-start">
                <MessageSquareIcon className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                <div>
                  <Text strong className="text-purple-700">Customize</Text>
                  <Paragraph className="text-sm text-purple-600 mb-0">
                    Add customization, edit details, manage account, delete account
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button type="primary" block size="large" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Card>
      )
    },
    {
      title: 'Institution Details',
      icon: <BuildingIcon className="h-6 w-6" />,
      description: 'Fill in institutional information',
      content: (
        <Card className="w-full max-w-md">
          <Title level={4}>Institution Details</Title>
          <Paragraph className="text-gray-500 mb-6">
            Fill in basic information about the institution.
          </Paragraph>
          
          <Form
            form={form}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="institutionName"
              label="Institution Name"
              rules={[{ required: true, message: 'Please enter institution name' }]}
            >
              <Input placeholder="Ex: Academy" />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="admin@yourinstitution.com" />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
            
            <Form.Item
              name="address"
              label="Address"
            >
              <Input.TextArea rows={3} placeholder="Institution address" />
            </Form.Item>
          </Form>
          
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev}>
              Back
            </Button>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Card>
      )
    },
    {
      title: 'Assign Modules',
      icon: <CreditCardIcon className="h-6 w-6" />,
      description: 'Select modules to enable',
      content: (
        <Card className="w-full max-w-md">
          <Title level={4}>Assign Modules</Title>
          <Paragraph className="text-gray-500 mb-6">
            Select which modules to enable for this institution.
          </Paragraph>
          
          <div className="space-y-4">
            <div 
              className={`p-4 border rounded-md cursor-pointer transition-all ${selectedModules.finance ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleModuleToggle('finance')}
            >
              <div className="flex items-start">
                <Checkbox checked={selectedModules.finance} className="mt-1 mr-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Text strong>Finance & Payment</Text>
                    <Tag color="orange">OPTIONAL</Tag>
                  </div>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Manage invoices and payments
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border rounded-md cursor-pointer transition-all ${selectedModules.attendance ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleModuleToggle('attendance')}
            >
              <div className="flex items-start">
                <Checkbox checked={selectedModules.attendance} className="mt-1 mr-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Text strong>Attendance Record</Text>
                    <Tag color="orange">OPTIONAL</Tag>
                  </div>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Track and manage attendance records
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border rounded-md cursor-pointer transition-all ${selectedModules.account ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleModuleToggle('account')}
            >
              <div className="flex items-start">
                <Checkbox checked={selectedModules.account} className="mt-1 mr-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Text strong>Account Management</Text>
                    <Tag color="orange">OPTIONAL</Tag>
                  </div>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Manage users and permissions
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border rounded-md cursor-pointer transition-all ${selectedModules.class ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleModuleToggle('class')}
            >
              <div className="flex items-start">
                <Checkbox checked={selectedModules.class} className="mt-1 mr-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Text strong>Class Management</Text>
                    <Tag color="orange">OPTIONAL</Tag>
                  </div>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Create classrooms, assign teachers and students
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border rounded-md cursor-pointer transition-all ${selectedModules.event ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleModuleToggle('event')}
            >
              <div className="flex items-start">
                <Checkbox checked={selectedModules.event} className="mt-1 mr-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Text strong>Event and Notification</Text>
                    <Tag color="orange">OPTIONAL</Tag>
                  </div>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Create events and send notifications
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border rounded-md cursor-pointer transition-all ${selectedModules.community ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleModuleToggle('community')}
            >
              <div className="flex items-start">
                <Checkbox checked={selectedModules.community} className="mt-1 mr-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Text strong>Community</Text>
                    <Tag color="orange">OPTIONAL</Tag>
                  </div>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Create posts and manage forums
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev}>
              Back
            </Button>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Card>
      )
    },
    {
      title: 'Finance & Payment',
      icon: <CreditCardIcon className="h-6 w-6" />,
      description: 'Set up payment options',
      content: (
        <Card className="w-full max-w-md">
          <Title level={4}>Finance & Payment</Title>
          <Paragraph className="text-gray-500 mb-6">
            Configure payment options and financial settings.
          </Paragraph>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <Text strong>Selected Payment Options</Text>
            </div>
            
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="border rounded-md p-4 h-full flex flex-col items-center justify-center text-center hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <CreditCardIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <Text strong>Credit/Debit Cards</Text>
                </div>
              </Col>
              <Col span={12}>
                <div className="border rounded-md p-4 h-full flex flex-col items-center justify-center text-center hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">
                  <div className="bg-green-100 p-3 rounded-full mb-3">
                    <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 9H2M14 17H8M6 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H6C5.44772 5 5 5.44772 5 6V12C5 12.5523 5.44772 13 6 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <Text strong>Bank Transfer</Text>
                </div>
              </Col>
              <Col span={12}>
                <div className="border rounded-md p-4 h-full flex flex-col items-center justify-center text-center hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">
                  <div className="bg-purple-100 p-3 rounded-full mb-3">
                    <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <Text strong>Mobile Payment</Text>
                </div>
              </Col>
              <Col span={12}>
                <div className="border rounded-md p-4 h-full flex flex-col items-center justify-center text-center hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">
                  <div className="bg-orange-100 p-3 rounded-full mb-3">
                    <svg className="h-6 w-6 text-orange-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 8H19C20.1046 8 21 8.89543 21 10V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V10C3 8.89543 3.89543 8 5 8H7M9 6H15M12 16V12M15 16V14M9 16V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <Text strong>Cash Payment</Text>
                </div>
              </Col>
            </Row>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev}>
              Back
            </Button>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Card>
      )
    },
    {
      title: 'Attendance',
      icon: <ClipboardCheckIcon className="h-6 w-6" />,
      description: 'Configure attendance options',
      content: (
        <Card className="w-full max-w-md">
          <Title level={4}>Attendance Record</Title>
          <Paragraph className="text-gray-500 mb-6">
            Configure attendance tracking settings.
          </Paragraph>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <Text strong>Attendance Options</Text>
            </div>
            
            <div className="border rounded-md p-4 mb-4 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center">
                <Checkbox className="mr-3" />
                <div>
                  <Text strong>Daily Attendance</Text>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Track student attendance on a daily basis
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center">
                <Checkbox className="mr-3" />
                <div>
                  <Text strong>Class Attendance</Text>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Track attendance for individual classes
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center">
                <Checkbox className="mr-3" />
                <div>
                  <Text strong>Automated Notifications</Text>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Send notifications to parents for absences
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center">
                <Checkbox className="mr-3" />
                <div>
                  <Text strong>Attendance Reports</Text>
                  <Paragraph className="text-sm text-gray-500 mb-0">
                    Generate detailed attendance reports
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev}>
              Back
            </Button>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Card>
      )
    },
    {
      title: 'Account Management',
      icon: <UsersIcon className="h-6 w-6" />,
      description: 'Set up user accounts',
      content: (
        <Card className="w-full max-w-md">
          <Title level={4}>Account Management</Title>
          <Paragraph className="text-gray-500 mb-6">
            Configure user account settings and permissions.
          </Paragraph>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <Text strong>Account Options</Text>
            </div>
            
            <div className="border rounded-md p-4 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <UsersIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <Text strong>Default Admin Account</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Creates a default admin user with full access
                    </Paragraph>
                  </div>
                </div>
                <Checkbox checked disabled />
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <Text strong className="mb-2 block">Account Creation Method</Text>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Checkbox className="mr-2" />
                  <Text>Allow teachers to create their own accounts</Text>
                </div>
                
                <div className="flex items-center">
                  <Checkbox className="mr-2" />
                  <Text>Allow parents to create their own accounts</Text>
                </div>
                
                <div className="flex items-center">
                  <Checkbox className="mr-2" defaultChecked />
                  <Text>Admin creates all accounts</Text>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev}>
              Back
            </Button>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Card>
      )
    },
    {
      title: 'Class Management',
      icon: <GraduationCapIcon className="h-6 w-6" />,
      description: 'Set up classes',
      content: (
        <Card className="w-full max-w-md">
          <Title level={4}>Class Management</Title>
          <Paragraph className="text-gray-500 mb-6">
            Configure classroom settings and organization.
          </Paragraph>
          
          <div className="space-y-4">
            <div className="flex justify-end mb-2">
              <Button type="primary" className="mb-4">Create Assignment</Button>
              <Button type="default" className="mb-4 ml-2">Create a Class</Button>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <GraduationCapIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <Text strong>Class Structure</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Organize classes by grade levels and subjects
                    </Paragraph>
                  </div>
                </div>
                <Badge status="processing" text="Active" />
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <UsersIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <Text strong>Student Assignment</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Assign students to specific classes
                    </Paragraph>
                  </div>
                </div>
                <Badge status="processing" text="Active" />
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <CalendarIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <Text strong>Schedule Management</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Create and manage class schedules
                    </Paragraph>
                  </div>
                </div>
                <Badge status="default" text="Optional" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev}>
              Back
            </Button>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Card>
      )
    },
    {
      title: 'Events',
      icon: <CalendarIcon className="h-6 w-6" />,
      description: 'Configure event settings',
      content: (
        <Card className="w-full max-w-md">
          <Title level={4}>Event and Notification</Title>
          <Paragraph className="text-gray-500 mb-6">
            Configure events and notification settings.
          </Paragraph>
          
          <div className="space-y-4">
            <div className="flex justify-end mb-2">
              <Button type="primary" className="mb-4">Create Event</Button>
              <Button type="default" className="mb-4 ml-2">Send Notification</Button>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-3">
                    <CalendarIcon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <Text strong>Event Types</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Configure different types of school events
                    </Paragraph>
                  </div>
                </div>
                <Badge status="processing" text="Active" />
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <Text strong>Notification Methods</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Email, SMS, and in-app notifications
                    </Paragraph>
                  </div>
                </div>
                <Badge status="processing" text="Active" />
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <Text strong>Recipient Groups</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Target notifications to specific groups
                    </Paragraph>
                  </div>
                </div>
                <Badge status="default" text="Optional" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev}>
              Back
            </Button>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Card>
      )
    },
    {
      title: 'Community',
      icon: <MessageSquareIcon className="h-6 w-6" />,
      description: 'Set up community features',
      content: (
        <Card className="w-full max-w-md">
          <Title level={4}>Community</Title>
          <Paragraph className="text-gray-500 mb-6">
            Configure community and communication features.
          </Paragraph>
          
          <div className="space-y-4">
            <div className="flex justify-end mb-2">
              <Button type="primary" className="mb-4">Create Event</Button>
              <Button type="default" className="mb-4 ml-2">Add User to Community</Button>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <MessageSquareIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <Text strong>Discussion Forums</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Create topic-based discussion forums
                    </Paragraph>
                  </div>
                </div>
                <Badge status="processing" text="Active" />
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H15L12 19L9 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <Text strong>Announcements</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Broadcast important information
                    </Paragraph>
                  </div>
                </div>
                <Badge status="processing" text="Active" />
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <Text strong>Moderation Tools</Text>
                    <Paragraph className="text-sm text-gray-500 mb-0">
                      Manage and moderate community content
                    </Paragraph>
                  </div>
                </div>
                <Badge status="default" text="Optional" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev}>
              Back
            </Button>
            <Button type="primary" onClick={handleNext}>
              Complete Setup
            </Button>
          </div>
        </Card>
      )
    }
  ];
  
  // Calculate current step display based on module selections
  const displayStep = () => {
    // First 3 steps are always shown
    if (currentStep < 3) {
      return steps[currentStep];
    }
    
    // Map of module keys to their respective step indices
    const moduleStepMap: Record<string, number> = {
      finance: 3,
      attendance: 4,
      account: 5,
      class: 6,
      event: 7,
      community: 8
    };
    
    // Get all selected modules
    const selectedModuleKeys = Object.keys(selectedModules).filter(key => selectedModules[key as keyof typeof selectedModules]);
    
    // If no modules selected, show completion
    if (selectedModuleKeys.length === 0) {
      return steps[steps.length - 1];
    }
    
    // Find current module step
    const adjustedStep = currentStep - 3; // Adjust for the first 3 fixed steps
    if (adjustedStep >= selectedModuleKeys.length) {
      // We've gone through all modules, show completion
      return steps[steps.length - 1];
    }
    
    const currentModuleKey = selectedModuleKeys[adjustedStep];
    return steps[moduleStepMap[currentModuleKey]];
  };
  
  const currentContent = displayStep().content;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Title level={2}>Create a new institution</Title>
          <Paragraph className="text-gray-500">
            Follow the steps below to set up a new institution in the system.
          </Paragraph>
        </div>
        
        <Steps
          current={currentStep}
          className="mb-12 max-w-3xl mx-auto"
          responsive={false}
          items={[
            {
              title: 'Get Started',
              icon: <GraduationCapIcon className="h-5 w-5" />,
              description: 'Basic information',
              status: completedSteps[0] ? 'finish' : undefined
            },
            {
              title: 'Institution Details',
              icon: <BuildingIcon className="h-5 w-5" />,
              description: 'Fill institution data',
              status: completedSteps[1] ? 'finish' : undefined
            },
            {
              title: 'Assign Modules',
              icon: <CreditCardIcon className="h-5 w-5" />,
              description: 'Select modules',
            },
            {
              title: 'Configuration',
              icon: <GraduationCapIcon className="h-5 w-5" />,
              description: 'Setup modules',
            }
          ]}
        />
        
        <div className="flex justify-center">
          {currentContent}
        </div>
      </div>
    </div>
  );
};

export default CreateInstitution;
