import { useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { useStatement } from "@/hooks/useStatement";
import { StatementFilters } from "@/components/accounts/StatementFilters";
import { StatementSummary } from "@/components/accounts/StatementSummary";
import { TransactionTable } from "@/components/accounts/TransactionTable";
import { Button } from "@/components/ui/Button";
import { LoadingPanel } from "@/components/ui/Spinner";
import { ErrorState } from "@/components/ui/EmptyState";
import type { StatementDateRange } from "@/api/accounts-api";
import type { ApiError } from "@/lib/api-client";

export function StatementPage() {
  const { accountNumber } = useParams({
    from: "/accounts/$accountNumber/statement",
  });
  const [range, setRange] = useState<StatementDateRange>({});

  const {
    data: statement,
    isLoading,
    isError,
    error,
  } = useStatement(accountNumber, range);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to="/accounts/$accountNumber"
            params={{ accountNumber }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint hover:text-navy print:hidden"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to account
          </Link>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy">
            Account Statement
          </h1>
          <p className="mt-1 font-mono text-sm text-ink-faint">
            {accountNumber}
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => window.print()}
          className="print:hidden"
        >
          <Printer className="h-4 w-4" />
          Print Statement
        </Button>
      </div>

      <div className="print:hidden">
        <StatementFilters range={range} onChange={setRange} />
      </div>

      {isLoading && <LoadingPanel label="Building statement…" />}
      {isError && (
        <ErrorState
          message={
            (error as ApiError | null)?.message ?? "Couldn't load statement."
          }
        />
      )}

      {statement && (
        <>
          <StatementSummary statement={statement} />
          <TransactionTable transactions={statement.transactions} />
        </>
      )}
    </div>
  );
}
