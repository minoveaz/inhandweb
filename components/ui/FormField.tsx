import React from 'react';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  helperText,
  errorText,
  children,
}) => (
  <div className="space-y-1.5">
    <label htmlFor={htmlFor} className="ds-label block">
      {label}
      {required && <span className="text-ih-danger-fg ml-0.5">*</span>}
    </label>
    {children}
    {helperText && !errorText && <p className="ds-helper">{helperText}</p>}
    {errorText && (
      <p role="alert" className="text-xs font-bold text-ih-danger-fg">
        ! {errorText}
      </p>
    )}
  </div>
);
