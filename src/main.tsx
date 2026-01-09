import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Home } from './App'
import { ScrollToTop } from './components'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { SubscriptionPage } from './pages/SubscriptionPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppLayout } from './layouts/AppLayout'

// Module Routes
import { MacroRoutes } from './modules/s2/macro/routes'
import { MicroRoutes } from './modules/s2/micro/routes'
import { StatsRoutes } from './modules/s2/stats/routes'
import { SocioRoutes } from './modules/s2/socio/routes'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes - No layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes with AppLayout */}
        <Route path="/*" element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/subscription" element={<SubscriptionPage />} />

                {/* Module Routes */}
                <Route path="/macro/*" element={<MacroRoutes />} />
                <Route path="/micro/*" element={<MicroRoutes />} />
                <Route path="/stats/*" element={<StatsRoutes />} />
                <Route path="/socio/*" element={<SocioRoutes />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        } />
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
