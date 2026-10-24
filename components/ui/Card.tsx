import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section' | 'li';
  interactive?: boolean;
  loading?: boolean;
}

export const Card: React.FC<CardProps> = ({
  as = 'div',
  interactive = false,
  loading = false,
  className = '',
  children,
  ...rest
}) => {
  const Component = as as any;
  return (
    <Component
      aria-busy={loading || undefined}
      className={`ds-card ${
        interactive ? 'transition-colors duration-fast hover:border-ih-cobalt' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};
