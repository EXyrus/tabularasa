
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Tabs, Space, Modal, Form, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { InstitutionDetailsCard } from "@/components/institutions/InstitutionDetailsCard";
import {
  useInstitutionDetails,
  useUpdateInstitutionStatus,
  useUpdateInstitutionDetails,
  useDeleteInstitution
} from "@/queries/use-institutions";
import { useToast } from "@/hooks/use-toast";
import EditInstitutionForm from "@/components/institutions/EditInstitutionForm";
import { InstitutionDetailsPayload } from "@/types";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const InstitutionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  
  const { data: institution, isLoading, error } = useInstitutionDetails(id || "");
  const updateStatusMutation = useUpdateInstitutionStatus();
  const updateDetailsMutation = useUpdateInstitutionDetails();
  const deleteInstitutionMutation = useDeleteInstitution();
  
  useEffect(() => {
    if (institution) {
      editForm.setFieldsValue({
        name: institution.name,
        type: institution.type
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
        description: `Institution status changed to ${status}`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update institution status"
      });
    }
  };
  
  const handleEditSubmit = async (values: InstitutionDetailsPayload) => {
    try {
      await updateDetailsMutation.mutateAsync({
        id: institution.id,
        name: values.name,
        institutionType: values.institutionType,
        email: values.email,
        phoneNumber: values.phoneNumber
      });
      setIsEditModalVisible(false);
      toast({
        title: "Details Updated",
        description: "Institution details updated successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update institution details"
      });
    }
  };
  
  const handleDelete = async () => {
    try {
      await deleteInstitutionMutation.mutateAsync({ id: institution.id });
      setIsDeleteModalVisible(false);
      toast({
        title: "Institution Deleted",
        description: "Institution has been successfully deleted"
      });
      navigate("/vendor/institutions");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete institution"
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
      
      <InstitutionDetailsCard institution={institution} />
      
      <Card className="mt-6">
        <Title level={4}>Status Management</Title>
        <div className="flex gap-4 mt-4">
          <Button
            type={institution.status === "active" ? "primary" : "default"}
            icon={<CheckCircleOutlined />}
            onClick={() => handleStatusChange("active")}
          >
            Set Active
          </Button>
          <Button
            danger={institution.status === "inactive"}
            icon={<CloseCircleOutlined />}
            onClick={() => handleStatusChange("inactive")}
          >
            Set Inactive
          </Button>
          <Button
            onClick={() => handleStatusChange("pending")}
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
        <EditInstitutionForm 
          institution={institution}
          onSubmit={handleEditSubmit}
          isLoading={updateDetailsMutation.isPending}
        />
      </Modal>
      
      <Modal
        title="Delete Institution"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button onClick={() => setIsDeleteModalVisible(false)} key="cancel">
            Cancel
          </Button>,
          <Button
            danger
            loading={deleteInstitutionMutation.isPending}
            onClick={handleDelete}
            key="delete"
          >
            Delete
          </Button>
        ]}
      >
        <p>
          Are you sure you want to delete {institution.name}? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default InstitutionDetails;
