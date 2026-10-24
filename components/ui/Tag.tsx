import React from 'react';

export const Tag: React.FC<{
  label: string;
  onRemove?: () => void;
  className?: string;
}> = ({ label, onRemove, className = '' }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-control bg-ih-raised border border-ih-border px-2.5 py-1 text-xs font-semibold text-ih-text ${className}`}
  >
    <span>{label}</span>
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Quitar ${label}`}
        className="w-4 h-4 rounded-control inline-flex items-center justify-center text-ih-muted hover:text-ih-danger-fg hover:bg-ih-danger-bg"
      >
        ×
      </button>
    )}
  </span>
);
