import React from 'react';

export const Toast: React.FC<{
  message: string;
  onDismiss?: () => void;
}> = ({ message, onDismiss }) => (
  <div
    role="status"
    aria-live="polite"
    className="inline-flex items-center gap-3 rounded-card bg-ih-text text-ih-on-action px-4 py-3 text-xs font-bold shadow-floating"
  >
    <span>✓ {message}</span>
    {onDismiss && (
      <button type="button" onClick={onDismiss} aria-label="Cerrar notificación">
        ×
      </button>
    )}
  </div>
);
