// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck yet to fully implement
import { customAlphabet } from 'nanoid';
import type { Paystack, TransactionId } from 'types';

const nanoid = customAlphabet('1234567890', 8);

export const getTransactionId = (payment?: Paystack) => {
    if (!payment) {
        return generateTransactionId();
    }

    if ('trxref' in payment) {
        return payment.trxref;
    }

    return payment?.id as TransactionId;
};

export const generateTransactionId = () => {
    return String(nanoid()) as TransactionId;
};
