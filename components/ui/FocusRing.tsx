import React from 'react';

export interface FocusRingProps {
  children: React.ReactNode;
  className?: string;
}

export const FocusRing: React.FC<FocusRingProps> = ({ children, className = '' }) => (
  <div
    className={`focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ih-focus rounded-control ${className}`}
  >
    {children}
  </div>
);
