import { type InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint",
            "transition-colors focus:border-gold",
            error ? "border-danger-strong" : "border-surface-border",
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error ? (
          <span className="text-xs text-danger-strong">{error}</span>
        ) : hint ? (
          <span className="text-xs text-ink-faint">{hint}</span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";
