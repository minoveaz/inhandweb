import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'default' | 'subtle' | 'primary';
}

export const IconButton: React.FC<IconButtonProps> = ({
  label,
  variant = 'default',
  disabled,
  className = '',
  children,
  ...rest
}) => {
  const variantClasses = {
    default:
      'bg-ih-raised border border-ih-border text-ih-cobalt hover:bg-ih-sand disabled:bg-ih-action-disabled disabled:text-ih-muted',
    subtle:
      'bg-transparent text-ih-cobalt hover:bg-ih-sand/60 disabled:text-ih-muted',
    primary:
      'bg-ih-cobalt text-ih-on-action hover:bg-ih-cobalt-deep disabled:bg-ih-action-disabled disabled:text-ih-muted',
  }[variant];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      className={`inline-flex items-center justify-center min-w-touch min-h-touch rounded-control transition duration-fast disabled:cursor-not-allowed ${variantClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
