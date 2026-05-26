import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import RbacUsersPage from './pages/RbacUsersPage';
import RbacRolesPage from './pages/RbacRolesPage';
import RbacPermissionsPage from './pages/RbacPermissionsPage';
import GlobalUsersPage from './pages/GlobalUsersPage';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = localStorage.getItem('adminToken');
  if (!token) {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/auth/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
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
        element={
          <RequireAuth>
            <RbacUsersPage />
          </RequireAuth>
        }
      />
      <Route
        path="/auth/bindings/:bindingId/roles"
        element={
          <RequireAuth>
            <RbacRolesPage />
          </RequireAuth>
        }
      />
      <Route
        path="/auth/bindings/:bindingId/permissions"
        element={
          <RequireAuth>
            <RbacPermissionsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/auth/users"
        element={
          <RequireAuth>
            <GlobalUsersPage />
          </RequireAuth>
        }
      />
      <Route path="/auth/:bindingId" element={<AuthPage />} />
      <Route path="/" element={<Navigate to="/auth/dashboard" replace />} />
    </Routes>
  );
}
