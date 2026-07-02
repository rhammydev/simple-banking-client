import { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useAccount } from "@/hooks/useAccount";
import { useDeleteAccount, useReactivateAccount } from "@/hooks/useAccountMutations";
import { AccountHeader } from "@/components/accounts/AccountHeader";
import { AccountInfoPanel } from "@/components/accounts/AccountInfoPanel";
import { AccountActions, type AccountAction } from "@/components/accounts/AccountActions";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { LoadingPanel } from "@/components/ui/Spinner";
import { ErrorState } from "@/components/ui/EmptyState";
import { DepositForm } from "@/components/forms/DepositForm";
import { WithdrawForm } from "@/components/forms/WithdrawForm";
import { TransferForm } from "@/components/forms/TransferForm";
import { UpdateAccountForm } from "@/components/forms/UpdateAccountForm";
import type { ApiError } from "@/lib/api-client";

const modalTitles: Record<AccountAction, string> = {
  deposit: "Deposit Funds",
  withdraw: "Withdraw Funds",
  transfer: "Transfer Funds",
  edit: "Edit Account Details",
  close: "Close Account",
  reactivate: "Reactivate Account",
};

export function AccountDetailPage() {
  const { accountNumber } = useParams({ from: "/accounts/$accountNumber" });
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<AccountAction | null>(null);

  const { data: account, isLoading, isError, error } = useAccount(accountNumber);
  const deleteAccount = useDeleteAccount();
  const reactivateAccount = useReactivateAccount();

  const closeModal = () => setActiveModal(null);

  if (isLoading) return <LoadingPanel label="Loading account…" />;
  if (isError || !account) {
    return <ErrorState message={(error as ApiError | null)?.message ?? "Account not found."} />;
  }

  return (
    <div className="flex flex-col gap-8">
      <AccountHeader account={account} />
      <AccountActions onAction={setActiveModal} />
      <AccountInfoPanel account={account} />

      <Modal title={modalTitles.deposit} isOpen={activeModal === "deposit"} onClose={closeModal}>
        <DepositForm accountNumber={accountNumber} onDone={closeModal} />
      </Modal>

      <Modal title={modalTitles.withdraw} isOpen={activeModal === "withdraw"} onClose={closeModal}>
        <WithdrawForm accountNumber={accountNumber} onDone={closeModal} />
      </Modal>

      <Modal title={modalTitles.transfer} isOpen={activeModal === "transfer"} onClose={closeModal}>
        <TransferForm defaultSenderAccountNumber={accountNumber} onDone={closeModal} />
      </Modal>

      <Modal title={modalTitles.edit} isOpen={activeModal === "edit"} onClose={closeModal}>
        <UpdateAccountForm account={account} onDone={closeModal} />
      </Modal>

      <Modal title={modalTitles.reactivate} isOpen={activeModal === "reactivate"} onClose={closeModal}>
        <p className="text-sm text-ink-soft">
          Restore full access and transaction rights to account{" "}
          <span className="font-mono font-semibold text-navy">{accountNumber}</span>.
        </p>
        <Button
          className="mt-5 w-full"
          isLoading={reactivateAccount.isPending}
          onClick={() => reactivateAccount.mutate(accountNumber, { onSuccess: closeModal })}
        >
          Confirm Reactivation
        </Button>
      </Modal>

      <Modal title={modalTitles.close} isOpen={activeModal === "close"} onClose={closeModal}>
        <p className="text-sm text-ink-soft">
          This deactivates account{" "}
          <span className="font-mono font-semibold text-navy">{accountNumber}</span>. This action
          can be reversed later from the Reactivate action.
        </p>
        <Button
          variant="danger"
          className="mt-5 w-full"
          isLoading={deleteAccount.isPending}
          onClick={() =>
            deleteAccount.mutate(accountNumber, { onSuccess: () => navigate({ to: "/" }) })
          }
        >
          Confirm Closure
        </Button>
      </Modal>
    </div>
  );
}
