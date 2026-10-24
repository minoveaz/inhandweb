import React, { useId } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  maxLength?: number;
  description?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  maxLength,
  description,
  error,
  value = '',
  required,
  id,
  className = '',
  ...rest
}) => {
  const autoId = useId();
  const areaId = id || `ta-${autoId}`;
  const currentLength = String(value).length;
  const isOverLimit = maxLength ? currentLength > maxLength : false;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={areaId} className="ds-label">
          {label}
          {required && <span className="text-ih-danger-fg ml-0.5">*</span>}
        </label>
        {maxLength && (
          <span
            className={`text-xs font-medium ${
              isOverLimit ? 'text-ih-danger-fg font-bold' : 'text-ih-muted'
            }`}
          >
            {currentLength} / {maxLength} caracteres
          </span>
        )}
      </div>
      <textarea
        id={areaId}
        value={value}
        maxLength={maxLength}
        required={required}
        className={`ds-input py-3 ${
          error || isOverLimit ? 'border-2 border-ih-danger-fg bg-ih-danger-bg/40' : ''
        }`}
        {...rest}
      />
      {description && !error && <p className="ds-helper">{description}</p>}
      {error && (
        <p role="alert" className="text-xs font-bold text-ih-danger-fg">
          ! {error}
        </p>
      )}
    </div>
  );
};
