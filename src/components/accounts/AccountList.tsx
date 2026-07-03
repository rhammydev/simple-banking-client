import { PiggyBank } from "lucide-react";
import { AccountCard } from "@/components/accounts/AccountCard";
import { LoadingPanel } from "@/components/ui/Spinner";
import { EmptyState, ErrorState } from "@/components/ui/EmptyState";
import type { Account } from "@/types/banking";
import { useBankName } from "@/hooks/useAccount";

interface AccountListProps {
  accounts: Account[] | undefined;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  searchTerm: string;
}

export function AccountList({
  accounts,
  isLoading,
  isError,
  errorMessage,
  searchTerm,
}: Readonly<AccountListProps>) {
  const { data: bankName } = useBankName();

  if (isLoading) return <LoadingPanel label="Loading accounts…" />;
  if (isError)
    return <ErrorState message={errorMessage ?? "Couldn't load accounts."} />;

  const filtered = (accounts ?? []).filter((account) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      account.customerName.toLowerCase().includes(term) ||
      account.accountNumber.toLowerCase().includes(term) ||
      account.email.toLowerCase().includes(term)
    );
  });

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={<PiggyBank className="h-6 w-6" />}
        title={searchTerm ? "No matching accounts" : "No accounts yet"}
        description={
          searchTerm
            ? "Try a different name, account number, or email."
            : `Open the first ${bankName || "Prestige"} Banking account to get started.`
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {filtered.map((account) => (
        <AccountCard key={account.accountNumber} account={account} />
      ))}
    </div>
  );
}
