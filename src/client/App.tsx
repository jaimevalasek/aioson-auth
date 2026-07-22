import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import SsoLoginPage from './pages/SsoLoginPage';
import AppsPage from './pages/AppsPage';
import AppManagementPage from './pages/AppManagementPage';
import PeoplePage from './pages/PeoplePage';
import AdvancedPage from './pages/AdvancedPage';
import { hasOwnerContextCode, hasOwnerContextPath } from './lib/dashboard-owner-context';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = localStorage.getItem('adminToken');
  const hasOwnerHandoff = hasOwnerContextCode(location.search)
    || hasOwnerContextCode(location.hash)
    || hasOwnerContextPath(location.pathname)
    || Boolean(sessionStorage.getItem('aiosonOwnerBearer') && sessionStorage.getItem('aiosonPlayId'));
  if (!token && !hasOwnerHandoff) {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }
  return <>{children}</>;
}

function LegacyBindingRedirect() {
  const { bindingId } = useParams();
  const location = useLocation();
  return <Navigate to={`/auth/apps/${bindingId ?? ''}${location.search}`} replace />;
}

function LegacyRedirect({ to }: { to: string }) {
  const location = useLocation();
  return <Navigate to={`${to}${location.search}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sso/login" element={<SsoLoginPage />} />
      <Route path="/auth/handoff/:ownerContext/apps" element={<RequireAuth><AppsPage /></RequireAuth>} />
      <Route path="/auth/handoff/:ownerContext/apps/:bindingId" element={<RequireAuth><AppManagementPage /></RequireAuth>} />
      <Route path="/auth/apps" element={<RequireAuth><AppsPage /></RequireAuth>} />
      <Route path="/auth/apps/:bindingId" element={<RequireAuth><AppManagementPage /></RequireAuth>} />
      <Route path="/auth/people" element={<RequireAuth><PeoplePage /></RequireAuth>} />
      <Route path="/auth/advanced" element={<RequireAuth><AdvancedPage /></RequireAuth>} />
      <Route
        path="/auth/dashboard"
        element={<LegacyRedirect to="/auth/apps" />}
      />
      <Route
        path="/auth/settings"
        element={
          <RequireAuth>
            <SettingsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/auth/bindings/:bindingId/users"
        element={<LegacyBindingRedirect />}
      />
      <Route
        path="/auth/bindings/:bindingId/roles"
        element={<LegacyBindingRedirect />}
      />
      <Route
        path="/auth/bindings/:bindingId/permissions"
        element={<LegacyBindingRedirect />}
      />
      <Route
        path="/auth/users"
        element={<LegacyRedirect to="/auth/people" />}
      />
      <Route path="/auth/:bindingId" element={<AuthPage />} />
      <Route path="/" element={<Navigate to="/auth/apps" replace />} />
    </Routes>
  );
}
