import { Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import { ScrollToTop } from './components/common/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { SidebarProvider } from './context/SidebarContext'
import { LoginPage } from './pages/LoginPage'
import { SubscriptionPage } from './pages/SubscriptionPage'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AppLayout } from './layouts/AppLayout'
import { BackendError } from './pages/BackendError'
import { checkBackendHealth } from './utils/backendHealth'
import PricingPage from './pages/PricingPage'
import AdminDashboard from './pages/AdminDashboard'
import { useContentProtection } from './hooks/useContentProtection'

// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsOfService from './pages/legal/TermsOfService'
import LegalNotice from './pages/legal/LegalNotice'

// Other Pages
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import NotFoundPage from './pages/NotFoundPage'

// Module Routes - S3/S4 (lazy-loaded for faster navigation startup)
const MacroRoutes = lazy(() => import('./modules/s3/macro/routes').then(m => ({ default: m.MacroRoutes })));
const MicroRoutes = lazy(() => import('./modules/s3/micro/routes').then(m => ({ default: m.MicroRoutes })));
const StatsRoutes = lazy(() => import('./modules/s3/stats/routes').then(m => ({ default: m.StatsRoutes })));
const SocioRoutes = lazy(() => import('./modules/s3/socio/routes').then(m => ({ default: m.SocioRoutes })));
const MacroS4Routes = lazy(() => import('./modules/s4/macro/routes').then(m => ({ default: m.MacroRoutes })));
const MicroS4Routes = lazy(() => import('./modules/s4/micro/routes').then(m => ({ default: m.MicroRoutes })));
const StatsS4Routes = lazy(() => import('./modules/s4/stats/routes').then(m => ({ default: m.StatsRoutes })));
const ManagementRoutes = lazy(() => import('./modules/s4/management/routes').then(m => ({ default: m.ManagementRoutes })));

function App() {
  useContentProtection();
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const healthy = await checkBackendHealth();
      if (active) setBackendHealthy(healthy);
    };

    void check();
    const timer = window.setInterval(check, 5000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (backendHealthy === null) {
    return (
      <div className="min-h-screen flex items-center justify-center relative" style={{ background: "var(--color-canvas)" }}>
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] -translate-y-1/3"
            style={{
              background: "radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative" style={{ zIndex: 1 }}>
          <div
            className="animate-spin rounded-full h-12 w-12"
            style={{
              border: '3px solid var(--color-border-default)',
              borderTopColor: 'var(--color-accent)',
            }}
          />
        </div>
      </div>
    );
  }

  if (!backendHealthy) {
    return <BackendError />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-canvas)" }}>
            <div
              className="animate-spin rounded-full h-10 w-10"
              style={{
                border: '3px solid var(--color-border-default)',
                borderTopColor: 'var(--color-accent)',
              }}
            />
          </div>
        }
      >
        <Routes>
        {/* Public Routes - Standalone, no layout */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Admin Route - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Legal & Information Pages */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/legal" element={<LegalNotice />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Protected Routes with AppLayout */}
        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/subscription" element={<SubscriptionPage />} />

          {/* Module Routes - S3 */}
          <Route path="/s3/macro/*" element={<MacroRoutes />} />
          <Route path="/s3/micro/*" element={<MicroRoutes />} />
          <Route path="/s3/stats/*" element={<StatsRoutes />} />
          <Route path="/s3/socio/*" element={<SocioRoutes />} />

          {/* Legacy routes (redirect to S3) */}
          <Route path="/macro/*" element={<MacroRoutes />} />
          <Route path="/micro/*" element={<MicroRoutes />} />
          <Route path="/stats/*" element={<StatsRoutes />} />
          <Route path="/socio/*" element={<SocioRoutes />} />

          {/* Module Routes - S4 */}
          <Route path="/s4/macro/*" element={<MacroS4Routes />} />
          <Route path="/s4/micro/*" element={<MicroS4Routes />} />
          <Route path="/s4/stats/*" element={<StatsS4Routes />} />
          <Route path="/s4/management/*" element={<ManagementRoutes />} />
        </Route>

        {/* 404 Catch-all - Outside AppLayout (no sidebar) */}
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <AuthProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </AuthProvider>
  </ThemeProvider>,
)
