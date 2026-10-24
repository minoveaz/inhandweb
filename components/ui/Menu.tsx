import React, { useState } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export const Menu: React.FC<{
  triggerLabel: string;
  items: MenuItem[];
}> = ({ triggerLabel, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="min-h-control-sm px-3.5 rounded-control border border-ih-border bg-ih-raised text-xs font-bold text-ih-cobalt"
      >
        {triggerLabel} ˅
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute right-0 mt-1 w-48 rounded-card bg-ih-raised border border-ih-border shadow-floating py-1 z-30"
        >
          {items.map((item) => (
            <li key={item.id} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onSelect();
                  setOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-ih-sand/60 disabled:opacity-45 ${
                  item.destructive ? 'text-ih-danger-fg' : 'text-ih-text'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
