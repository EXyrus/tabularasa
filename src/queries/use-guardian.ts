import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'overrides/axios';
import { queryClient } from 'overrides/react-query';
import type { Transaction, Payment, Student, User } from 'types';
import URIS from './uris.json';

export const useGuardianAccount = () => {
    return useQuery({
        queryKey: ['guardian-account'],
        queryFn: async () => {
            const response = await axios.get<User>(`${URIS.guardians.index}`);

            return response.data;
        }
    });
};

export const useUpdateGuardianAccount = () => {
    return useMutation({
        mutationFn: async (data: User) => {
            const response = await axios.put(`${URIS.guardians.index}`, data);

            return response.data;
        }
    });
};

export const useSchoolFees = () => {
    return useQuery({
        queryKey: ['payments'],

        queryFn: async () => {
            const response = await axios.get<Payment[]>(
                `${URIS.students.fees}`
            );

            return response.data;
        }
    });
};

export const useSchoolFee = (paymentId: string) => {
    return useQuery({
        queryKey: ['payment', paymentId],

        queryFn: async () => {
            const response = await axios.get<{
                payment: Payment;
                transaction: Transaction;
            }>(`${URIS.students.fees}/${paymentId}`);

            return response.data;
        },

        enabled: !!paymentId // Only run the query if paymentId is defined
    });
};

type UpdatePaymentStatusParams = {
    paymentId: string;
    status: string;
};

export const useUpdatePaymentStatus = () => {
    return useMutation<unknown, Error, UpdatePaymentStatusParams>({
        mutationFn: async ({
            paymentId,
            status
        }: UpdatePaymentStatusParams) => {
            const response = await axios.put(
                `${URIS.students.fees}/${paymentId}`,
                { status }
            );

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payment'] });
        }
    });
};

export const useGuardianStudents = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const response = await axios.get<Student[]>(
                `${URIS.guardians.students}`
            );

            return response.data;
        }
    });
};

export const useGuardianStudent = (studentId: string) => {
    return useQuery({
        queryKey: ['student', studentId],
        queryFn: async () => {
            const response = await axios.get<Student>(
                `${URIS.guardians.students}/${studentId}`
            );

            return response.data;
        }
    });
};
