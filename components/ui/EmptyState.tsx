import React from 'react';
import { Button } from './Button';

export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
}> = ({ title, description, actionLabel, onAction, icon = '♡' }) => (
  <div className="ds-card p-10 text-center max-w-xl mx-auto space-y-4">
    <div className="w-12 h-12 rounded-pill bg-ih-sand text-ih-cobalt font-bold text-xl mx-auto flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-display text-ih-cobalt">{title}</h3>
    <p className="text-sm text-ih-muted leading-relaxed max-w-sm mx-auto">
      {description}
    </p>
    {actionLabel && onAction && (
      <div className="pt-2">
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    )}
  </div>
);
