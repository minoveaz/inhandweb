import React, { useEffect } from 'react';
import { IconButton } from './IconButton';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  headerContent?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  headerContent,
  footer,
  children,
  className = '',
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="fixed inset-0 bg-ih-text/45 backdrop-blur-xs transition-opacity duration-panel"
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-md bg-ih-cream h-full shadow-floating flex flex-col justify-between border-l border-ih-border ${className}`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-ih-border bg-ih-raised">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-display text-ih-cobalt">{title}</h3>
            <IconButton
              label="Cerrar panel"
              onClick={onClose}
              variant="default"
              className="text-base font-bold"
            >
              ×
            </IconButton>
          </div>
          {headerContent && <div className="mt-4">{headerContent}</div>}
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Optional Drawer Footer */}
        {footer && <div className="p-6 border-t border-ih-border bg-ih-raised">{footer}</div>}
      </div>
    </div>
  );
};
