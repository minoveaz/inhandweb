import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: Array<{ to: string; label: string }>;
}

export const MobileNav: React.FC<MobileNavProps> = ({ open, onClose, links }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-ih-text/45 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-ih-cream h-full shadow-floating flex flex-col justify-between p-6 z-10 overflow-y-auto border-r border-ih-border">
        <nav className="space-y-4">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `block text-xl font-display py-2 px-2 rounded-control ${
                  isActive ? 'text-ih-cobalt font-bold bg-ih-sand/60' : 'text-ih-text'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
