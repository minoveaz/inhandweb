import React from 'react';

export const ResultCount: React.FC<{
  count: number;
  label: string;
  onClearFilters?: () => void;
  clearLabel?: string;
}> = ({ count, label, onClearFilters, clearLabel = 'Limpiar filtros ×' }) => (
  <div className="flex items-center gap-4 text-xs text-ih-muted font-medium" aria-live="polite">
    <span>
      <strong className="text-ih-cobalt font-bold">{count}</strong> {label}
    </span>
    {onClearFilters && (
      <button
        type="button"
        onClick={onClearFilters}
        className="font-bold text-ih-cobalt hover:underline rounded-control px-1.5 py-0.5"
      >
        {clearLabel}
      </button>
    )}
  </div>
);
