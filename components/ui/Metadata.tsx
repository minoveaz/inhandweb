import React from 'react';

export const Metadata: React.FC<{
  label: string;
  value?: string | null;
  fallbackText?: string;
}> = ({ label, value, fallbackText = 'No especificado' }) => (
  <div className="flex items-baseline justify-between gap-3 text-xs py-1">
    <span className="text-ih-muted font-medium">{label}</span>
    <span className={value ? 'font-bold text-ih-text' : 'italic text-ih-muted'}>
      {value || fallbackText}
    </span>
  </div>
);
