import React, { useEffect, useId, useRef } from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  indeterminate = false,
  disabled,
  id,
  className = '',
  ...rest
}) => {
  const autoId = useId();
  const checkboxId = id || `cb-${autoId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={checkboxId}
      className={`flex items-start gap-3 select-none ${
        disabled ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      <input
        ref={inputRef}
        id={checkboxId}
        type="checkbox"
        disabled={disabled}
        className="mt-0.5 w-5 h-5 rounded-control border border-ih-border-control accent-ih-cobalt"
        {...rest}
      />
      <span className="space-y-0.5">
        <span className="block text-sm font-semibold text-ih-text">{label}</span>
        {description && <span className="block ds-helper">{description}</span>}
      </span>
    </label>
  );
};
