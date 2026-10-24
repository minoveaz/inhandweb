import React from 'react';
import { AlertTone } from './Alert';

export const InlineMessage: React.FC<{
  tone?: AlertTone;
  children: React.ReactNode;
}> = ({ tone = 'info', children }) => {
  const colors: Record<AlertTone, string> = {
    info: 'text-ih-cobalt',
    success: 'text-ih-success-fg',
    warning: 'text-ih-warning-fg',
    error: 'text-ih-danger-fg',
  };
  const symbols: Record<AlertTone, string> = {
    info: 'i',
    success: '✓',
    warning: '!',
    error: '!',
  };
  return (
    <p className={`text-xs font-bold flex items-center gap-1.5 ${colors[tone]}`}>
      <span aria-hidden="true">{symbols[tone]}</span>
      <span>{children}</span>
    </p>
  );
};
