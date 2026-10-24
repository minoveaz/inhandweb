import React from 'react';

export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  summaryText?: string;
}> = ({ currentPage, totalPages, onPageChange, summaryText }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav
      aria-label="Paginación"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4"
    >
      {summaryText && <span className="ds-helper">{summaryText}</span>}
      <div className="inline-flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="min-h-control-sm px-3 rounded-control border border-ih-border bg-ih-raised text-xs font-bold text-ih-cobalt disabled:opacity-45"
        >
          Anterior
        </button>
        {pages.map((p) => {
          const isCurrent = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => onPageChange(p)}
              className={`min-w-[36px] min-h-control-sm rounded-control border text-xs font-bold transition duration-fast ${
                isCurrent
                  ? 'bg-ih-cobalt text-ih-on-action border-ih-cobalt'
                  : 'bg-ih-raised text-ih-text border-ih-border hover:border-ih-cobalt'
              }`}
            >
              {p}
            </button>
          );
        })}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="min-h-control-sm px-3 rounded-control border border-ih-border bg-ih-raised text-xs font-bold text-ih-cobalt disabled:opacity-45"
        >
          Siguiente
        </button>
      </div>
    </nav>
  );
};
