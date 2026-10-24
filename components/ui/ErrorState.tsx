import React from 'react';
import { Button } from './Button';

export const ErrorState: React.FC<{
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
}> = ({
  title = 'No se pudo cargar',
  description = 'Revisa la conexión y vuelve a intentarlo.',
  retryLabel = 'Reintentar',
  onRetry,
}) => (
  <div
    role="alert"
    className="rounded-card bg-ih-danger-bg border border-ih-danger-fg/30 p-8 text-center max-w-xl mx-auto space-y-4"
  >
    <div className="w-10 h-10 rounded-pill bg-ih-raised text-ih-danger-fg font-bold mx-auto flex items-center justify-center">
      !
    </div>
    <h3 className="text-lg font-display text-ih-danger-fg">{title}</h3>
    <p className="text-sm text-ih-text">{description}</p>
    {onRetry && (
      <Button variant="secondary" onClick={onRetry}>
        {retryLabel}
      </Button>
    )}
  </div>
);
