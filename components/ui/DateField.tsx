import React, { useId } from 'react';

export const DateField: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  helperText?: string;
  error?: string;
}> = ({
  label,
  value,
  onChange,
  helperText = 'Formato día, mes y año.',
  error,
}) => {
  const autoId = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={autoId} className="ds-label block">
        {label}
      </label>
      <input
        id={autoId}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`ds-input ${error ? 'border-2 border-ih-danger-fg' : ''}`}
      />
      {!error ? (
        <p className="ds-helper">{helperText}</p>
      ) : (
        <p role="alert" className="text-xs font-bold text-ih-danger-fg">
          ! {error}
        </p>
      )}
    </div>
  );
};
