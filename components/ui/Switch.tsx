import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  label,
  description,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div className="space-y-0.5">
        <span className="block text-sm font-semibold text-ih-text">{label}</span>
        {description && <span className="block ds-helper">{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-pill transition duration-fast disabled:opacity-50 disabled:cursor-not-allowed ${
          checked ? 'bg-ih-cobalt' : 'bg-ih-border-control/50'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-pill bg-ih-raised transition duration-fast ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};
