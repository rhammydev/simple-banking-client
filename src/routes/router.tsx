import { createRoute, createRouter } from "@tanstack/react-router";
import { rootRoute } from "@/routes/root-route";
import { DashboardPage } from "@/pages/DashboardPage";
import { OpenAccountPage } from "@/pages/OpenAccountPage";
import { TransferPage } from "@/pages/TransferPage";
import { AccountDetailPage } from "@/pages/AccountDetailPage";
import { StatementPage } from "@/pages/StatementPage";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const openAccountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/open-account",
  component: OpenAccountPage,
});

const transferRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/transfer",
  component: TransferPage,
});

const accountDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/accounts/$accountNumber",
  component: AccountDetailPage,
});

const statementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/accounts/$accountNumber/statement",
  component: StatementPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  openAccountRoute,
  transferRoute,
  accountDetailRoute,
  statementRoute,
]);

export const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
