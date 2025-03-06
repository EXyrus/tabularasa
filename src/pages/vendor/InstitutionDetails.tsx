
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Tabs, 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker,
  Spin, 
  Typography, 
  Alert,
  Switch
} from 'antd';
import { ArrowLeftIcon, BuildingIcon, MailIcon, PhoneIcon, GlobeIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { useInstitutionDetails, useUpdateInstitutionDetails, useUpdateInstitutionStatus } from '@/queries/use-institutions';
import HeaderBar from '@/components/HeaderBar';
import { useToast } from '@/hooks/use-toast';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const InstitutionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form] = Form.useForm();
  const [statusForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');

  // Query the institution details
  const { data: institution, isLoading, isError, error } = useInstitutionDetails(id || '');
  
  // Mutations
  const updateInstitutionMutation = useUpdateInstitutionDetails();
  const updateStatusMutation = useUpdateInstitutionStatus();
  
  const handleSubmit = async (values: any) => {
    try {
      await updateInstitutionMutation.mutateAsync({
        id: id || '',
        ...values
      });
      
      toast({
        title: "Success",
        description: "Institution details updated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update institution details",
        variant: "destructive",
      });
    }
  };
  
  const handleStatusChange = async (values: any) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: id || '',
        status: values.status
      });
      
      toast({
        title: "Success",
        description: `Institution ${values.status === 'active' ? 'activated' : 'suspended'} successfully`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update institution status",
        variant: "destructive",
      });
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Alert 
          message="Error" 
          description={`Failed to load institution details: ${error?.message}`}
          type="error" 
          showIcon 
        />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeaderBar appType="vendor" userName="Vendor Admin" />
      
      <div className="container mx-auto p-4 pt-20">
        <div className="mb-6 flex items-center">
          <Button 
            icon={<ArrowLeftIcon className="h-4 w-4" />} 
            onClick={handleGoBack}
            className="mr-3"
          >
            Back
          </Button>
          <Title level={4} className="!m-0">Institution Details</Title>
        </div>
        
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                <BuildingIcon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <Title level={4} className="!m-0">{institution?.name}</Title>
                <div className="flex items-center">
                  <Text className="text-gray-500 dark:text-gray-400">{institution?.type || 'Educational Institution'}</Text>
                  <span className="mx-2">•</span>
                  <Text className={`px-2 py-0.5 rounded-full text-xs ${
                    institution?.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {institution?.status === 'active' ? 'Active' : 'Suspended'}
                  </Text>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button type="primary" onClick={() => setActiveTab('2')}>
                Edit Details
              </Button>
              <Button 
                type={institution?.status === 'active' ? 'default' : 'primary'} 
                danger={institution?.status === 'active'}
                onClick={() => setActiveTab('3')}
              >
                {institution?.status === 'active' ? 'Suspend' : 'Activate'}
              </Button>
            </div>
          </div>
          
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Overview" key="1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Text className="text-gray-500 dark:text-gray-400 block mb-2">Contact Information</Text>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MailIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <Text className="font-medium">Email</Text>
                        <Text className="block text-gray-600 dark:text-gray-300">{institution?.email || 'N/A'}</Text>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <Text className="font-medium">Phone</Text>
                        <Text className="block text-gray-600 dark:text-gray-300">{institution?.phone || 'N/A'}</Text>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <GlobeIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <Text className="font-medium">Website</Text>
                        <Text className="block text-gray-600 dark:text-gray-300">{institution?.website || 'N/A'}</Text>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Text className="text-gray-500 dark:text-gray-400 block mb-2">Institution Information</Text>
                  <div className="space-y-3">
                    <div>
                      <Text className="font-medium">Type</Text>
                      <Text className="block text-gray-600 dark:text-gray-300">{institution?.type || 'N/A'}</Text>
                    </div>
                    
                    <div>
                      <Text className="font-medium">Address</Text>
                      <Text className="block text-gray-600 dark:text-gray-300">{institution?.address || 'N/A'}</Text>
                    </div>
                    
                    <div>
                      <Text className="font-medium">Established</Text>
                      <Text className="block text-gray-600 dark:text-gray-300">{institution?.establishedDate || 'N/A'}</Text>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            
            <TabPane tab="Edit Details" key="2">
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  name: institution?.name,
                  email: institution?.email,
                  phone: institution?.phone,
                  website: institution?.website,
                  type: institution?.type,
                  address: institution?.address,
                  establishedDate: institution?.establishedDate ? new Date(institution.establishedDate) : undefined
                }}
                onFinish={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item 
                    name="name" 
                    label="Institution Name"
                    rules={[{ required: true, message: 'Please input institution name' }]}
                  >
                    <Input />
                  </Form.Item>
                  
                  <Form.Item 
                    name="email" 
                    label="Email"
                    rules={[
                      { required: true, message: 'Please input email address' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  
                  <Form.Item 
                    name="phone" 
                    label="Phone"
                  >
                    <Input />
                  </Form.Item>
                  
                  <Form.Item 
                    name="website" 
                    label="Website"
                  >
                    <Input />
                  </Form.Item>
                  
                  <Form.Item 
                    name="type" 
                    label="Institution Type"
                  >
                    <Select>
                      <Option value="primary">Primary School</Option>
                      <Option value="secondary">Secondary School</Option>
                      <Option value="university">University</Option>
                      <Option value="vocational">Vocational Institute</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item 
                    name="establishedDate" 
                    label="Established Date"
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  
                  <Form.Item 
                    name="address" 
                    label="Address"
                    className="md:col-span-2"
                  >
                    <Input.TextArea rows={3} />
                  </Form.Item>
                </div>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={updateInstitutionMutation.isPending}>
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            
            <TabPane tab="Manage Status" key="3">
              <Form
                form={statusForm}
                layout="vertical"
                initialValues={{
                  status: institution?.status
                }}
                onFinish={handleStatusChange}
              >
                <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <Text className="block mb-2 font-medium">Current Status</Text>
                  <div className="flex items-center">
                    {institution?.status === 'active' ? (
                      <>
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        <Text className="text-green-600 dark:text-green-400">Active</Text>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                        <Text className="text-red-600 dark:text-red-400">Suspended</Text>
                      </>
                    )}
                  </div>
                </div>
                
                <Form.Item
                  name="status"
                  label="Institution Status"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="active">Active</Option>
                    <Option value="suspended">Suspended</Option>
                  </Select>
                </Form.Item>
                
                <Alert
                  message="Important"
                  description={
                    <div>
                      <p>Changing the status of an institution will affect user access:</p>
                      <ul className="list-disc pl-5 mt-2">
                        <li>Active: Users can log in and access all features</li>
                        <li>Suspended: Users cannot log in and all service access is temporarily blocked</li>
                      </ul>
                    </div>
                  }
                  type="warning"
                  showIcon
                  className="mb-4"
                />
                
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    danger={institution?.status === 'active'}
                    loading={updateStatusMutation.isPending}
                  >
                    {institution?.status === 'active' ? 'Suspend Institution' : 'Activate Institution'}
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionDetails;
