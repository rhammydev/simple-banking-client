import { useQuery } from "@tanstack/react-query";
import { accountsApi } from "@/api/accounts-api";
import { accountKeys } from "@/lib/query-client";

export function useAccount(accountNumber: string) {
  return useQuery({
    queryKey: accountKeys.detail(accountNumber),
    queryFn: () => accountsApi.getAccount(accountNumber),
    enabled: Boolean(accountNumber),
  });
}

export function useAccountBalance(accountNumber: string) {
  return useQuery({
    queryKey: accountKeys.balance(accountNumber),
    queryFn: () => accountsApi.getBalance(accountNumber),
    enabled: Boolean(accountNumber),
  });
}

export function useBankName() {
  return useQuery({
    queryKey: ["bankName"],
    queryFn: () => accountsApi.getBankName(),
    enabled: true,
  });
}
