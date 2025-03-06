
import { useQuery, useMutation } from '@tanstack/react-query';
import { FinanceTransaction } from '@/types/institution';
import { useToast } from '@/hooks/use-toast';

/**
 * Custom hook to fetch financial transactions
 */
export const useGetTransactions = () => {
  return useQuery({
    queryKey: ['financial_transactions'],
    queryFn: async () => {
      try {
        // Mock data for development - in production this would fetch from the API
        const mockTransactions: FinanceTransaction[] = [
          {
            id: '1',
            amount: 500000,
            date: '2023-10-01',
            description: 'Term 1 Fee Payment - Grade 10',
            type: 'income',
            category: 'Tuition',
            paymentMethod: 'Bank Transfer',
            reference: 'TRN-20231001-001',
            status: 'completed'
          },
          {
            id: '2',
            amount: 125000,
            date: '2023-10-05',
            description: 'Staff Salaries - October',
            type: 'expense',
            category: 'Payroll',
            paymentMethod: 'Bank Transfer',
            reference: 'PAY-20231005-001',
            status: 'completed'
          },
          {
            id: '3',
            amount: 75000,
            date: '2023-10-10',
            description: 'Utility Bills - September',
            type: 'expense',
            category: 'Operations',
            paymentMethod: 'Direct Debit',
            reference: 'UTIL-20231010-001',
            status: 'completed'
          },
          {
            id: '4',
            amount: 50000,
            date: '2023-10-15',
            description: 'Library Book Purchase',
            type: 'expense',
            category: 'Resources',
            paymentMethod: 'Credit Card',
            reference: 'PUR-20231015-001',
            status: 'completed'
          },
          {
            id: '5',
            amount: 120000,
            date: '2023-10-20',
            description: 'Exam Fees - Grade 12',
            type: 'income',
            category: 'Examination',
            paymentMethod: 'Cash',
            reference: 'EXAM-20231020-001',
            status: 'completed'
          }
        ];
        
        return mockTransactions;
      } catch (error: any) {
        console.error('Error fetching transactions:', error);
        throw new Error(error.message || 'Failed to fetch transactions');
      }
    },
    retry: 1,
  });
};

/**
 * Custom hook to add a financial transaction
 */
export const useAddTransaction = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (newTransaction: Omit<FinanceTransaction, 'id'>) => {
      try {
        // This would be an API call in production
        console.log('Adding transaction:', newTransaction);
        
        // Mock creating a new transaction with an ID
        const createdTransaction: FinanceTransaction = {
          id: Math.random().toString(36).substring(2, 11),
          ...newTransaction
        };
        
        return createdTransaction;
      } catch (error: any) {
        console.error('Error adding transaction:', error);
        throw new Error(error.message || 'Failed to add transaction');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Transaction recorded successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to record transaction: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

/**
 * Custom hook to update a financial transaction
 */
export const useUpdateTransaction = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (updatedTransaction: FinanceTransaction) => {
      try {
        // This would be an API call in production
        console.log('Updating transaction:', updatedTransaction);
        
        return updatedTransaction;
      } catch (error: any) {
        console.error('Error updating transaction:', error);
        throw new Error(error.message || 'Failed to update transaction');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Transaction updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update transaction: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};
