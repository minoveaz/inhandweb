import React from 'react';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

export const Alert: React.FC<{
  tone?: AlertTone;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}> = ({ tone = 'info', title, children, onDismiss, className = '' }) => {
  const styles: Record<AlertTone, { box: string; icon: string }> = {
    info: {
      box: 'bg-ih-cream border-ih-cobalt/30 text-ih-text',
      icon: 'i',
    },
    success: {
      box: 'bg-ih-success-bg border-ih-success-fg/30 text-ih-success-fg',
      icon: '✓',
    },
    warning: {
      box: 'bg-ih-warning-bg border-ih-warning-fg/30 text-ih-warning-fg',
      icon: '!',
    },
    error: {
      box: 'bg-ih-danger-bg border-ih-danger-fg/30 text-ih-danger-fg',
      icon: '!',
    },
  };

  return (
    <div
      role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
      className={`rounded-card border p-4 flex items-start justify-between gap-3 ${styles[tone].box} ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="w-6 h-6 rounded-pill bg-ih-raised border border-current/20 inline-flex items-center justify-center text-xs font-bold shrink-0"
        >
          {styles[tone].icon}
        </span>
        <div className="space-y-1 text-sm">
          {title && <p className="font-bold">{title}</p>}
          <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
        </div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Cerrar aviso"
          className="text-xs font-bold px-1.5 py-0.5 rounded-control hover:bg-black/5"
        >
          ×
        </button>
      )}
    </div>
  );
};
