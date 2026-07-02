import { useQuery } from "@tanstack/react-query";
import { accountsApi } from "@/api/accounts-api";
import { accountKeys } from "@/lib/query-client";

export function useAccounts() {
  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: accountsApi.getAllAccounts,
  });
}
