import { useNavigate } from "@tanstack/react-router";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { TransferForm } from "@/components/forms/TransferForm";

export function TransferPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[3px] text-gold">Move Money</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-navy">Transfer Funds</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Send money between any two Prestige Banking accounts instantly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-display text-base font-semibold text-navy">Transfer Details</h2>
        </CardHeader>
        <CardBody>
          <TransferForm onDone={() => navigate({ to: "/" })} />
        </CardBody>
      </Card>
    </div>
  );
}
