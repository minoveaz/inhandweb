import React from 'react';

export interface StepDefinition {
  id: string;
  label: string;
  state: 'completed' | 'current' | 'pending' | 'error';
}

export const Stepper: React.FC<{ steps: StepDefinition[] }> = ({ steps }) => (
  <ol className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold">
    {steps.map((step, idx) => {
      const badgeClass = {
        completed: 'bg-ih-cobalt text-ih-on-action',
        current: 'border-2 border-ih-cobalt text-ih-cobalt bg-ih-raised',
        pending: 'border border-ih-border text-ih-muted bg-ih-raised',
        error: 'bg-ih-danger-bg text-ih-danger-fg border border-ih-danger-fg',
      }[step.state];

      return (
        <React.Fragment key={step.id}>
          <li
            aria-current={step.state === 'current' ? 'step' : undefined}
            className="flex items-center gap-2"
          >
            <span
              className={`w-6 h-6 rounded-pill inline-flex items-center justify-center ${badgeClass}`}
            >
              {step.state === 'completed'
                ? '✓'
                : step.state === 'error'
                ? '!'
                : idx + 1}
            </span>
            <span
              className={
                step.state === 'pending' ? 'text-ih-muted' : 'text-ih-cobalt'
              }
            >
              {step.label}
            </span>
          </li>
          {idx < steps.length - 1 && (
            <li aria-hidden="true" className="text-ih-muted">
              —
            </li>
          )}
        </React.Fragment>
      );
    })}
  </ol>
);
