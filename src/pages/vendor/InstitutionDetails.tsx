
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Tabs, Space, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, UserAddOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { InstitutionDetailsCard } from '@/components/institutions/InstitutionDetailsCard';
import { EditInstitutionForm } from '@/components/institutions/EditInstitutionForm';
import { 
  useInstitutionDetails, 
  useUpdateInstitutionStatus,
  useUpdateInstitutionDetails,
  useDeleteInstitution
} from '@/queries/use-institutions';
import { useToast } from '@/hooks/use-toast';
import type { Institution, InstitutionStatusPayload, InstitutionDetailsPayload } from '@/types';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const InstitutionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [editForm] = Form.useForm();
  
  // Queries and Mutations
  const { data: institution, isLoading, error } = useInstitutionDetails(id || '');
  const updateStatusMutation = useUpdateInstitutionStatus();
  const updateDetailsMutation = useUpdateInstitutionDetails();
  const deleteInstitutionMutation = useDeleteInstitution();

  useEffect(() => {
    if (institution) {
      editForm.setFieldsValue({
        name: institution.name,
        institutionType: institution.type,
      });
    }
  }, [institution, editForm]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading institution details...</div>;
  }

  if (error || !institution) {
    return <div className="text-red-500">Error loading institution details</div>;
  }

  const handleStatusChange = async (status: 'active' | 'inactive' | 'pending') => {
    try {
      await updateStatusMutation.mutateAsync({ id: institution.id, status });
      toast({
        title: "Status Updated",
        description: `Institution status changed to ${status}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update institution status",
      });
    }
  };

  const handleEditSubmit = async (values: InstitutionDetailsPayload) => {
    try {
      await updateDetailsMutation.mutateAsync(values);
      setIsEditModalVisible(false);
      toast({
        title: "Details Updated",
        description: "Institution details updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update institution details",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInstitutionMutation.mutateAsync({ id: institution.id, status: institution.status });
      setIsDeleteModalVisible(false);
      toast({
        title: "Institution Deleted",
        description: "Institution has been successfully deleted",
      });
      navigate('/vendor/institutions');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete institution",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={3}>{institution.name}</Title>
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => setIsEditModalVisible(true)}
          >
            Edit Details
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => setIsDeleteModalVisible(true)}
          >
            Delete
          </Button>
        </Space>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="mb-6"
      >
        <TabPane tab="Details" key="details">
          <InstitutionDetailsCard institution={institution} />
        </TabPane>
        <TabPane tab="Edit" key="edit">
          <EditInstitutionForm 
            institution={institution} 
            onSubmit={handleEditSubmit}
            isLoading={updateDetailsMutation.isPending}
          />
        </TabPane>
      </Tabs>
      
      <Card className="mt-6">
        <Title level={4}>Status Management</Title>
        <div className="flex gap-4 mt-4">
          <Button
            type={institution.status === 'active' ? 'primary' : 'default'}
            icon={<CheckCircleOutlined />}
            onClick={() => handleStatusChange('active')}
          >
            Set Active
          </Button>
          <Button
            danger={institution.status === 'inactive'}
            icon={<CloseCircleOutlined />}
            onClick={() => handleStatusChange('inactive')}
          >
            Set Inactive
          </Button>
          <Button
            onClick={() => handleStatusChange('pending')}
          >
            Set Pending
          </Button>
        </div>
      </Card>

      <Modal
        title="Edit Institution Details"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            name="name"
            label="Institution Name"
            rules={[{ required: true, message: 'Please enter institution name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="institutionType"
            label="Institution Type"
            rules={[{ required: true, message: 'Please select institution type' }]}
          >
            <Select>
              <Option value="primary">Primary School</Option>
              <Option value="secondary">Secondary School</Option>
              <Option value="tertiary">Tertiary Institution</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsEditModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={updateDetailsMutation.isPending}>
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Institution"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="delete" 
            danger 
            loading={deleteInstitutionMutation.isPending}
            onClick={handleDelete}
          >
            Delete
          </Button>
        ]}
      >
        <p>Are you sure you want to delete {institution.name}? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default InstitutionDetails;
