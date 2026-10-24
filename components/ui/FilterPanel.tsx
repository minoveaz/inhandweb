import React from 'react';
import { Button } from './Button';

export const FilterPanel: React.FC<{
  open: boolean;
  onClose: () => void;
  onApply?: () => void;
  children: React.ReactNode;
}> = ({ open, onClose, onApply, children }) => {
  if (!open) return null;
  return (
    <div className="ds-card p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-ih-border pb-2">
        <h3 className="text-sm font-bold text-ih-cobalt">Filtros</h3>
        <button type="button" onClick={onClose} className="text-xs font-bold text-ih-muted">
          × Cerrar
        </button>
      </div>
      <div>{children}</div>
      {onApply && (
        <div className="pt-2 flex justify-end">
          <Button size="sm" onClick={onApply}>
            Aplicar
          </Button>
        </div>
      )}
    </div>
  );
};
