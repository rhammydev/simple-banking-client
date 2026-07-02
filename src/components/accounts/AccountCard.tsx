import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatNaira, formatDate, initialsOf } from "@/utils/format";
import type { Account } from "@/types/banking";

export function AccountCard({ account }: { account: Account }) {
  return (
    <Link to="/accounts/$accountNumber" params={{ accountNumber: account.accountNumber }}>
      <Card className="group flex items-center gap-4 px-5 py-4 transition-shadow hover:shadow-panel">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-gradient text-sm font-semibold text-gold">
          {initialsOf(account.customerName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-navy">{account.customerName}</p>
          <p className="font-mono text-xs tracking-wide text-ink-faint">
            {account.accountNumber} · opened {formatDate(account.createdAt)}
          </p>
        </div>

        <div className="text-right">
          <p className="font-display text-lg font-semibold text-navy tabular">
            {formatNaira(account.balance)}
          </p>
          <p className="text-xs text-ink-faint">{account.email}</p>
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5" />
      </Card>
    </Link>
  );
}
