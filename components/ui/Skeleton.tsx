import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({
  className = 'h-24 w-full',
}) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-card bg-ih-border/60 ${className}`}
  />
);
