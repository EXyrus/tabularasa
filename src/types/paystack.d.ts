
export interface Paystack {
  button?: () => React.ReactNode;
  close: () => void;
  onSuccess: (response: Record<string, any>) => void;
  onCancel: () => void;
}

export interface PaystackProps {
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
}
