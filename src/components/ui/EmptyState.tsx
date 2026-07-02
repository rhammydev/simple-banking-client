import type { ReactNode } from "react";
import { AlertTriangle, Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl2 border border-dashed border-surface-border bg-white/60 py-16 text-center">
      <div className="rounded-full bg-surface-muted p-3 text-ink-faint">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-soft">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-danger-border bg-danger-bg px-4 py-4 text-danger-text">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
