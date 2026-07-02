import { Search } from "lucide-react";

interface AccountSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function AccountSearch({ value, onChange }: AccountSearchProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, account number, or email"
        aria-label="Search accounts"
        className="w-full rounded-xl border border-surface-border bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-gold"
      />
    </div>
  );
}
