import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText,
  disabled,
  to,
  href,
  className = '',
  children,
  type = 'button',
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const sizeClasses = {
    sm: 'min-h-control-sm px-3.5 text-xs',
    md: 'min-h-control-md px-5 text-sm',
    lg: 'min-h-control-lg px-7 text-sm',
  }[size];

  const variantClasses = {
    primary: isDisabled
      ? 'bg-ih-action-disabled text-ih-muted cursor-not-allowed'
      : 'bg-ih-action hover:bg-ih-action-hover active:bg-ih-cobalt-deep text-ih-on-action',
    secondary: isDisabled
      ? 'bg-ih-action-disabled text-ih-muted border border-ih-border cursor-not-allowed'
      : 'bg-ih-raised hover:bg-ih-sand text-ih-cobalt border border-ih-cobalt',
    destructive: isDisabled
      ? 'bg-ih-action-disabled text-ih-muted cursor-not-allowed'
      : 'bg-ih-danger-fg hover:opacity-90 text-ih-on-action',
    ghost: isDisabled
      ? 'text-ih-muted cursor-not-allowed'
      : 'bg-transparent hover:bg-ih-sand/60 text-ih-cobalt',
  }[variant];

  const commonClass = `inline-flex items-center justify-center gap-2 rounded-control font-bold transition duration-fast select-none whitespace-nowrap ${sizeClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      {loading && (
        <span
          aria-hidden="true"
          className="inline-block w-3.5 h-3.5 rounded-pill border-2 border-current border-r-transparent animate-spin shrink-0"
        />
      )}
      {loading && loadingText ? <span>{loadingText}</span> : children}
    </>
  );

  if (to && !isDisabled) {
    return (
      <RouterLink to={to} className={commonClass}>
        {content}
      </RouterLink>
    );
  }

  if (href && !isDisabled) {
    return (
      <a
        href={href}
        target={rest.target}
        rel={rest.rel || (rest.target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={commonClass}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={commonClass}
      {...rest}
    >
      {content}
    </button>
  );
};
