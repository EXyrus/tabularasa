
export interface FinanceTransaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  type?: string;
}

export interface Transaction {
  id: string;
  transactionId: string;
  amount: number;
  reference: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
  type: 'credit' | 'debit';
  description: string;
}

export interface Paystack {
  publicKey: string;
  email: string;
  amount: number;
  reference: string;
  onSuccess: () => void;
  onClose: () => void;
}
