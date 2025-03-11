
import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Institution, InstitutionDetailsPayload } from '@/types';

interface EditInstitutionFormProps {
  institution: Institution;
  onSubmit: (values: InstitutionDetailsPayload) => Promise<void>;
  isLoading?: boolean;
}

const { Option } = Select;

const EditInstitutionForm: React.FC<EditInstitutionFormProps> = ({
  institution,
  onSubmit,
  isLoading = false
}) => {
  const [form] = Form.useForm();

  // Initialize form values
  React.useEffect(() => {
    form.setFieldsValue({
      name: institution.name,
      type: institution.type,
      email: institution.email,
      phoneNumber: institution.phoneNumber
    });
  }, [institution, form]);

  const handleSubmit = async (values: any) => {
    const payload: InstitutionDetailsPayload = {
      id: institution.id,
      name: values.name,
      institutionType: values.type,
      email: values.email,
      phoneNumber: values.phoneNumber
    };
    
    await onSubmit(payload);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        name: institution.name,
        type: institution.type,
        email: institution.email,
        phoneNumber: institution.phoneNumber
      }}
    >
      <Form.Item
        name="name"
        label="Institution Name"
        rules={[{ required: true, message: 'Please enter institution name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="type"
        label="Institution Type"
        rules={[{ required: true, message: 'Please select institution type' }]}
      >
        <Select>
          <Option value="primary">Primary School</Option>
          <Option value="secondary">Secondary School</Option>
          <Option value="tertiary">Tertiary Institution</Option>
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
        <Input />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[{ required: true, message: 'Please enter phone number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditInstitutionForm;
