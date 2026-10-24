import React from 'react';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'accent';

export const Badge: React.FC<{
  tone?: BadgeTone;
  showSymbol?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ tone = 'neutral', showSymbol = true, children, className = '' }) => {
  const toneStyles: Record<BadgeTone, string> = {
    neutral: 'bg-ih-soft text-ih-text border-ih-border',
    success: 'bg-ih-success-bg text-ih-success-fg border-ih-success-fg/25',
    warning: 'bg-ih-warning-bg text-ih-warning-fg border-ih-warning-fg/25',
    error: 'bg-ih-danger-bg text-ih-danger-fg border-ih-danger-fg/25',
    info: 'bg-ih-cream text-ih-cobalt border-ih-cobalt/25',
    accent: 'bg-ih-sand text-ih-cobalt border-ih-coral/35',
  };

  const prefixSymbol: Record<BadgeTone, string> = {
    neutral: '•',
    success: '✓',
    warning: '!',
    error: '×',
    info: 'i',
    accent: '★',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-xs font-bold leading-none ${toneStyles[tone]} ${className}`}
    >
      {showSymbol && <span aria-hidden="true">{prefixSymbol[tone]}</span>}
      <span>{children}</span>
    </span>
  );
};
