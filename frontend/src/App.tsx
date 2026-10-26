import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminProducts from './pages/AdminProducts';
import AdminLogin from './pages/AdminLogin';
import StoneTempleJaipur from './pages/StoneTempleJaipur';
import CncJaliJaipur from './pages/CncJaliJaipur';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Architects from './pages/Architects';
import Portfolio from './pages/Portfolio';
import HeritageHavelis from './pages/HeritageHavelis';
import CourtyardArtifacts from './pages/CourtyardArtifacts';

import { LanguageProvider } from "@/contexts/LanguageContext";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <SiteSettingsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            {/* RouterContent uses useLocation so it's inside BrowserRouter */}
            <RouterContent />
          </BrowserRouter>
        </TooltipProvider>
      </SiteSettingsProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

function RouterContent() {
  const location = useLocation();
  const hideFloating = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen w-full">
      {!hideFloating && <Navigation />}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stone-temple-jaipur" element={<StoneTempleJaipur />} />
          <Route path="/cnc-jali-jaipur" element={<CncJaliJaipur />} />
          <Route path="/sandstone-supplier-jaipur" element={<Navigate to="/shop" replace />} />
          <Route path="/materials" element={<Navigate to="/shop" replace />} />
          <Route path="/architects" element={<Architects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/heritage-havelis" element={<HeritageHavelis />} />
          <Route path="/courtyard-artifacts" element={<CourtyardArtifacts />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cart" element={<Navigate to="/contact" replace />} />
          <Route path="/admin" element={<Navigate to="/admin/products" replace />} />
          <Route path="/admin/dashboard" element={<Navigate to="/admin/products" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/products"
            element={
              sessionStorage.getItem('adminToken')
                ? <AdminProducts />
                : <Navigate to="/admin/login" replace />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideFloating && <Footer />}
      {!hideFloating && <BackToTop />}
      {!hideFloating && <WhatsAppButton />}
      {!hideFloating && <MobileStickyCTA />}
    </div>
  );
}

export default App;
