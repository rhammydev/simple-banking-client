import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

/** Central place to keep query key factories in sync across hooks. */
export const accountKeys = {
  all: ["accounts"] as const,
  lists: () => [...accountKeys.all, "list"] as const,
  detail: (accountNumber: string) =>
    [...accountKeys.all, "detail", accountNumber] as const,
  balance: (accountNumber: string) =>
    [...accountKeys.all, "balance", accountNumber] as const,
  statement: (accountNumber: string, fromDate?: string, toDate?: string) =>
    [
      ...accountKeys.all,
      "statement",
      accountNumber,
      fromDate ?? "",
      toDate ?? "",
    ] as const,
};
