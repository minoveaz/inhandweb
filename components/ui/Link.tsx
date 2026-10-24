import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  external?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  to,
  external = false,
  className = '',
  children,
  ...rest
}) => {
  const commonClass = `inline-flex items-center gap-1 font-bold text-ih-cobalt underline-offset-4 hover:underline rounded-control px-0.5 transition duration-fast ${className}`;

  if (to && !external) {
    return (
      <RouterLink to={to} className={commonClass}>
        <span>{children}</span>
      </RouterLink>
    );
  }

  return (
    <a
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={commonClass}
      {...rest}
    >
      <span>{children}</span>
      {external && <span aria-hidden="true">↗</span>}
    </a>
  );
};

export const LinkText = Link;
