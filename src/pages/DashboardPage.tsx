import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Users, Wallet, PlusCircle } from "lucide-react";
import { useAccounts } from "@/hooks/useAccounts";
import { StatCard } from "@/components/ui/StatCard";
import { AccountSearch } from "@/components/accounts/AccountSearch";
import { AccountList } from "@/components/accounts/AccountList";
import { Button } from "@/components/ui/Button";
import { formatNaira } from "@/utils/format";
import type { ApiError } from "@/lib/api-client";

export function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: accounts, isLoading, isError, error } = useAccounts();

  const totalBalance = useMemo(
    () => (accounts ?? []).reduce((sum, account) => sum + account.balance, 0),
    [accounts],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[3px] text-gold">Overview</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-navy">Accounts Dashboard</h1>
        </div>
        <Link to="/open-account">
          <Button>
            <PlusCircle className="h-4 w-4" />
            Open Account
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total Accounts" value={String(accounts?.length ?? 0)} icon={Users} />
        <StatCard label="Combined Balance" value={formatNaira(totalBalance)} icon={Wallet} />
      </div>

      <AccountSearch value={searchTerm} onChange={setSearchTerm} />

      <AccountList
        accounts={accounts}
        isLoading={isLoading}
        isError={isError}
        errorMessage={(error as ApiError | null)?.message}
        searchTerm={searchTerm}
      />
    </div>
  );
}
