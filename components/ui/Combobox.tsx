import React, { useId, useState } from 'react';

export const Combobox: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  noResultsText?: string;
}> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Buscar...',
  noResultsText = 'Sin coincidencias. Prueba con otro término.',
}) => {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const autoId = useId();

  const matches = options.filter((o) =>
    o.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="relative space-y-1.5">
      <label htmlFor={autoId} className="ds-label block">
        {label}
      </label>
      <div className="relative">
        <input
          id={autoId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          value={query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 180)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          className="ds-input pr-9"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ih-muted text-sm"
        >
          ⌕
        </span>
      </div>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 w-full rounded-card bg-ih-raised border border-ih-border shadow-floating py-1 max-h-48 overflow-y-auto"
        >
          {matches.length > 0 ? (
            matches.map((item) => (
              <li key={item} role="option" aria-selected={item === value}>
                <button
                  type="button"
                  onMouseDown={() => {
                    setQuery(item);
                    onChange(item);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-sm hover:bg-ih-sand/60 ${
                    item === value ? 'font-bold text-ih-cobalt bg-ih-cream' : 'text-ih-text'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))
          ) : (
            <li className="px-3.5 py-3 text-xs text-ih-muted">{noResultsText}</li>
          )}
        </ul>
      )}
    </div>
  );
};
