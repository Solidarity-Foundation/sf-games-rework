import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import PoshLanding from "./pages/posh/PoshLanding";
import PoshGame from "./pages/posh/PoshGame";
import PoshGame2 from "./pages/posh/PoshGame2";
import Analytics from "./pages/analytics/Analytics";
import InclusionDiversity from "./pages/inclusiondiversity/InclusionDiversity";
import FinancialLiteracy from "./pages/financiallit/FinancialLiteracy";
import WorkplaceEtiquette from "./pages/workplaceetiquette/WorkplaceEtiquette";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posh" element={<PoshLanding />} />
          <Route path="/posh/page-1" element={<PoshGame />} />
          <Route path="/posh/page-2" element={<PoshGame2 />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/inclusion-diversity" element={<InclusionDiversity />} />
          <Route path="/financial-literacy" element={<FinancialLiteracy />} />
          <Route path="/workplace-etiquette" element={<WorkplaceEtiquette />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
