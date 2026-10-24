import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext';
import { STATIC_ROUTES } from '../../config/routes';
import { CATEGORIES } from '../../config/products';

export const Footer: React.FC = () => {
  const { locale, t } = useLocale();

  return (
    <footer className="bg-ih-sand/65 border-t border-ih-border text-ih-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-ih-border">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <Link to={STATIC_ROUTES.home.paths[locale]} className="inline-block">
              <img
                src="/logos/04_lockups/inhand-lockup-azul.svg"
                alt="INHAND — Made to Mean More."
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-ih-muted max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/80 border border-ih-border px-3.5 py-1.5 text-xs text-ih-cobalt font-medium">
              <img
                src="/icons/04_benefit/secure-payment.svg"
                alt=""
                className="w-4 h-4"
              />
              <span>{t.footer.paymentSecurity}</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ih-cobalt">
              {t.footer.navigate}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to={STATIC_ROUTES.shop.paths[locale]}
                  className="text-ih-muted hover:text-ih-cobalt transition"
                >
                  {t.nav.shop}
                </Link>
              </li>
              <li>
                <Link
                  to={STATIC_ROUTES.story.paths[locale]}
                  className="text-ih-muted hover:text-ih-cobalt transition"
                >
                  {t.nav.ourStory}
                </Link>
              </li>
              <li>
                <Link
                  to={STATIC_ROUTES.communities.paths[locale]}
                  className="text-ih-muted hover:text-ih-cobalt transition"
                >
                  {t.nav.forCommunities}
                </Link>
              </li>
              <li>
                <Link
                  to={STATIC_ROUTES.contact.paths[locale]}
                  className="text-ih-muted hover:text-ih-cobalt transition"
                >
                  {t.nav.contact}
                </Link>
              </li>
              <li className="pt-2 border-t border-ih-border/60">
                <Link
                  to={STATIC_ROUTES.account.paths[locale]}
                  className="text-ih-cobalt font-semibold hover:text-ih-coral transition"
                >
                  {t.nav.account}
                </Link>
              </li>
              <li>
                <Link
                  to={STATIC_ROUTES.trackOrder.paths[locale]}
                  className="text-ih-muted hover:text-ih-cobalt transition text-xs"
                >
                  {t.auth.trackOrderHeading}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ih-cobalt">
              {t.footer.categories}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`${STATIC_ROUTES.shop.paths[locale]}?category=${cat.slug}`}
                    className="text-ih-muted hover:text-ih-cobalt transition flex items-center gap-2"
                  >
                    <span>{cat.name[locale]}</span>
                    <span className="text-[11px] uppercase tracking-wider text-ih-cobalt/70 font-medium">
                      / {cat.editorialName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ih-cobalt">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to={`${STATIC_ROUTES.legal.paths[locale]}#privacy`}
                  className="text-ih-muted hover:text-ih-cobalt transition"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  to={`${STATIC_ROUTES.legal.paths[locale]}#cookies`}
                  className="text-ih-muted hover:text-ih-cobalt transition"
                >
                  {t.footer.cookies}
                </Link>
              </li>
              <li>
                <Link
                  to={`${STATIC_ROUTES.legal.paths[locale]}#terms`}
                  className="text-ih-muted hover:text-ih-cobalt transition"
                >
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  to={STATIC_ROUTES.designSystem.paths[locale]}
                  className="text-ih-cobalt font-bold hover:underline transition"
                >
                  Design System v0.1
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ih-muted">
          <div className="flex items-center gap-3">
            <img
              src="/logos/05_monograma_ih/ih-azul.svg"
              alt="IH"
              className="h-5 w-auto opacity-85"
            />
            <span>{t.footer.copyright}</span>
          </div>
          <p className="text-ih-muted/80">{t.footer.sparklightCredit}</p>
        </div>
      </div>
    </footer>
  );
};
