import { Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import OikoNewsPage from './pages/OikoNewsPage'
import OikoNewsEditionPage from './pages/OikoNewsEditionPage'
import OikoNewsComparePage from './pages/OikoNewsComparePage'
import { ScrollToTop } from './components/common/ScrollToTop'
import { RouteAnalyticsTracker } from './components/common/RouteAnalyticsTracker'
import { CookieConsentBanner } from './components/common/CookieConsentBanner'
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
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import CheckoutCanceledPage from './pages/CheckoutCanceledPage'
import ProgrammePage from './pages/ProgrammePage'
import AdminDashboard from './pages/AdminDashboard'
import { useContentProtection } from './hooks/useContentProtection'

import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsOfService from './pages/legal/TermsOfService'
import LegalNotice from './pages/legal/LegalNotice'

import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import NotFoundPage from './pages/NotFoundPage'
import CourseBlocksLabPage from './pages/CourseBlocksLabPage'

const MacroS4Routes = lazy(() => import('./modules/s4/macro/routes').then(m => ({ default: m.MacroRoutes })));
const MicroS4Routes = lazy(() => import('./modules/s4/micro/routes').then(m => ({ default: m.MicroRoutes })));
const StatsS4Routes = lazy(() => import('./modules/s4/stats/routes').then(m => ({ default: m.StatsRoutes })));
const ManagementRoutes = lazy(() => import('./modules/s4/management/routes').then(m => ({ default: m.ManagementRoutes })));

function App() {
  const isContentProtectionEnabled = import.meta.env.DEV ? import.meta.env.VITE_ENABLE_CONTENT_PROTECTION !== 'false' : true;
  useContentProtection();
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    document.body.classList.toggle('content-protection-disabled', !isContentProtectionEnabled);

    return () => {
      document.body.classList.remove('content-protection-disabled');
    };
  }, [isContentProtectionEnabled]);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const healthy = await checkBackendHealth();
      if (active) setBackendHealthy(healthy);
    };

    void check();
    return () => {
      active = false;
    };
  }, []);

  if (backendHealthy === null) {
    return (
      <div className="min-h-screen flex items-center justify-center relative" style={{ background: 'var(--color-canvas)' }}>
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] -translate-y-1/3"
            style={{
              background: 'radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, transparent 70%)',
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

  return (
    <>
      <ScrollToTop />
      <RouteAnalyticsTracker />
      <CookieConsentBanner />
      {backendHealthy ? (
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-canvas)' }}>
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
            <Route path="/" element={<Home />} />
            <Route path="/oiko-news" element={<OikoNewsPage />} />
            <Route path="/oiko-news/:slug/compare" element={<OikoNewsComparePage />} />
            <Route path="/oiko-news/:slug" element={<OikoNewsEditionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
            <Route path="/checkout/canceled" element={<CheckoutCanceledPage />} />
            <Route path="/programme" element={<ProgrammePage />} />

            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/legal" element={<LegalNotice />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />

            <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/course-blocks" element={<CourseBlocksLabPage />} />
              <Route path="/s4/macro/*" element={<MacroS4Routes />} />
              <Route path="/s4/micro/*" element={<MicroS4Routes />} />
              <Route path="/s4/stats/*" element={<StatsS4Routes />} />
              <Route path="/s4/management/*" element={<ManagementRoutes />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      ) : (
        <BackendError />
      )}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
)


