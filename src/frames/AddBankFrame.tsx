
import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, Typography } from 'antd';
import { useToast } from '@/hooks/use-toast';
import { useAddBankAccount } from '@/queries/use-institutions';
import type { BankAccount } from '@/types/bank-account';

const { Title } = Typography;
const { Option } = Select;

interface AddBankFrameProps {
  onSuccess?: (account: BankAccount) => void;
  onCancel?: () => void;
}

const AddBankFrame: React.FC<AddBankFrameProps> = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const addBankAccountMutation = useAddBankAccount();

  const handleSubmit = async (values: {
    bank: string;
    accountNumber: string;
    accountName: string;
    accountType: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const result = await addBankAccountMutation.mutateAsync(values);
      toast({
        title: "Success",
        description: "Bank account added successfully",
      });
      if (onSuccess) {
        onSuccess(result);
      }
      form.resetFields();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add bank account. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <Title level={4} className="mb-6">Add Bank Account</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="bank"
          label="Bank Name"
          rules={[{ required: true, message: 'Please select a bank' }]}
        >
          <Select placeholder="Select your bank">
            <Option value="access">Access Bank</Option>
            <Option value="gtb">GTBank</Option>
            <Option value="first">First Bank</Option>
            <Option value="zenith">Zenith Bank</Option>
            <Option value="uba">UBA</Option>
            <Option value="sterling">Sterling Bank</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="accountNumber"
          label="Account Number"
          rules={[
            { required: true, message: 'Please enter your account number' },
            { len: 10, message: 'Account number must be 10 digits' }
          ]}
        >
          <Input placeholder="Enter 10-digit account number" />
        </Form.Item>

        <Form.Item
          name="accountName"
          label="Account Name"
          rules={[{ required: true, message: 'Please enter account name' }]}
        >
          <Input placeholder="Enter account name" />
        </Form.Item>

        <Form.Item
          name="accountType"
          label="Account Type"
          rules={[{ required: true, message: 'Please select account type' }]}
        >
          <Select placeholder="Select account type">
            <Option value="savings">Savings</Option>
            <Option value="current">Current</Option>
            <Option value="corporate">Corporate</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password to confirm' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item className="flex justify-end mt-6">
          <div className="flex gap-3">
            {onCancel && (
              <Button onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Add Bank Account
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBankFrame;
