import { useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { accountsApi } from "@/api/accounts-api";
import { accountKeys } from "@/lib/query-client";
import type { ApiError } from "@/lib/api-client";
import type {
  CreateAccountRequest,
  DepositRequest,
  TransferRequest,
  UpdateAccountRequest,
  WithdrawRequest,
} from "@/types/banking";

function onError(error: ApiError) {
  toast.error(error.message);
}

/** Invalidates every cache entry that touches a given account. */
function invalidateAccount(queryClient: QueryClient, accountNumber: string) {
  queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
  queryClient.invalidateQueries({ queryKey: accountKeys.detail(accountNumber) });
  queryClient.invalidateQueries({ queryKey: accountKeys.balance(accountNumber) });
}

export function useOpenAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAccountRequest) => accountsApi.openAccount(payload),
    onSuccess: (account) => {
      toast.success(`Account ${account.accountNumber} opened successfully`);
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
    },
    onError,
  });
}

export function useUpdateAccount(accountNumber: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateAccountRequest) =>
      accountsApi.updateAccount(accountNumber, payload),
    onSuccess: () => {
      toast.success("Account details updated");
      invalidateAccount(queryClient, accountNumber);
    },
    onError,
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (accountNumber: string) => accountsApi.deleteAccount(accountNumber),
    onSuccess: (_result, accountNumber) => {
      toast.success("Account closed");
      invalidateAccount(queryClient, accountNumber);
    },
    onError,
  });
}

export function useReactivateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (accountNumber: string) => accountsApi.reactivateAccount(accountNumber),
    onSuccess: (_result, accountNumber) => {
      toast.success("Account reactivated");
      invalidateAccount(queryClient, accountNumber);
    },
    onError,
  });
}

export function useDeposit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: DepositRequest) => accountsApi.deposit(payload),
    onSuccess: (_result, variables) => {
      toast.success("Deposit successful");
      invalidateAccount(queryClient, variables.accountNumber);
    },
    onError,
  });
}

export function useWithdraw() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: WithdrawRequest) => accountsApi.withdraw(payload),
    onSuccess: (_result, variables) => {
      toast.success("Withdrawal successful");
      invalidateAccount(queryClient, variables.accountNumber);
    },
    onError,
  });
}

export function useTransferFund() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TransferRequest) => accountsApi.transferFund(payload),
    onSuccess: (_result, variables) => {
      toast.success("Transfer completed");
      invalidateAccount(queryClient, variables.senderAccountNumber);
      invalidateAccount(queryClient, variables.receiverAccountNumber);
    },
    onError,
  });
}
