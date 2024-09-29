import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AppLayout from "./components/layouts/AppLayout";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
    </QueryClientProvider>
  </React.StrictMode>
);
