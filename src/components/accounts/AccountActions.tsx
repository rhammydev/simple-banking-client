import { ArrowDownCircle, ArrowUpCircle, Send, UserCog, PowerOff, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type AccountAction = "deposit" | "withdraw" | "transfer" | "edit" | "close" | "reactivate";

interface AccountActionsProps {
  onAction: (action: AccountAction) => void;
}

const actions: Array<{ key: AccountAction; label: string; icon: typeof ArrowDownCircle; variant: "primary" | "secondary" | "danger" }> = [
  { key: "deposit", label: "Deposit", icon: ArrowDownCircle, variant: "primary" },
  { key: "withdraw", label: "Withdraw", icon: ArrowUpCircle, variant: "secondary" },
  { key: "transfer", label: "Transfer", icon: Send, variant: "secondary" },
  { key: "edit", label: "Edit Details", icon: UserCog, variant: "secondary" },
  { key: "reactivate", label: "Reactivate", icon: RotateCcw, variant: "secondary" },
  { key: "close", label: "Close Account", icon: PowerOff, variant: "danger" },
];

export function AccountActions({ onAction }: AccountActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {actions.map(({ key, label, icon: Icon, variant }) => (
        <Button key={key} variant={variant} onClick={() => onAction(key)} className="flex-col gap-1.5 !py-4">
          <Icon className="h-5 w-5" />
          <span className="text-xs">{label}</span>
        </Button>
      ))}
    </div>
  );
}
