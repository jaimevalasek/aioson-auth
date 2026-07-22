import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function AdvancedPage() {
  return (
    <AuthLayout title="Avançado" subtitle="Configurações técnicas e telas legadas ficam reunidas aqui.">
      <div className="auth-access-grid">
        <Link className="auth-access-card" to="/auth/settings"><span className="auth-access-card__meta">Serviço</span><span className="auth-access-card__title">Configurações</span><span className="auth-access-card__body">2FA, SMTP e opções globais.</span><span className="auth-access-card__action">Abrir</span></Link>
        <Link className="auth-access-card" to="/auth/apps"><span className="auth-access-card__meta">Diagnóstico</span><span className="auth-access-card__title">Sincronização dos apps</span><span className="auth-access-card__body">Veja o estado do manifesto diretamente em cada app.</span><span className="auth-access-card__action">Abrir</span></Link>
        <Link className="auth-access-card" to="/auth/people"><span className="auth-access-card__meta">Contas</span><span className="auth-access-card__title">Pessoas e credenciais</span><span className="auth-access-card__body">Consulte vínculos, credenciais pendentes e contas desativadas.</span><span className="auth-access-card__action">Abrir</span></Link>
      </div>
    </AuthLayout>
  );
}
