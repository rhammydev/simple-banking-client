import { ArrowDownLeft, ArrowUpRight, Receipt } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNaira, formatDate, isCreditTransaction } from "@/utils/format";
import type { Transaction } from "@/types/banking";

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={<Receipt className="h-6 w-6" />}
        title="No transactions in this range"
        description="Try widening the date range or clearing the filter."
      />
    );
  }

  return (
    <Card className="overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-muted text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
          <tr>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Type</th>
            <th className="px-5 py-3">Narration</th>
            <th className="px-5 py-3">Reference</th>
            <th className="px-5 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => {
            const isCredit = isCreditTransaction(tx.transactionType);
            return (
              <tr key={tx.reference} className="border-t border-surface-border">
                <td className="px-5 py-3.5 text-ink-soft">{formatDate(tx.createdAt)}</td>
                <td className="px-5 py-3.5">
                  <Badge tone={isCredit ? "success" : "danger"} dot>
                    {isCredit ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                    {tx.transactionType}
                  </Badge>
                </td>
                <td className="px-5 py-3.5 max-w-xs truncate text-ink-soft">{tx.naration || "—"}</td>
                <td className="px-5 py-3.5 font-mono text-xs text-ink-faint">{tx.reference}</td>
                <td
                  className={`px-5 py-3.5 text-right font-semibold tabular ${
                    isCredit ? "text-success-strong" : "text-danger-strong"
                  }`}
                >
                  {isCredit ? "+" : "-"}
                  {formatNaira(tx.amount)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
