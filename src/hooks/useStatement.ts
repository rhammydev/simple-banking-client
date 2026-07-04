import { useQuery } from "@tanstack/react-query";
import { accountsApi, type StatementDateRange } from "@/api/accounts-api";
import { accountKeys } from "@/lib/query-client";

export function useStatement(accountNumber: string, range: StatementDateRange) {
  return useQuery({
    queryKey: accountKeys.statement(
      accountNumber,
      range.fromDate,
      range.toDate,
    ),
    queryFn: () => accountsApi.getStatement(accountNumber, range),
    enabled: Boolean(accountNumber),
  });
}
