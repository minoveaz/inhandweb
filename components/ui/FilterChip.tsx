import React from 'react';

export const FilterChip: React.FC<{
  label: string;
  sublabel?: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}> = ({ label, sublabel, selected, onSelect, disabled = false }) => (
  <button
    type="button"
    disabled={disabled}
    aria-pressed={selected}
    onClick={onSelect}
    className={`h-9 rounded-pill px-3.5 sm:px-4 text-xs font-semibold tracking-wide transition duration-fast border inline-flex items-center gap-1.5 disabled:opacity-45 shadow-2xs ${
      selected
        ? 'bg-ih-cobalt text-white border-ih-cobalt shadow-sm'
        : 'bg-ih-raised/90 text-ih-text border-ih-border hover:border-ih-cobalt/60 hover:bg-ih-raised'
    }`}
  >
    <span>{label}</span>
    {sublabel && (
      <span className={`text-[10px] uppercase ${selected ? 'text-ih-salmon' : 'text-ih-muted'}`}>
        / {sublabel}
      </span>
    )}
  </button>
);
