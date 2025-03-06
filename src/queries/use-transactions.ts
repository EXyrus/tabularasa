import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance as axios from '@/overrides';
import { queryClient } from '@/overrides';
import type {
    Payment,
    SingleEmployeeResponse,
    Transaction,
    EmployeePayload
} from 'types';
import URIS from './uris.json';
// import { FetchResponseError } from 'types/fetch';

export const useTransactions = () => {
    return useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: async () => {
            const response = await axios.get<Transaction[]>(
                URIS.transactions.index
            );

            return response.data;
        }
    });
};

export const useGetTransaction = (transactionId: string) => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['transaction', institution.data.id, transactionId],

        queryFn: async () => {
            const response = await axios.get<Transaction>(
                `${URIS.institutions.index}/${institution.data.id}/transactions/${transactionId}`
            );

            return response.data;
        },

        enabled: !!institution.data.id && !!transactionId
    });
};

export const useSchoolTransactions = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['transactions', institution.data.id],

        queryFn: async () => {
            const response = await axios.get<Transaction[]>(
                `${URIS.institutions.index}/${institution.data.id}/transactions`
            );

            return response.data;
        }
    });
};

export const useSchoolTransactionDetails = (id: string) => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['transaction_details', id, institution.data.id],

        // Include id in the query key
        queryFn: async () => {
            const response = await axios.get<SingleEmployeeResponse>(
                `${URIS.institutions.index}/${institution.data.id}/transactions/${id}`
            );

            return response.data;
        }
    });
};

export const useUpdateTransaction = () => {
    return useMutation({
        // type later
        mutationFn: async (variables: unknown) => {
            const institution = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );
            const response = await axios.put<EmployeePayload>(
                `${URIS.institutions.index}/${institution.data.id}/transactions/${
                    (variables as { id: string }).id
                }`,
                variables
            );

            return response.data;
        }
    });
};

export const useCreatePayment = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    const mutation = useMutation({
        mutationFn: async (
            payment: Omit<Payment, 'id' | 'createdAt' | 'student'> & {
                studentId: string;
            }
        ) => {
            const response = await axios.post(
                `${URIS.institutions.index}/${institution.data.id}/payments`,
                payment
            );

            return response.data;
        }
    });

    return {
        createPayment: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
        isError: mutation.error
    };
};

export const useGetPayments = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    const query = useQuery({
        queryKey: ['payments', institution.data.id],

        queryFn: async () => {
            const response = await axios.get<Payment[]>(
                `${URIS.institutions.index}/${institution.data.id}/payments`
            );

            return response.data;
        },

        enabled: !!institution.data.id
    });

    return {
        payments: query.data,
        isLoading: query.isLoading,
        error: query.error,
        isError: query.isError,
        isSuccess: query.isSuccess
    };
};

export const useGetPayment = (paymentId: string) => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    const query = useQuery({
        queryKey: ['payment', institution.data.id, paymentId],

        queryFn: async () => {
            const response = await axios.get<Payment>(
                `${URIS.institutions.index}/${institution.data.id}/payments/${paymentId}`
            );

            return response.data;
        },

        enabled: !!institution.data.id && !!paymentId
    });

    return {
        payment: query.data,
        isLoading: query.isLoading,
        error: query.error,
        isError: query.isError,
        isSuccess: query.isSuccess
    };
};

// export const useUpdateBankAccount = () => {
//     return useMutation({
//         mutationFn: async (variables: unknown) => {
//             const institution = JSON.parse(
//                 localStorage.getItem('institutionTheme') ?? '{}'
//             );
//             const response = await axios.put<BankAccount>(
//                 `${URIS.institutions.index}/${institution.data.id}/transactions/${
//                     (variables as { id: string }).id
//                 }`,
//                 variables
//             );

//             return response.data;
//         }
//     });
// };
