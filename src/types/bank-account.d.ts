
export type BankAccount = {
  id: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
};

export type BankAccountResponse = {
  id: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
};
