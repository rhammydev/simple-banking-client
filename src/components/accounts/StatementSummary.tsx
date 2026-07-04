import { Card } from "@/components/ui/Card";
import { formatNaira } from "@/utils/format";
import type { Statement } from "@/types/banking";

function SummaryItem({ label, value, tone }: { label: string; value: string; tone?: "success" | "danger" }) {
  return (
    <Card className="px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p
        className={`mt-1 font-display text-xl font-semibold tabular ${
          tone === "success" ? "text-success-strong" : tone === "danger" ? "text-danger-strong" : "text-navy"
        }`}
      >
        {value}
      </p>
    </Card>
  );
}

export function StatementSummary({ statement }: { statement: Statement }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryItem label="Opening Balance" value={formatNaira(statement.openingBalance)} />
      <SummaryItem label="Total Credits" value={formatNaira(statement.totalCredits)} tone="success" />
      <SummaryItem label="Total Debits" value={formatNaira(statement.totalDebits)} tone="danger" />
      <SummaryItem label="Closing Balance" value={formatNaira(statement.closingBalance)} />
    </div>
  );
}
