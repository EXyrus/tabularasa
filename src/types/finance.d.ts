import { A } from 'ts-toolbelt';
import type { Student } from './users';

export type AccountDetails = {
    bankLogo: string;
    institutionName: string;
    accountDetails: string;
};

export type BankAccount = {
    id?: string;
    accountNumber: string;
    bankName: string;
    accountType?: string;
    status?: string;
    createdAt?: string;
};

export type Bank = {
    name: string;
    slug: string;
    code: string;
};

export type Currency = 'NGN';

export type InstitutionFee = {
    id: string;
    paymentTitle: string;
    amount: string;
    installments: string;
};

export type PaymentMethod = 'cash' | 'card' | 'transfer';
export type PaymentType = 'full' | 'partial';

export type Payment = {
    id: string;
    institutionId: string;
    organizationId: string;
    student: Student;
    amount: string;
    name: string;
    method: PaymentMethod;
    type: PaymentType;
    status: 'active' | 'inactive';
    createdAt: string;
};

export type Paystack = {
    trxref: TransactionId;
};

export type Transaction = {
    id: string;
    referenceNumber: string;
    channel: string;
    amount: string;
    description: string;
    institutionId: string;
    student: Student;
    paymentId: string;
    transactionDate: string;
    status: 'pending' | 'paid' | 'cancelled';
    createdAt: string;
};

export type TransactionId = A.Type<string, 'transaction_id'>;
