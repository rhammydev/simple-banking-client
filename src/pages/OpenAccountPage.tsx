import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { OpenAccountForm } from "@/components/forms/OpenAccountForm";
import { useBankName } from "@/hooks/useAccount";

export function OpenAccountPage() {
  const { data } = useBankName();
  const bankName = data?.bankName;

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[3px] text-gold">
          Onboarding
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-navy">
          Open a New Account
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Create a premium {bankName || "Prestige"} Banking account in seconds.
          An account number is generated automatically and a welcome email is
          sent to the customer.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-display text-base font-semibold text-navy">
            Customer Details
          </h2>
        </CardHeader>
        <CardBody>
          <OpenAccountForm />
        </CardBody>
      </Card>
    </div>
  );
}
