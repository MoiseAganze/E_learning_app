import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import {
  EcoleDashboard,
  EnseignantDashboard,
  EleveDashboard,
  ParentDashboard,
} from "./pages/dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/connexion" element={<Login />} />

          {/* Routes Dashboard */}
          <Route path="/dashboard/ecole" element={<EcoleDashboard />} />
          <Route
            path="/dashboard/enseignant"
            element={<EnseignantDashboard />}
          />
          <Route path="/dashboard/eleve" element={<EleveDashboard />} />
          <Route path="/dashboard/parent" element={<ParentDashboard />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
