import { apiClient } from "@/lib/api-client";
import type {
  Account,
  ApiResponse,
  Balance,
  CreateAccountRequest,
  DepositRequest,
  TransferRequest,
  TransferSummary,
  UpdateAccountRequest,
  WithdrawRequest,
} from "@/types/banking";

async function unwrap<T>(
  promise: Promise<{ data: ApiResponse<T> }>,
): Promise<T> {
  const { data } = await promise;
  if (!data.isSuccess) throw new Error(data.message);
  return data.data;
}

export const accountsApi = {
  openAccount: (payload: CreateAccountRequest) =>
    unwrap<Account>(apiClient.post("/Account/open-account", payload)),

  getAccount: (accountNumber: string) =>
    unwrap<Account>(apiClient.get(`/Account/${accountNumber}`)),

  updateAccount: (accountNumber: string, payload: UpdateAccountRequest) =>
    unwrap<Account>(apiClient.put(`/Account/${accountNumber}`, payload)),

  deleteAccount: (accountNumber: string) =>
    unwrap<boolean>(
      apiClient.delete(`/Account/delete-account/${accountNumber}`),
    ),

  reactivateAccount: (accountNumber: string) =>
    unwrap<boolean>(
      apiClient.post(`/Account/activate-account/${accountNumber}`),
    ),

  getAllAccounts: () =>
    unwrap<Account[]>(apiClient.get("/Account/all-accounts")),

  deposit: (payload: DepositRequest) =>
    unwrap<number>(apiClient.post("/Account/deposit", payload)),

  withdraw: (payload: WithdrawRequest) =>
    unwrap<number>(apiClient.post("/Account/withdraw", payload)),

  transferFund: (payload: TransferRequest) =>
    unwrap<TransferSummary>(apiClient.post("/Account/transfer-fund", payload)),

  getBalance: (accountNumber: string) =>
    unwrap<Balance>(apiClient.get(`/Account/balance/${accountNumber}`)),

  getBankName: () => unwrap<string>(apiClient.get("/Account/bank-name")),
};
