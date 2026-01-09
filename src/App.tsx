
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { initializeStorage } from "@/utils/storageUtils";
import { toast } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const App = () => {
  // Initialize storage when app loads
  useEffect(() => {
    const initStorage = async () => {
      const success = await initializeStorage();
      if (success) {
        console.log("Storage initialized successfully");
      } else {
        console.warn("Storage initialization failed, some media features may be limited");
        toast.warning("Media storage initialization failed. Some features may be limited.");
      }
    };
    
    initStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/project/:id" element={<ProjectDetailPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
