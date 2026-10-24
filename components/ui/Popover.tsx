import React, { useState } from 'react';

export const Popover: React.FC<{
  triggerLabel: string;
  title: string;
  children: React.ReactNode;
}> = ({ triggerLabel, title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="min-h-control-sm px-3.5 rounded-control border border-ih-border bg-ih-raised text-xs font-bold text-ih-cobalt"
      >
        {triggerLabel}
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-64 rounded-dialog bg-ih-raised border border-ih-border shadow-floating p-4 space-y-2 z-30">
          <div className="flex items-center justify-between">
            <strong className="text-xs font-bold text-ih-cobalt">{title}</strong>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-bold text-ih-muted"
            >
              ×
            </button>
          </div>
          <div className="text-xs text-ih-muted leading-relaxed">{children}</div>
        </div>
      )}
    </div>
  );
};
