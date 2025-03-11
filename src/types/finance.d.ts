
export interface FinanceTransaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: 'income' | 'expense';
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  institutionId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Paystack {
  button?: () => React.ReactNode;
  close: () => void;
  onSuccess: (response: Record<string, any>) => void;
  onCancel: () => void;
}

export interface Transaction {
  id: string;
  amount: number;
  referenceNumber: string;
  status?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}


export type Paystack = {
  button?: () => React.ReactNode;
  close: () => void;
  onSuccess: (response: Record<string, any>) => void;
  onCancel: () => void;
};

export type PaystackProps = {
  publicKey: string;
  email: string;
  amount: number;
  reference?: string;
  metadata?: Record<string, any>;
  currency?: string;
  channels?: string[];
  callback?: (response: Record<string, any>) => void;
  onClose?: () => void;
  onSuccess?: (response: Record<string, any>) => void;
  onCancel?: () => void;
  className?: string;
  text?: string;
  disabled?: boolean;
};

