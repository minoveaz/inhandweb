import React from 'react';
import { Badge, BadgeTone } from './Badge';

export const Availability: React.FC<{
  state?: 'available' | 'low-stock' | 'out-of-stock';
  locale?: 'es' | 'en';
}> = ({ state = 'available', locale = 'es' }) => {
  const config = {
    available: {
      tone: 'success' as BadgeTone,
      label: locale === 'es' ? 'Disponible' : 'Available',
    },
    'low-stock': {
      tone: 'warning' as BadgeTone,
      label: locale === 'es' ? 'Pocas unidades' : 'Low stock',
    },
    'out-of-stock': {
      tone: 'error' as BadgeTone,
      label: locale === 'es' ? 'Agotado' : 'Out of stock',
    },
  }[state];

  return <Badge tone={config.tone}>{config.label}</Badge>;
};
