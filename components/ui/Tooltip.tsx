import React from 'react';

export const Tooltip: React.FC<{
  content: string;
  children: React.ReactNode;
}> = ({ content, children }) => (
  <span className="relative group inline-flex items-center">
    {children}
    <span
      role="tooltip"
      className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-fast absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-control bg-ih-text text-ih-on-action text-[11px] font-medium whitespace-nowrap shadow-floating z-30"
    >
      {content}
    </span>
  </span>
);
