import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Locale, resolveAlternatePath } from '../config/routes';
import { DICTIONARY } from '../config/i18n';

interface LocaleContextValue {
  locale: Locale;
  t: (typeof DICTIONARY)['es'];
  switchLocalePath: (targetLocale: Locale) => string;
  formatPrice: (amountEur: number) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const locale: Locale = useMemo(() => {
    const p = location.pathname;
    if (p === '/en' || p.startsWith('/en/')) {
      return 'en';
    }
    return 'es';
  }, [location.pathname]);

  const value = useMemo<LocaleContextValue>(() => {
    const formatPrice = (amountEur: number) => {
      return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-IE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      }).format(amountEur);
    };

    const switchLocalePath = (targetLocale: Locale) => {
      return resolveAlternatePath(location.pathname, targetLocale);
    };

    return {
      locale,
      t: DICTIONARY[locale],
      switchLocalePath,
      formatPrice,
    };
  }, [locale, location.pathname]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}
