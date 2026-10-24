import React, { useState } from 'react';

export interface AccordionEntry {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export const Accordion: React.FC<{
  items: AccordionEntry[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}> = ({ items, allowMultiple = false, defaultOpenIds = [], className = '' }) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={`divide-y divide-ih-border border-y border-ih-border ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-3.5">
            <h3>
              <button
                type="button"
                disabled={item.disabled}
                aria-expanded={isOpen}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between gap-4 text-left text-sm font-bold text-ih-cobalt py-1 rounded-control disabled:opacity-45 disabled:cursor-not-allowed"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className="text-lg font-bold text-ih-cobalt leading-none"
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div className="mt-2.5 text-sm text-ih-muted leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
