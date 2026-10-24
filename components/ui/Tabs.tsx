import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export const Tabs: React.FC<{
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}> = ({ tabs, defaultTabId, className = '' }) => {
  const [activeId, setActiveId] = useState<string>(defaultTabId || tabs[0]?.id || '');
  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        role="tablist"
        className="flex items-center gap-2 border-b border-ih-border overflow-x-auto"
      >
        {tabs.map((tab) => {
          const isSelected = tab.id === activeTab?.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              disabled={tab.disabled}
              onClick={() => setActiveId(tab.id)}
              className={`min-h-control-md px-4 text-sm font-bold border-b-2 transition duration-fast shrink-0 disabled:opacity-45 disabled:cursor-not-allowed ${
                isSelected
                  ? 'border-ih-cobalt text-ih-cobalt'
                  : 'border-transparent text-ih-muted hover:text-ih-text'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeTab && (
        <div role="tabpanel" className="pt-2">
          {activeTab.content}
        </div>
      )}
    </div>
  );
};
