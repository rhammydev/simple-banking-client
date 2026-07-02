import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
  notFoundComponent: () => (
    <div className="py-24 text-center">
      <p className="font-display text-2xl font-semibold text-navy">Page not found</p>
      <p className="mt-2 text-sm text-ink-soft">The page you're looking for doesn't exist.</p>
    </div>
  ),
});
