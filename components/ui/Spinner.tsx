import React from 'react';

export const Spinner: React.FC<{ label?: string }> = ({
  label = 'Cargando contenido…',
}) => (
  <div
    role="status"
    className="inline-flex items-center gap-2.5 text-xs font-bold text-ih-cobalt"
  >
    <span
      aria-hidden="true"
      className="w-4 h-4 rounded-pill border-2 border-ih-cobalt border-r-transparent animate-spin"
    />
    <span>{label}</span>
  </div>
);
