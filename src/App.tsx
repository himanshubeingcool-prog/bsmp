import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute, UsernameRequiredRoute } from '@/components/auth/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { StorePage } from '@/pages/StorePage';
import { RanksPage } from '@/pages/RanksPage';
import { KeysPage } from '@/pages/KeysPage';
import { CratesPage } from '@/pages/CratesPage';
import { LeaderboardsPage } from '@/pages/LeaderboardsPage';
import { TeamsPage } from '@/pages/TeamsPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SupportPage } from '@/pages/SupportPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { SetupUsernamePage } from '@/pages/SetupUsernamePage';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminPage } from '@/pages/AdminPage';
import { RulesPage } from '@/pages/RulesPage';
import { AppealPage } from '@/pages/AppealPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';

export function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)
    return () => { lenis.destroy(); cancelAnimationFrame(id) }
  }, [])

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/ranks" element={<RanksPage />} />
        <Route path="/keys" element={<KeysPage />} />
        <Route path="/crates" element={<CratesPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/appeal" element={<AppealPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Auth required - username not needed */}
        <Route
          path="/setup-username"
          element={
            <ProtectedRoute>
              <SetupUsernamePage />
            </ProtectedRoute>
          }
        />

        {/* Auth required + username required */}
        <Route
          path="/dashboard"
          element={
            <UsernameRequiredRoute>
              <DashboardPage />
            </UsernameRequiredRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UsernameRequiredRoute>
              <ProfilePage />
            </UsernameRequiredRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin - no layout wrapper */}
      <Route
        path="/admin"
        element={
          <UsernameRequiredRoute>
            <AdminPage />
          </UsernameRequiredRoute>
        }
      />
    </Routes>
  );
}
