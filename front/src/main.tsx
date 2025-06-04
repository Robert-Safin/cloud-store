import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-800 text-gray-300">
        <div className="mx-auto max-w-4xl pt-20">
          <App />
        </div>
      </div>
    </QueryClientProvider>
  </StrictMode>,
);
