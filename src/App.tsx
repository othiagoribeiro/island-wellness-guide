import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/useI18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import ProfessionalsPage from "./pages/ProfessionalsPage";
import ProfessionalProfilePage from "./pages/ProfessionalProfilePage";
import TherapiesPage from "./pages/TherapiesPage";
import TherapyDetailPage from "./pages/TherapyDetailPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import OrientPage from "./pages/OrientPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ProRegisterPage from "./pages/ProRegisterPage";
import ProLandingPage from "./pages/ProLandingPage";
import ProLoginPage from "./pages/ProLoginPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/professionals" element={<ProfessionalsPage />} />
        <Route path="/professionals/:id" element={<ProfessionalProfilePage />} />
        <Route path="/therapies" element={<TherapiesPage />} />
        <Route path="/therapies/:id" element={<TherapyDetailPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/orient" element={<OrientPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/pro/register" element={<ProRegisterPage />} />
        <Route path="/para-profesionales" element={<ProLandingPage />} />
        <Route path="/pro/login" element={<ProLoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
