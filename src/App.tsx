import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { queryClient } from "@/lib/query-client";
import { router } from "@/routes/router";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0A1628",
            color: "#FFFFFF",
            border: "1px solid rgba(212, 168, 83, 0.3)",
            fontSize: "13px",
          },
          success: { iconTheme: { primary: "#D4A853", secondary: "#0A1628" } },
        }}
      />
    </QueryClientProvider>
  );
}
