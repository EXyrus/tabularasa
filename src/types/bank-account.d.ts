
export interface BankAccount {
  id: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccountResponse {
  id: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccountRequest {
  bank: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  password?: string;
}
