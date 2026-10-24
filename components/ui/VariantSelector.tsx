import React from 'react';

export interface VariantOption {
  id: string;
  label: string;
  colorHex: string;
  inStock?: boolean;
}

export const VariantSelector: React.FC<{
  label: string;
  options: VariantOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}> = ({ label, options, selectedId, onSelect }) => {
  const active = options.find((o) => o.id === selectedId) || options[0];
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-ih-muted">
          {label}
        </span>
        {active && <span className="font-bold text-ih-text">{active.label}</span>}
      </div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((opt) => {
          const isSelected = opt.id === selectedId;
          const unavailable = opt.inStock === false;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={unavailable}
              onClick={() => onSelect(opt.id)}
              className={`inline-flex items-center gap-2 min-h-control-sm rounded-control px-3.5 text-xs font-bold border transition duration-fast disabled:opacity-40 disabled:line-through ${
                isSelected
                  ? 'bg-ih-cobalt text-ih-on-action border-ih-cobalt'
                  : 'bg-ih-cream text-ih-text border-ih-border-control hover:border-ih-cobalt'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-pill border border-black/20"
                style={{ backgroundColor: opt.colorHex }}
              />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
