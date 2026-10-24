import React from 'react';
import { Price } from './Price';
import { Availability } from './Availability';
import { VariantSelector, VariantOption } from './VariantSelector';
import { QuantityInput } from './QuantityInput';
import { Button } from './Button';

export const ProductActions: React.FC<{
  priceFormatted: string;
  taxNote?: string;
  availability?: 'available' | 'low-stock' | 'out-of-stock';
  variants: VariantOption[];
  selectedVariantId: string;
  onSelectVariant: (id: string) => void;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onAddToCart: () => void;
  addToCartLabel?: string;
}> = ({
  priceFormatted,
  taxNote,
  availability = 'available',
  variants,
  selectedVariantId,
  onSelectVariant,
  quantity,
  onQuantityChange,
  onAddToCart,
  addToCartLabel = 'Añadir al carrito',
}) => (
  <div className="ds-card p-6 space-y-5">
    <div className="flex items-center justify-between gap-2">
      <Price amountFormatted={priceFormatted} taxNote={taxNote} size="lg" />
      <Availability state={availability} />
    </div>
    <VariantSelector
      label="Acabado / Color"
      options={variants}
      selectedId={selectedVariantId}
      onSelect={onSelectVariant}
    />
    <div className="flex items-center gap-3 pt-2">
      <QuantityInput value={quantity} onChange={onQuantityChange} />
      <Button
        variant="primary"
        className="flex-1"
        disabled={availability === 'out-of-stock'}
        onClick={onAddToCart}
      >
        {addToCartLabel}
      </Button>
    </div>
  </div>
);
