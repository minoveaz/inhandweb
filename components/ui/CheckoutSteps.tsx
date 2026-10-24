import React from 'react';
import { Stepper, StepDefinition } from './Stepper';

export const CheckoutSteps: React.FC<{
  steps?: StepDefinition[];
}> = ({
  steps = [
    { id: 'input', label: 'Datos y Entrega', state: 'completed' },
    { id: 'validation', label: 'Pasarela Bancaria', state: 'current' },
    { id: 'success', label: 'Confirmación', state: 'pending' },
  ],
}) => <Stepper steps={steps} />;
