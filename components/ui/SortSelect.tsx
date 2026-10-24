import React, { useId } from 'react';
import { SelectOption } from './Select';

export const SortSelect: React.FC<{
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  label?: string;
}> = ({ value, onChange, options, label = 'Ordenar' }) => {
  const id = useId();
  return (
    <div className="inline-flex items-center gap-2">
      <label htmlFor={id} className="text-xs font-bold text-ih-muted shrink-0">
        {label}:
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-control-sm rounded-control border border-ih-border-control bg-ih-raised px-3 text-xs font-bold text-ih-cobalt"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};
