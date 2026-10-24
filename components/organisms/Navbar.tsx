import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { STATIC_ROUTES } from '../../config/routes';
import { IconButton, Button, Avatar } from '../ui';

export const Navbar: React.FC = () => {
  const { locale, t, switchLocalePath } = useLocale();
  const { totalQuantity, openCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Handle outside click for user dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (userDropdownOpen) setUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, userDropdownOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: STATIC_ROUTES.shop.paths[locale], label: t.nav.shop },
    { to: STATIC_ROUTES.story.paths[locale], label: t.nav.ourStory },
    { to: STATIC_ROUTES.communities.paths[locale], label: t.nav.forCommunities },
    { to: STATIC_ROUTES.contact.paths[locale], label: t.nav.contact },
  ];

  const esPath = switchLocalePath('es');
  const enPath = switchLocalePath('en');
  const loginPath = STATIC_ROUTES.login.paths[locale];
  const accountPath = STATIC_ROUTES.account.paths[locale];

  return (
    <>
      {/* Top announcement bar (Brand Primary #092B8B + Text onAction #FBF6EE) */}
      <div className="bg-ih-cobalt text-ih-on-action text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase py-2.5 px-4 text-center">
        <span>{t.nav.freeShippingBanner}</span>
      </div>

      {/* Main sticky editorial header (Surface Canvas #FBF6EE + Border Subtle #DDDCD3) */}
      <header className="sticky top-0 z-40 bg-ih-cream/95 backdrop-blur-md border-b border-ih-border transition-colors duration-fast">
        <div className="ih-container h-20 flex items-center justify-between gap-4">
          {/* Mobile hamburger IconButton (44x44px touch target per Slide 09) */}
          <div className="lg:hidden">
            <IconButton
              label={t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              variant="default"
            >
              <img
                src="/icons/01_core/menu.svg"
                alt=""
                className="w-5 h-5"
              />
            </IconButton>
          </div>

          {/* Brand Logo */}
          <Link
            to={STATIC_ROUTES.home.paths[locale]}
            className="flex items-center gap-2.5 rounded-control py-1 group"
            aria-label="INHAND Home"
          >
            <img
              src="/logos/01_logotipo/inhand-logo-tight.svg"
              alt="INHAND"
              className="h-7 sm:h-8 w-auto transition-transform duration-fast group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-fast relative py-1.5 rounded-control px-1 ${
                    isActive
                      ? 'text-ih-cobalt font-bold after:content-[""] after:absolute after:left-1 after:right-1 after:bottom-0 after:h-[2px] after:bg-ih-coral'
                      : 'text-ih-text hover:text-ih-cobalt'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right utilities: Language Switcher + Account User + Cart Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <div
              className="inline-flex items-center h-10 rounded-control border border-ih-border bg-ih-raised p-1 text-xs font-semibold tracking-wider"
              role="group"
              aria-label="Language selector"
            >
              <Link
                to={esPath}
                className={`h-full inline-flex items-center px-2.5 rounded-control transition duration-fast ${
                  locale === 'es'
                    ? 'bg-ih-cobalt text-ih-on-action font-bold'
                    : 'text-ih-muted hover:text-ih-cobalt'
                }`}
              >
                ES
              </Link>
              <Link
                to={enPath}
                className={`h-full inline-flex items-center px-2.5 rounded-control transition duration-fast ${
                  locale === 'en'
                    ? 'bg-ih-cobalt text-ih-on-action font-bold'
                    : 'text-ih-muted hover:text-ih-cobalt'
                }`}
              >
                EN
              </Link>
            </div>

            {/* Account Menu Trigger */}
            <div className="relative" ref={userDropdownRef}>
              {isAuthenticated && user ? (
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-label={t.nav.account}
                  className="h-10 px-2.5 rounded-control border border-ih-border bg-ih-raised hover:bg-ih-sand/50 flex items-center gap-2 transition duration-fast"
                >
                  <span className="w-6 h-6 rounded-full bg-ih-cobalt text-ih-on-action text-xs font-bold inline-flex items-center justify-center">
                    {user.firstName[0]}
                  </span>
                  <span className="hidden md:inline text-xs font-bold text-ih-cobalt max-w-[90px] truncate">
                    {user.firstName}
                  </span>
                  <span className="text-[10px] text-ih-muted">▾</span>
                </button>
              ) : (
                <Link
                  to={loginPath}
                  aria-label={t.nav.signIn}
                  className="h-10 px-3 rounded-control border border-ih-border bg-ih-raised hover:bg-ih-sand/50 flex items-center gap-1.5 text-xs font-bold text-ih-cobalt transition duration-fast"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-ih-cobalt"
                  >
                    <circle cx="12" cy="7" r="4" />
                    <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
                  </svg>
                  <span className="hidden sm:inline">{t.nav.signIn}</span>
                </Link>
              )}

              {/* User Dropdown Menu */}
              {isAuthenticated && user && userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-dialog bg-ih-raised border border-ih-border shadow-floating p-2 z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-ih-border mb-1">
                    <p className="text-xs font-bold text-ih-cobalt truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-[11px] text-ih-muted truncate">{user.email}</p>
                  </div>
                  <Link
                    to={accountPath}
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-control text-xs font-medium text-ih-text hover:bg-ih-sand/50 hover:text-ih-cobalt"
                  >
                    <span>👤</span>
                    <span>{t.nav.account}</span>
                  </Link>
                  <Link
                    to={`${accountPath}?tab=orders`}
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-control text-xs font-medium text-ih-text hover:bg-ih-sand/50 hover:text-ih-cobalt"
                  >
                    <span>📦</span>
                    <span>{t.account.tabs.orders}</span>
                  </Link>
                  <Link
                    to={`${accountPath}?tab=wishlist`}
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-control text-xs font-medium text-ih-text hover:bg-ih-sand/50 hover:text-ih-cobalt"
                  >
                    <span>♥</span>
                    <span>{t.account.tabs.wishlist}</span>
                  </Link>
                  <div className="pt-1 mt-1 border-t border-ih-border">
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-control text-xs font-medium text-ih-coral hover:bg-ih-coral/10"
                    >
                      <span>🚪</span>
                      <span>{t.nav.signOut}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <Button
              variant="secondary"
              onClick={openCart}
              aria-label={`${t.nav.cart} (${totalQuantity})`}
              className="!h-10 !min-h-[40px] !px-3 sm:!px-4 flex items-center gap-2 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0"
            >
              <img
                src="/icons/01_core/cart.svg"
                alt=""
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0"
              />
              <span className="hidden xs:inline leading-none">{t.nav.cart}</span>
              <span
                className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-pill text-[11px] font-bold shrink-0 transition duration-fast leading-none ${
                  totalQuantity > 0
                    ? 'bg-ih-coral text-ih-on-action'
                    : 'bg-ih-sand text-ih-cobalt'
                }`}
              >
                {totalQuantity}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-ih-text/45 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-ih-cream h-full shadow-floating flex flex-col justify-between p-6 z-10 overflow-y-auto border-r border-ih-border">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-ih-border">
                <img
                  src="/logos/01_logotipo/inhand-logo-tight.svg"
                  alt="INHAND"
                  className="h-7 w-auto"
                />
                <IconButton
                  onClick={() => setMobileMenuOpen(false)}
                  label={t.nav.closeMenu}
                  variant="default"
                >
                  <img
                    src="/icons/01_core/close.svg"
                    alt=""
                    className="w-5 h-5"
                  />
                </IconButton>
              </div>

              {/* User Bar in Mobile */}
              <div className="mt-6 p-3 rounded-card bg-ih-raised border border-ih-border flex items-center justify-between">
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-ih-cobalt text-ih-on-action text-xs font-bold inline-flex items-center justify-center">
                      {user.firstName[0]}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-ih-cobalt">{user.firstName} {user.lastName}</p>
                      <Link
                        to={accountPath}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[11px] text-ih-coral font-medium hover:underline"
                      >
                        {t.nav.account} →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={loginPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between text-xs font-bold text-ih-cobalt"
                  >
                    <span>👤 {t.nav.signIn} / {locale === 'es' ? 'Crear cuenta' : 'Register'}</span>
                    <span>→</span>
                  </Link>
                )}
              </div>

              <nav className="mt-6 flex flex-col gap-3">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-display py-2 px-2 rounded-control flex items-center justify-between ${
                        isActive ? 'text-ih-cobalt font-bold bg-ih-sand/60' : 'text-ih-text'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <span className="text-ih-coral font-bold">→</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-ih-border space-y-4">
              <p className="text-xs uppercase tracking-[0.16em] text-ih-cobalt font-bold">
                MADE TO MEAN MORE.
              </p>
              <p className="text-xs text-ih-muted leading-relaxed">
                {t.footer.tagline}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Link
                  to={esPath}
                  className={`flex-1 text-center min-h-control-sm inline-flex items-center justify-center rounded-control text-xs font-bold border ${
                    locale === 'es'
                      ? 'bg-ih-cobalt text-ih-on-action border-ih-cobalt'
                      : 'border-ih-border bg-ih-raised text-ih-cobalt'
                  }`}
                >
                  Español (ES)
                </Link>
                <Link
                  to={enPath}
                  className={`flex-1 text-center min-h-control-sm inline-flex items-center justify-center rounded-control text-xs font-bold border ${
                    locale === 'en'
                      ? 'bg-ih-cobalt text-ih-on-action border-ih-cobalt'
                      : 'border-ih-border bg-ih-raised text-ih-cobalt'
                  }`}
                >
                  English (EN)
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
