import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { useAuth } from '../context/AuthContext';
import { STATIC_ROUTES } from '../config/routes';
import { Button, Card, TextField, Checkbox, Alert } from '../components/ui';

export const Login: React.FC = () => {
  const { locale, t } = useLocale();
  const { isAuthenticated, login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Determine redirect target
  const from = (location.state as any)?.from?.pathname || STATIC_ROUTES.account.paths[locale];

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError(
        locale === 'es'
          ? 'Por favor introduce un correo electrónico válido.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    if (!password) {
      setError(
        locale === 'es'
          ? 'Por favor introduce tu contraseña.'
          : 'Please enter your password.'
      );
      return;
    }

    setLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) {
        navigate(from, { replace: true });
      } else {
        setError(
          locale === 'es'
            ? 'Correo o contraseña incorrectos. Por favor compruébalos.'
            : 'Invalid email or password. Please verify.'
        );
      }
    } catch {
      setError(
        locale === 'es'
          ? 'Error al iniciar sesión. Inténtalo de nuevo.'
          : 'Failed to sign in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    navigate(from, { replace: true });
  };

  const registerPath = STATIC_ROUTES.register.paths[locale];
  const forgotPath = STATIC_ROUTES.forgotPassword.paths[locale];
  const trackOrderPath = STATIC_ROUTES.trackOrder.paths[locale];

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-ih-cream">
      <div className="ih-container max-w-xl mx-auto">
        {/* Breadcrumb / Top label */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-ih-cobalt">
            {locale === 'es' ? 'ÁREA DE CLIENTE' : 'CUSTOMER PORTAL'}
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-display font-light text-ih-cobalt">
            {t.auth.loginTitle}
          </h1>
          <p className="mt-3 text-sm text-ih-muted max-w-md mx-auto leading-relaxed">
            {t.auth.loginSubtitle}
          </p>
        </div>

        {/* Demo Fast Access Pill */}
        <div className="mb-6 p-4 rounded-card bg-ih-cobalt/5 border border-ih-cobalt/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ih-coral"></span>
              <span className="text-xs font-bold text-ih-cobalt">
                {t.auth.demoButton}
              </span>
            </div>
            <p className="text-xs text-ih-muted">
              {locale === 'es'
                ? 'Explora pedidos, direcciones y favoritos como Marta Soler en 1 clic.'
                : 'Explore orders, addresses and wishlist as Marta Soler in 1 click.'}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={handleDemoLogin}
            className="shrink-0 whitespace-nowrap !h-9 text-xs"
          >
            {locale === 'es' ? 'Entrar como Demo →' : 'Log in as Demo →'}
          </Button>
        </div>

        {/* Form Card */}
        <Card className="p-6 sm:p-8 shadow-card border-ih-border bg-ih-raised">
          {error && (
            <div className="mb-6">
              <Alert tone="error">
                {error}
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              label={t.auth.emailLabel}
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-ih-cobalt tracking-wide">
                  {t.auth.passwordLabel}
                </label>
                <Link
                  to={forgotPath}
                  className="text-xs text-ih-coral hover:underline font-medium"
                >
                  {t.auth.forgotPasswordLink}
                </Link>
              </div>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full min-h-control-md rounded-control border border-ih-border bg-ih-surface px-3.5 text-sm text-ih-text focus:outline-none focus:ring-2 focus:ring-ih-cobalt/30 focus:border-ih-cobalt transition duration-fast"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <Checkbox
                label={t.auth.rememberMe}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full mt-2 !h-12 text-sm font-bold tracking-wide"
            >
              {loading
                ? locale === 'es'
                  ? 'Iniciando sesión...'
                  : 'Signing in...'
                : t.auth.signInButton}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-ih-border text-center">
            <p className="text-xs text-ih-muted">
              {t.auth.dontHaveAccount}{' '}
              <Link
                to={registerPath}
                className="font-bold text-ih-cobalt hover:text-ih-coral transition duration-fast underline decoration-ih-border hover:decoration-ih-coral"
              >
                {t.auth.registerButton}
              </Link>
            </p>
          </div>
        </Card>

        {/* Guest tracking link */}
        <div className="mt-8 text-center bg-ih-sand/40 rounded-card p-5 border border-ih-border">
          <p className="text-xs font-bold text-ih-cobalt uppercase tracking-wider mb-1">
            {t.auth.trackOrderHeading}
          </p>
          <p className="text-xs text-ih-muted mb-3">
            {t.auth.trackOrderDesc}
          </p>
          <Link
            to={trackOrderPath}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ih-cobalt hover:text-ih-coral transition duration-fast"
          >
            <span>{t.auth.trackOrderButton}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
