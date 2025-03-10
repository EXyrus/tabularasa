
import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Typography } from 'antd';
import type { Institution, InstitutionDetailsPayload } from '@/types';

const { Option } = Select;
const { Title } = Typography;

interface EditInstitutionFormProps {
  institution: Institution;
  onSubmit: (values: InstitutionDetailsPayload) => Promise<void>;
  isLoading: boolean;
}

export const EditInstitutionForm: React.FC<EditInstitutionFormProps> = ({
  institution,
  onSubmit,
  isLoading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: institution.name,
      institutionType: institution.type,
      email: institution.email,
      phoneNumber: institution.phoneNumber,
    });
  }, [institution, form]);

  const handleSubmit = async (values: any) => {
    const payload: InstitutionDetailsPayload = {
      id: institution.id,
      name: values.name,
      institutionType: values.institutionType,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };
    await onSubmit(payload);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Title level={4}>Edit Institution Details</Title>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: institution.name,
          institutionType: institution.type,
          email: institution.email,
          phoneNumber: institution.phoneNumber,
        }}
      >
        <Form.Item
          name="name"
          label="Institution Name"
          rules={[{ required: true, message: 'Please enter institution name' }]}
        >
          <Input placeholder="Enter institution name" />
        </Form.Item>

        <Form.Item
          name="institutionType"
          label="Institution Type"
          rules={[{ required: true, message: 'Please select institution type' }]}
        >
          <Select placeholder="Select institution type">
            <Option value="primary">Primary School</Option>
            <Option value="secondary">Secondary School</Option>
            <Option value="tertiary">Tertiary Institution</Option>
            <Option value="vocational">Vocational Institution</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter email address' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item className="mt-6">
          <div className="flex justify-end gap-3">
            <Button htmlType="reset">Reset</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Update Institution
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
