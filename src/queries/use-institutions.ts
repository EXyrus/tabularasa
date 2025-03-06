
import { useQuery, useMutation } from '@tanstack/react-query';
import { BankAccount, BankAccountResponse } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { axios } from '@/overrides/index';
import uris from './uris.json';

/**
 * Custom hook to fetch bank accounts for an institution
 */
export const useGetBankAccounts = () => {
  return useQuery({
    queryKey: ['bank_accounts'],
    queryFn: async () => {
      try {
        // Mock data for development - in production this would fetch from the API
        const mockBankAccounts: BankAccount[] = [
          {
            id: '1',
            bank: 'Chase Bank',
            accountNumber: '1234567890',
            accountName: 'School Operations Account',
            accountType: 'checking',
            isDefault: true
          },
          {
            id: '2',
            bank: 'Bank of America',
            accountNumber: '0987654321',
            accountName: 'School Development Fund',
            accountType: 'savings',
            isDefault: false
          },
          {
            id: '3',
            bank: 'Wells Fargo',
            accountNumber: '5678901234',
            accountName: 'Student Activities Account',
            accountType: 'business',
            isDefault: false
          }
        ];
        
        return mockBankAccounts;
      } catch (error: any) {
        console.error('Error fetching bank accounts:', error);
        throw new Error(error.message || 'Failed to fetch bank accounts');
      }
    },
    retry: 1,
  });
};

/**
 * Custom hook to add a bank account
 */
export const useAddBankAccount = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (newAccount: Omit<BankAccount, 'id'> & { password?: string }) => {
      try {
        // This would be an API call in production
        console.log('Adding bank account:', newAccount);
        
        // Mock creating a new account with an ID
        const createdAccount: BankAccount = {
          id: Math.random().toString(36).substring(2, 11),
          bank: newAccount.bank,
          accountNumber: newAccount.accountNumber,
          accountName: newAccount.accountName,
          accountType: newAccount.accountType,
          isDefault: false
        };
        
        return createdAccount;
      } catch (error: any) {
        console.error('Error adding bank account:', error);
        throw new Error(error.message || 'Failed to add bank account');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Bank account added successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to add bank account: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

/**
 * Custom hook to update a bank account
 */
export const useUpdateBankAccount = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (updatedAccount: BankAccount) => {
      try {
        // This would be an API call in production
        console.log('Updating bank account:', updatedAccount);
        
        return updatedAccount;
      } catch (error: any) {
        console.error('Error updating bank account:', error);
        throw new Error(error.message || 'Failed to update bank account');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Bank account updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update bank account: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

/**
 * Custom hook to delete a bank account
 */
export const useDeleteBankAccount = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        // This would be an API call in production
        console.log('Deleting bank account with ID:', id);
        
        return id;
      } catch (error: any) {
        console.error('Error deleting bank account:', error);
        throw new Error(error.message || 'Failed to delete bank account');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Bank account deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to delete bank account: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

/**
 * Custom hook to fetch institution details
 */
export const useGetInstitutionDetails = (id: string) => {
  return useQuery({
    queryKey: ['institution', id],
    queryFn: async () => {
      try {
        // Mock data for development - in production this would fetch from the API
        return {
          id,
          name: 'Springfield Elementary',
          email: 'admin@springfield.edu',
          phoneNumber: '555-123-4567',
          type: 'primary',
          status: 'active',
          studentsCount: 450,
          employeesCount: 35,
          settings: {
            logo: 'https://example.com/logo.png',
            color: '#4A90E2',
            slug: 'springfield-elementary'
          },
          modules: [
            { id: '1', name: 'Academics', permissions: [] },
            { id: '2', name: 'Finance', permissions: [] },
            { id: '3', name: 'HR', permissions: [] }
          ]
        };
      } catch (error: any) {
        console.error('Error fetching institution details:', error);
        throw new Error(error.message || 'Failed to load institution details');
      }
    },
    retry: 1
  });
};

/**
 * Custom hook to update institution details
 */
export const useUpdateInstitution = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        // This would be an API call in production
        console.log('Updating institution:', data);
        
        return data;
      } catch (error: any) {
        console.error('Error updating institution:', error);
        throw new Error(error.message || 'Failed to update institution');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Institution updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update institution: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};
