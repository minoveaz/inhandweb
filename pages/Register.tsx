import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { useAuth } from '../context/AuthContext';
import { STATIC_ROUTES } from '../config/routes';
import { Button, Card, TextField, Checkbox, Alert } from '../components/ui';

export const Register: React.FC = () => {
  const { locale, t } = useLocale();
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const accountPath = STATIC_ROUTES.account.paths[locale];
  const loginPath = STATIC_ROUTES.login.paths[locale];
  const legalPath = STATIC_ROUTES.legal.paths[locale];

  useEffect(() => {
    if (isAuthenticated) {
      navigate(accountPath, { replace: true });
    }
  }, [isAuthenticated, navigate, accountPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError(
        locale === 'es'
          ? 'Por favor introduce tu nombre y apellidos.'
          : 'Please enter your first and last name.'
      );
      return;
    }

    if (!email || !email.includes('@')) {
      setError(
        locale === 'es'
          ? 'Por favor introduce un correo electrónico válido.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    if (password.length < 8) {
      setError(
        locale === 'es'
          ? 'La contraseña debe tener un mínimo de 8 caracteres.'
          : 'Password must be at least 8 characters long.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        locale === 'es'
          ? 'Las contraseñas no coinciden. Por favor verifícalas.'
          : 'Passwords do not match. Please verify.'
      );
      return;
    }

    if (!acceptTerms) {
      setError(
        locale === 'es'
          ? 'Debes aceptar la política de privacidad y términos para continuar.'
          : 'You must accept the privacy policy and terms to proceed.'
      );
      return;
    }

    setLoading(true);
    try {
      const ok = await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password,
        newsletterSubscribed: subscribeNewsletter,
      });

      if (ok) {
        navigate(accountPath, { replace: true });
      } else {
        setError(
          locale === 'es'
            ? 'Ya existe una cuenta con este correo electrónico.'
            : 'An account with this email address already exists.'
        );
      }
    } catch {
      setError(
        locale === 'es'
          ? 'Error al procesar el registro. Inténtalo de nuevo.'
          : 'Registration failed. Please try again.'
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
            {locale === 'es' ? 'COMUNIDAD INHAND' : 'INHAND COMMUNITY'}
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-display font-light text-ih-cobalt">
            {t.auth.registerTitle}
          </h1>
          <p className="mt-3 text-sm text-ih-muted max-w-md mx-auto leading-relaxed">
            {t.auth.registerSubtitle}
          </p>
        </div>

        <Card className="p-6 sm:p-8 shadow-card border-ih-border bg-ih-raised">
          {error && (
            <div className="mb-6">
              <Alert tone="error">
                {error}
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label={t.auth.firstNameLabel}
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Marta"
              />
              <TextField
                label={t.auth.lastNameLabel}
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Soler"
              />
            </div>

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
              <label className="text-xs font-semibold text-ih-cobalt tracking-wide">
                {t.auth.passwordLabel}
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full min-h-control-md rounded-control border border-ih-border bg-ih-surface px-3.5 text-sm text-ih-text focus:outline-none focus:ring-2 focus:ring-ih-cobalt/30 focus:border-ih-cobalt transition duration-fast"
              />
              <p className="text-[11px] text-ih-muted">
                {locale === 'es'
                  ? 'Mínimo 8 caracteres, combina mayúsculas y números para mayor seguridad.'
                  : 'At least 8 characters, combine uppercase and numbers for security.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ih-cobalt tracking-wide">
                {t.auth.confirmPasswordLabel}
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className="w-full min-h-control-md rounded-control border border-ih-border bg-ih-surface px-3.5 text-sm text-ih-text focus:outline-none focus:ring-2 focus:ring-ih-cobalt/30 focus:border-ih-cobalt transition duration-fast"
              />
            </div>

            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  label=""
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="text-xs text-ih-muted leading-relaxed">
                  {locale === 'es' ? (
                    <>
                      He leído y acepto el{' '}
                      <Link to={legalPath} target="_blank" className="text-ih-cobalt underline font-medium">
                        Aviso Legal
                      </Link>{' '}
                      y la{' '}
                      <Link to={legalPath} target="_blank" className="text-ih-cobalt underline font-medium">
                        Política de Privacidad
                      </Link>
                      .
                    </>
                  ) : (
                    <>
                      I have read and agree to the{' '}
                      <Link to={legalPath} target="_blank" className="text-ih-cobalt underline font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to={legalPath} target="_blank" className="text-ih-cobalt underline font-medium">
                        Privacy Policy
                      </Link>
                      .
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Checkbox
                  label=""
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                />
                <span className="text-xs text-ih-muted leading-relaxed">
                  {t.auth.newsletterCheckbox}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full mt-4 !h-12 text-sm font-bold tracking-wide"
            >
              {loading
                ? locale === 'es'
                  ? 'Creando cuenta...'
                  : 'Creating account...'
                : t.auth.registerButton}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-ih-border text-center">
            <p className="text-xs text-ih-muted">
              {t.auth.alreadyHaveAccount}{' '}
              <Link
                to={loginPath}
                className="font-bold text-ih-cobalt hover:text-ih-coral transition duration-fast underline decoration-ih-border hover:decoration-ih-coral"
              >
                {t.auth.signInButton}
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
