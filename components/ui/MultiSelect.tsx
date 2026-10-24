import React from 'react';
import { Tag } from './Tag';

export const MultiSelect: React.FC<{
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}> = ({ label, options, selected, onChange }) => {
  const toggleOption = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((x) => x !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="space-y-2">
      <span className="ds-label block">{label}</span>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((item) => (
            <Tag
              key={item}
              label={item}
              onRemove={() => toggleOption(item)}
            />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isPicked = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={isPicked}
              onClick={() => toggleOption(opt)}
              className={`min-h-control-sm px-3 rounded-control border text-xs font-semibold transition duration-fast ${
                isPicked
                  ? 'bg-ih-cobalt text-ih-on-action border-ih-cobalt'
                  : 'bg-ih-raised text-ih-text border-ih-border-control hover:border-ih-cobalt'
              }`}
            >
              {isPicked ? `✓ ${opt}` : `+ ${opt}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};
