import React, { useEffect } from 'react';

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="fixed inset-0 bg-ih-text/45 backdrop-blur-xs"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-dialog bg-ih-raised border border-ih-border shadow-floating p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-ih-border pb-3">
          <h3 className="text-xl font-display text-ih-cobalt">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="w-8 h-8 rounded-control border border-ih-border flex items-center justify-center font-bold text-ih-cobalt"
          >
            ×
          </button>
        </div>
        <div className="text-sm text-ih-muted leading-relaxed">{children}</div>
        {footer && (
          <div className="pt-3 border-t border-ih-border flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
