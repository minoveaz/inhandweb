import React from 'react';

export const Progress: React.FC<{ value: number; label?: string }> = ({
  value,
  label,
}) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex justify-between text-xs font-semibold text-ih-text">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full h-2 rounded-pill bg-ih-border overflow-hidden"
      >
        <div
          className="h-full bg-ih-cobalt transition-all duration-panel rounded-pill"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
