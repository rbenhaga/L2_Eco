import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import { ScrollToTop } from './components/common/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { SubscriptionPage } from './pages/SubscriptionPage'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AppLayout } from './layouts/AppLayout'
import { BackendError } from './pages/BackendError'
import { checkBackendHealth } from './utils/backendHealth'
import PricingPage from './pages/PricingPage'
import AdminDashboard from './pages/AdminDashboard'

// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsOfService from './pages/legal/TermsOfService'
import LegalNotice from './pages/legal/LegalNotice'

// Other Pages
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import NotFoundPage from './pages/NotFoundPage'

// Module Routes - S3
import { MacroRoutes } from './modules/s3/macro/routes'
import { MicroRoutes } from './modules/s3/micro/routes'
import { StatsRoutes } from './modules/s3/stats/routes'
import { SocioRoutes } from './modules/s3/socio/routes'

// Module Routes - S4
import { MacroRoutes as MacroS4Routes } from './modules/s4/macro/routes'
import { MicroRoutes as MicroS4Routes } from './modules/s4/micro/routes'
import { StatsRoutes as StatsS4Routes } from './modules/s4/stats/routes'
import { ManagementRoutes } from './modules/s4/management/routes'

function App() {
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    // Check backend health on mount
    checkBackendHealth().then(setBackendHealthy);
  }, []);

  // Show loading while checking
  if (backendHealthy === null) {
    return (
      <div className="min-h-screen flex items-center justify-center relative" style={{ background: "#FAFBFE" }}>
        {/* Background gradient matching Home.tsx */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] -translate-y-1/3"
            style={{
              background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
            }}
          />
        </div>
        {/* Spinner with accent color */}
        <div className="relative" style={{ zIndex: 1 }}>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" style={{ borderColor: "rgb(var(--accent))", borderTopColor: "transparent" }} />
        </div>
      </div>
    );
  }

  // Show error if backend is down
  if (!backendHealthy) {
    return <BackendError />;
  }

  // Backend is healthy, render app
  return (
    <BrowserRouter>
      <ScrollToTop />
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
        <Route path="/*" element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
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
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* 404 Catch-all - Outside AppLayout (no sidebar) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
