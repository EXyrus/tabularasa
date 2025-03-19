
export type Payment = {
  id: string;
  amount: number;
  description: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  studentId?: string;
  studentName?: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  reference: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type FinanceTransaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  reference: string;
  date: string;
  institutionId?: string;
  createdAt?: string;
  updatedAt?: string;
  paymentMethod?: string;
  status?: string;
};
