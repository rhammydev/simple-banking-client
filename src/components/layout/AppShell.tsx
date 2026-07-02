import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
