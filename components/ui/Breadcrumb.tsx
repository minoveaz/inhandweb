import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[]; className?: string }> = ({
  items,
  className = '',
}) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-2 text-xs text-ih-muted">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={`${item.label}-${idx}`}>
            <li>
              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'font-bold text-ih-cobalt' : 'text-ih-muted'}
                >
                  {item.label}
                </span>
              ) : (
                <RouterLink
                  to={item.to}
                  className="hover:text-ih-cobalt hover:underline rounded-control px-1 py-0.5"
                >
                  {item.label}
                </RouterLink>
              )}
            </li>
            {!isLast && <li aria-hidden="true">/</li>}
          </React.Fragment>
        );
      })}
    </ol>
  </nav>
);
