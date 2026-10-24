import React from 'react';

export const Price: React.FC<{
  amountFormatted: string;
  originalFormatted?: string;
  taxNote?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ amountFormatted, originalFormatted, taxNote, size = 'md' }) => {
  const sizeClass = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
  }[size];

  return (
    <div className="inline-flex flex-wrap items-baseline gap-2">
      <span className={`${sizeClass} font-bold text-ih-text`}>
        {amountFormatted}
      </span>
      {originalFormatted && (
        <span className="text-xs line-through text-ih-muted">
          {originalFormatted}
        </span>
      )}
      {taxNote && <span className="ds-helper">{taxNote}</span>}
    </div>
  );
};
