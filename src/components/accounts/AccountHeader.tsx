import { Badge } from "@/components/ui/Badge";
import { formatNaira, formatDate } from "@/utils/format";
import type { Account } from "@/types/banking";

export function AccountHeader({ account }: { account: Account }) {
  return (
    <div className="relative overflow-hidden rounded-xl2 border border-gold/20 bg-navy-gradient px-8 py-9 text-white shadow-panel">
      <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-gold/5 blur-2xl" />

      <div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[3px] text-gold">Account Number</p>
          <p className="mt-1 font-mono text-3xl font-bold tracking-[3px]">{account.accountNumber}</p>
          <p className="mt-3 text-sm text-white/70">
            {account.customerName} · {account.email}
          </p>
          <Badge tone="success" dot className="mt-4 border-gold/30 bg-gold/10 text-gold">
            Opened {formatDate(account.createdAt)}
          </Badge>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[3px] text-white/50">Available Balance</p>
          <p className="mt-1 font-display text-4xl font-bold tabular">{formatNaira(account.balance)}</p>
        </div>
      </div>
    </div>
  );
}
