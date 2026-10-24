import React, { useId } from 'react';

export const SearchField: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}> = ({
  value,
  onChange,
  placeholder = 'Buscar en la colección...',
  label = 'Buscar en la colección',
  className = '',
}) => {
  const id = useId();
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ih-muted text-sm"
      >
        ⌕
      </span>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="ds-input pl-9 pr-9"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Borrar búsqueda"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-control text-ih-muted hover:text-ih-cobalt font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
};
