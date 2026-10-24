import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  legend,
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <fieldset className={`space-y-2.5 ${className}`}>
      <legend className="ds-label mb-1">{legend}</legend>
      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex items-start gap-3 p-3 rounded-control border transition duration-fast ${
                opt.disabled
                  ? 'opacity-50 cursor-not-allowed bg-ih-action-disabled border-ih-border'
                  : isSelected
                  ? 'bg-ih-cream border-ih-cobalt cursor-pointer'
                  : 'bg-ih-raised border-ih-border hover:border-ih-border-control cursor-pointer'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={opt.disabled}
                onChange={() => onChange(opt.value)}
                className="mt-0.5 w-4 h-4 accent-ih-cobalt"
              />
              <span className="space-y-0.5">
                <span className="block text-sm font-bold text-ih-text">
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="block ds-helper">{opt.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};
