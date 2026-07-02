import type { HTMLAttributes } from "react";
import clsx from "clsx";

type Tone = "success" | "danger" | "warning" | "info" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

const toneClasses: Record<Tone, string> = {
  success: "bg-success-bg text-success-text border-success-border",
  danger: "bg-danger-bg text-danger-text border-danger-border",
  warning: "bg-warning-bg text-warning-text border-warning-border",
  info: "bg-info-bg text-info-text border-info-border",
  neutral: "bg-surface-muted text-ink-soft border-surface-border",
};

export function Badge({ tone = "neutral", dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
