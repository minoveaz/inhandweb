import React, { useId } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  description?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  description,
  error,
  required,
  disabled,
  id,
  className = '',
  ...rest
}) => {
  const autoId = useId();
  const selectId = id || `sel-${autoId}`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={selectId} className="ds-label block">
        {label}
        {required && <span className="text-ih-danger-fg ml-0.5">*</span>}
      </label>
      <select
        id={selectId}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error) || undefined}
        className={`ds-input ${
          error ? 'border-2 border-ih-danger-fg bg-ih-danger-bg/40' : ''
        }`}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {description && !error && <p className="ds-helper">{description}</p>}
      {error && (
        <p role="alert" className="text-xs font-bold text-ih-danger-fg">
          ! {error}
        </p>
      )}
    </div>
  );
};
