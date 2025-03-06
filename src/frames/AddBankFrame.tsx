
import React, { useState } from 'react';
import { Steps, Button, Form, Input, Select, message } from 'antd';
import { BankOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { BankAccount } from '@/types/institution';

const { Step } = Steps;
const { Option } = Select;

// Mock data for banks
const banks = [
  { id: 1, name: 'First Bank' },
  { id: 2, name: 'Access Bank' },
  { id: 3, name: 'Zenith Bank' },
  { id: 4, name: 'GTBank' },
  { id: 5, name: 'UBA' },
];

interface AddBankFrameProps {
  onClose: () => void;
  onSuccess?: (account: BankAccount) => void;
}

const AddBankFrame: React.FC<AddBankFrameProps> = ({ onClose, onSuccess }) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      if (current === 0) {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          setLoading(false);
          const newAccount: BankAccount = {
            id: Math.random().toString(36).substring(2, 9),
            bank: values.bank,
            accountNumber: values.accountNumber,
            accountName: values.accountName,
            accountType: values.accountType,
            isDefault: values.isDefault || false,
          };
          setBankAccount(newAccount);
          setCurrent(current + 1);
        }, 1000);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleFinish = () => {
    if (bankAccount && onSuccess) {
      onSuccess(bankAccount);
    }
    onClose();
  };

  const steps = [
    {
      title: 'Bank Details',
      content: (
        <Form
          form={form}
          layout="vertical"
          className="mt-6"
        >
          <Form.Item
            name="bank"
            label="Bank"
            rules={[{ required: true, message: 'Please select a bank' }]}
          >
            <Select placeholder="Select bank">
              {banks.map(bank => (
                <Option key={bank.id} value={bank.name}>{bank.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="accountNumber"
            label="Account Number"
            rules={[
              { required: true, message: 'Please enter account number' },
              { len: 10, message: 'Account number must be 10 digits' }
            ]}
          >
            <Input placeholder="Enter account number" />
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
            name="isDefault"
            valuePropName="checked"
          >
            <input type="checkbox" className="mr-2" /> Set as default account
          </Form.Item>
        </Form>
      ),
      icon: <BankOutlined />,
    },
    {
      title: 'Success',
      content: (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircleOutlined className="text-3xl text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Bank Account Added</h3>
          <p className="text-gray-500 text-center mb-6">
            Your bank account has been successfully added to your profile.
          </p>
          {bankAccount && (
            <div className="bg-gray-50 w-full p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Bank:</span>
                <span className="font-medium">{bankAccount.bank}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Account Name:</span>
                <span className="font-medium">{bankAccount.accountName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Account Number:</span>
                <span className="font-medium">{bankAccount.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account Type:</span>
                <span className="font-medium capitalize">{bankAccount.accountType}</span>
              </div>
            </div>
          )}
        </div>
      ),
      icon: <CheckCircleOutlined />,
    },
  ];

  return (
    <div className="p-6">
      <Steps current={current} className="mb-8">
        {steps.map(item => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="flex justify-end mt-8">
        {current === 0 && (
          <>
            <Button onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" onClick={handleNext} loading={loading}>
              Next
            </Button>
          </>
        )}
        {current === 1 && (
          <Button type="primary" onClick={handleFinish}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddBankFrame;
