// Mirrors SimpleBankingAPI.DTOs.Response.ApiResponse<T>
export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

// Mirrors SimpleBankingAPI.DTOs.Response.AccountResponse
export interface Account {
  accountNumber: string;
  customerName: string;
  email: string;
  balance: number;
  createdAt: string;
}

// Mirrors SimpleBankingAPI.DTOs.Response.BalanceResponse
export interface Balance {
  accountNumber: string;
  customerName: string;
  balance: number;
}

// Mirrors SimpleBankingAPI.DTOs.Response.TransferSummary
export interface TransferSummary {
  transactionReference: string;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
  senderNewBalance: number;
  createdAt: string;
}

// Mirrors SimpleBankingAPI.DTOs.Request.CreateAccountRequest
export interface CreateAccountRequest {
  firstName: string;
  lastName: string;
  email: string;
}

// Mirrors SimpleBankingAPI.DTOs.Request.UpdateAccountRequest
export interface UpdateAccountRequest {
  firstName: string;
  lastName: string;
}

// Mirrors SimpleBankingAPI.DTOs.Request.DepositRequest
export interface DepositRequest {
  accountNumber: string;
  amount: number;
  naration: string;
}

// Mirrors SimpleBankingAPI.DTOs.Request.WithdrawRequest
export interface WithdrawRequest {
  accountNumber: string;
  amount: number;
}

// Mirrors SimpleBankingAPI.DTOs.Response.TransactionResponse
export interface Transaction {
  transactionType: string; // "Deposit" | "Withdrawal" | "Debit" | "Credit"
  accountNumber: string;
  amount: number;
  naration: string;
  reference: string;
  createdAt: string;
}

// Mirrors SimpleBankingAPI.DTOs.Response.StatementResponse
export interface Statement {
  accountNumber: string;
  customerName: string;
  fromDate: string | null;
  toDate: string | null;
  openingBalance: number;
  closingBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  transactions: Transaction[];
}

// Mirrors SimpleBankingAPI.DTOs.Request.TransferRequest
export interface TransferRequest {
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
  naration: string;
}
