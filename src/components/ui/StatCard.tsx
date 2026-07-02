import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4 px-6 py-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-gradient text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
        <p className="font-display text-xl font-semibold text-navy tabular">{value}</p>
      </div>
    </Card>
  );
}
