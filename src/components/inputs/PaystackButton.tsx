import { usePaystackPayment } from 'react-paystack';
import { App, Button } from 'antd';
import config from '@/config';
import { useAuth } from '@/hooks/useAuth';
import type { Paystack, Transaction } from '@/types';
import { Currencies } from '@/enums/currencies';

const options = {
  publicKey: config.PAYSTACK_PK,
};

type Props = {
  transaction: Transaction;
  currency?: 'NGN';
  onClose?: () => void;
  onSuccess: (response: Paystack) => void;
  text?: string;
};

const PaystackButton = ({
  transaction,
  currency = Currencies.NGN,
  onSuccess,
  onClose,
  text = 'Pay Now',
}: Props) => {
  const { notification } = App.useApp();
  const { user } = useAuth();

  const initializePayment = usePaystackPayment({
    ...options,
    amount: Number(transaction.amount),
    email: user?.email,
    firstname: user?.firstName || user?.lastName?.split(' ')[0] || '',
    lastname: user?.lastName || user?.lastName?.split(' ')[1] || '',
    reference: transaction.referenceNumber,
    currency,
  });

  const onClick = () => {
    try {
      initializePayment({ onSuccess, onClose });
    } catch (err) {
      const error = err as Error;

      setTimeout(() => {
        notification.error({ message: error.message });
      }, 50);
    }
  };

  return (
    <Button color="primary" onClick={onClick}>
      {text}
    </Button>
  );
};

export default PaystackButton;
