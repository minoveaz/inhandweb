import React from 'react';
import { Button } from './Button';

export const OrderSummary: React.FC<{
  subtotalFormatted: string;
  shippingFormatted: string;
  totalFormatted: string;
  onContinue?: () => void;
  continueLabel?: string;
}> = ({
  subtotalFormatted,
  shippingFormatted,
  totalFormatted,
  onContinue,
  continueLabel = 'Continuar',
}) => (
  <div className="ds-card p-6 space-y-4">
    <h3 className="text-lg font-display text-ih-cobalt border-b border-ih-border pb-2">
      Resumen
    </h3>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-ih-muted">
        <span>Subtotal</span>
        <span className="font-bold text-ih-text">{subtotalFormatted}</span>
      </div>
      <div className="flex justify-between text-ih-muted">
        <span>Envío</span>
        <span className="font-bold text-ih-cobalt">{shippingFormatted}</span>
      </div>
      <div className="flex justify-between text-base font-bold text-ih-cobalt pt-2 border-t border-ih-border">
        <span>Total</span>
        <span>{totalFormatted}</span>
      </div>
    </div>
    {onContinue && (
      <Button variant="primary" size="lg" className="w-full" onClick={onContinue}>
        {continueLabel}
      </Button>
    )}
  </div>
);
