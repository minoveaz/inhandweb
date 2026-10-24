import React from 'react';

export interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  label: string;
  compact?: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  pressed,
  onPressedChange,
  label,
  compact = false,
  disabled,
  className = '',
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onPressedChange(!pressed);
      }}
      className={`inline-flex items-center justify-center gap-1.5 min-w-touch min-h-touch ${
        compact ? 'px-2.5' : 'px-3.5'
      } rounded-control border text-xs font-bold transition duration-fast disabled:opacity-50 ${
        pressed
          ? 'bg-ih-sand border-ih-coral text-ih-cobalt'
          : 'bg-ih-raised border-ih-border text-ih-cobalt hover:bg-ih-sand/50'
      } ${className}`}
      {...rest}
    >
      {children || (
        <span className={`text-base leading-none ${pressed ? 'text-ih-coral' : 'text-ih-cobalt'}`}>
          {pressed ? '♥' : '♡'}
        </span>
      )}
    </button>
  );
};
