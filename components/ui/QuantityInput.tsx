import React from 'react';

export const QuantityInput: React.FC<{
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md';
}> = ({ value, onChange, min = 1, max = 99, disabled = false, size = 'md' }) => {
  const btnSize = size === 'sm' ? 'w-8 h-8' : 'w-11 h-11';
  return (
    <div className="inline-flex items-center rounded-control border border-ih-border-control bg-ih-cream">
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Disminuir cantidad"
        className={`${btnSize} flex items-center justify-center text-ih-cobalt font-bold hover:bg-ih-sand rounded-l-control disabled:opacity-40`}
      >
        −
      </button>
      <span
        aria-live="polite"
        className="px-3.5 text-sm font-bold text-ih-text select-none"
      >
        {value}
      </span>
      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Aumentar cantidad"
        className={`${btnSize} flex items-center justify-center text-ih-cobalt font-bold hover:bg-ih-sand rounded-r-control disabled:opacity-40`}
      >
        +
      </button>
    </div>
  );
};
