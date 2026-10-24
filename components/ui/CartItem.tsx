import React from 'react';
import { QuantityInput } from './QuantityInput';

export const CartItem: React.FC<{
  title: string;
  variantLabel: string;
  priceFormatted: string;
  imageSrc: string;
  quantity: number;
  onQuantityChange: (next: number) => void;
  onRemove: () => void;
}> = ({
  title,
  variantLabel,
  priceFormatted,
  imageSrc,
  quantity,
  onQuantityChange,
  onRemove,
}) => (
  <div className="ds-card p-4 flex gap-4">
    <img
      src={imageSrc}
      alt={title}
      className="w-20 h-24 rounded-control object-cover bg-ih-sand border border-ih-border shrink-0"
    />
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-ih-text">{title}</p>
          <p className="text-xs text-ih-muted">{variantLabel}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-bold text-ih-danger-fg hover:underline"
        >
          Quitar
        </button>
      </div>
      <div className="flex items-center justify-between mt-3">
        <QuantityInput size="sm" value={quantity} onChange={onQuantityChange} />
        <span className="text-sm font-bold text-ih-cobalt">{priceFormatted}</span>
      </div>
    </div>
  </div>
);
