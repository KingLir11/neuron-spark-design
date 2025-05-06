
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:projectId" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
