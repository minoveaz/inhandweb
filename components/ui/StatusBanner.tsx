import React from 'react';

export const StatusBanner: React.FC<{
  tone?: 'info' | 'warning' | 'error';
  children: React.ReactNode;
}> = ({ tone = 'info', children }) => {
  const bg = {
    info: 'bg-ih-cobalt text-ih-on-action',
    warning: 'bg-ih-warning-bg text-ih-warning-fg border-b border-ih-warning-fg/20',
    error: 'bg-ih-danger-bg text-ih-danger-fg border-b border-ih-danger-fg/20',
  }[tone];

  return (
    <div role="status" className={`w-full py-2.5 px-4 text-center text-xs font-bold ${bg}`}>
      {children}
    </div>
  );
};
