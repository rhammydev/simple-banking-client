import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatDate } from "@/utils/format";
import type { Account } from "@/types/banking";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-surface-border last:border-0">
      <th className="w-2/5 bg-surface-muted px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </th>
      <td className="px-5 py-3.5 text-sm font-medium text-ink">{value}</td>
    </tr>
  );
}

export function AccountInfoPanel({ account }: { account: Account }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-display text-base font-semibold text-navy">Account Details</h3>
      </CardHeader>
      <CardBody className="p-0">
        <table className="w-full overflow-hidden rounded-b-xl2">
          <tbody>
            <Row label="Account Holder" value={account.customerName} />
            <Row label="Email" value={account.email} />
            <Row label="Currency" value="Nigerian Naira (NGN)" />
            <Row label="Date Opened" value={formatDate(account.createdAt)} />
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
