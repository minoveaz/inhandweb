import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { useAuth } from '../context/AuthContext';
import { STATIC_ROUTES } from '../config/routes';
import { Button, Card, TextField, Alert } from '../components/ui';

export const ForgotPassword: React.FC = () => {
  const { locale, t } = useLocale();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginPath = STATIC_ROUTES.login.paths[locale];

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

    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch {
      setError(
        locale === 'es'
          ? 'Hubo un error al procesar tu solicitud.'
          : 'Failed to process password reset request.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-ih-cream">
      <div className="ih-container max-w-xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-ih-cobalt">
            {locale === 'es' ? 'SEGURIDAD DE LA CUENTA' : 'ACCOUNT SECURITY'}
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-display font-light text-ih-cobalt">
            {t.auth.forgotPasswordTitle}
          </h1>
          <p className="mt-3 text-sm text-ih-muted max-w-md mx-auto leading-relaxed">
            {t.auth.forgotPasswordSubtitle}
          </p>
        </div>

        <Card className="p-6 sm:p-8 shadow-card border-ih-border bg-ih-raised">
          {submitted ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-ih-success-bg text-ih-success-fg flex items-center justify-center mx-auto text-xl font-bold border border-ih-success-fg/20">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-ih-cobalt">
                  {locale === 'es' ? 'Enlace de recuperación enviado' : 'Reset link sent'}
                </h3>
                <p className="text-sm text-ih-muted leading-relaxed max-w-sm mx-auto">
                  {t.auth.resetSuccess}
                </p>
              </div>
              <div className="pt-4">
                <Link to={loginPath}>
                  <Button variant="primary" className="!h-11 px-8 text-xs font-bold uppercase tracking-wider">
                    {t.auth.backToLogin}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert tone="error">
                  {error}
                </Alert>
              )}

              <TextField
                label={t.auth.emailLabel}
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                description={
                  locale === 'es'
                    ? 'Te enviaremos un correo con un enlace temporal de un solo uso.'
                    : 'We will send you an email with a secure one-time link.'
                }
              />

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full mt-4 !h-12 text-sm font-bold tracking-wide"
              >
                {t.auth.sendResetLink}
              </Button>

              <div className="pt-4 text-center">
                <Link
                  to={loginPath}
                  className="text-xs text-ih-muted hover:text-ih-cobalt font-medium underline"
                >
                  ← {t.auth.backToLogin}
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
