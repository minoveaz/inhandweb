import React, { useId } from 'react';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  description,
  error,
  required,
  disabled,
  readOnly,
  id,
  className = '',
  ...rest
}) => {
  const autoId = useId();
  const inputId = id || `tf-${autoId}`;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const describedBy = [descId, errId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={inputId} className="ds-label block">
        {label}
        {required && <span className="text-ih-danger-fg ml-0.5">*</span>}
      </label>

      <input
        id={inputId}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={`w-full min-h-control-md px-4 rounded-control text-base transition duration-fast ${
          error
            ? 'bg-ih-danger-bg/40 border-2 border-ih-danger-fg text-ih-text'
            : readOnly || disabled
            ? 'bg-ih-action-disabled border border-ih-border text-ih-muted cursor-not-allowed'
            : 'bg-ih-raised border border-ih-border-control text-ih-text focus:border-ih-focus'
        }`}
        {...rest}
      />

      {description && !error && (
        <p id={descId} className="ds-helper">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errId}
          role="alert"
          className="text-xs font-bold text-ih-danger-fg flex items-center gap-1.5"
        >
          <span aria-hidden="true">!</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
