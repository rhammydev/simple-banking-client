import { Filter, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { StatementDateRange } from "@/api/accounts-api";

interface StatementFiltersProps {
  range: StatementDateRange;
  onChange: (range: StatementDateRange) => void;
}

export function StatementFilters({ range, onChange }: StatementFiltersProps) {
  const hasFilter = Boolean(range.fromDate || range.toDate);

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-xl2 border border-surface-border bg-white px-5 py-4">
      <div className="flex items-center gap-2 text-ink-soft">
        <Filter className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">Date Range</span>
      </div>

      <Input
        label="From"
        type="date"
        value={range.fromDate ?? ""}
        max={range.toDate || undefined}
        onChange={(e) => onChange({ ...range, fromDate: e.target.value })}
        className="!py-2"
      />
      <Input
        label="To"
        type="date"
        value={range.toDate ?? ""}
        min={range.fromDate || undefined}
        onChange={(e) => onChange({ ...range, toDate: e.target.value })}
        className="!py-2"
      />

      {hasFilter && (
        <Button variant="ghost" size="sm" onClick={() => onChange({})}>
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}

      <p className="ml-auto text-xs text-ink-faint">
        Leave both dates empty to view the full transaction history.
      </p>
    </div>
  );
}
