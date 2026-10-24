import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, CATEGORIES } from '../../config/products';
import { useLocale } from '../../context/LocaleContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getProductPath } from '../../config/routes';
import { Card, Badge, Button, ToggleButton, Availability, Price } from '../ui';

interface ProductCardProps {
  product: Product;
}

/**
 * INHAND Design System v0.1 — Card Component (Slide 06, 18, 19)
 * - Surface: surface.raised (#FFFAF3)
 * - Border: 1px border.subtle (#DDDCD3)
 * - Radius: radius.card (8px)
 * - Anatomy: Image, Favorite ToggleButton (independent focus), Badge, Title, Metadata, Availability & Price
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { locale, t, formatPrice } = useLocale();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useAuth();
  const [justAdded, setJustAdded] = useState(false);
  const favorited = isInWishlist(product.id);

  const productPath = getProductPath(locale, product.slug);
  const categoryObj = CATEGORIES.find((c) => c.slug === product.categorySlug);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, product.variants[0]?.id, 1, true);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <Card
      as="article"
      interactive
      className="group flex flex-col overflow-hidden"
    >
      {/* Image Container with Hover Angle Swap */}
      <div className="relative aspect-[4/5] w-full bg-ih-sand/45 overflow-hidden border-b border-ih-border">
        <Link to={productPath} className="block w-full h-full">
          <img
            src={product.images.main}
            alt={product.name[locale]}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-opacity duration-panel group-hover:opacity-0"
          />
          <img
            src={product.images.angle}
            alt={`${product.name[locale]} — vista alternativa`}
            loading="lazy"
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-panel group-hover:opacity-100"
          />
        </Link>

        {/* Top Left Drop Badge (Slide 19: radius.pill 999px) */}
        {product.badge && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <Badge tone="accent" showSymbol={false}>
              {product.badge[locale]}
            </Badge>
          </div>
        )}

        {/* Top Right Favorite ToggleButton with independent focus & 44x44px touch target (Slide 09 & 18) */}
        <div className="absolute top-3 right-3">
          <ToggleButton
            pressed={favorited}
            onPressedChange={() => toggleWishlist(product.id)}
            compact
            label={
              locale === 'es'
                ? `Guardar ${product.name.es} en favoritos`
                : `Save ${product.name.en} to favorites`
            }
          />
        </div>

        {/* Separated Quick Add Action Button (Slide 08 & 18) */}
        <div className="absolute bottom-3 right-3">
          <Button
            size="sm"
            variant={justAdded ? 'secondary' : 'primary'}
            onClick={handleQuickAdd}
            className={justAdded ? 'bg-ih-success-bg text-ih-success-fg border-ih-success-fg/30' : ''}
          >
            <span>{justAdded ? `✓ ${t.shop.addedToCart}` : t.shop.addToCart}</span>
            {!justAdded && <span className="text-ih-salmon">+</span>}
          </Button>
        </div>
      </div>

      {/* Card Editorial Info (Slide 18: Tag/Metadata -> Title -> Descriptor -> Swatches & Price) */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-ih-muted mb-1.5">
            <span>
              {categoryObj
                ? `${categoryObj.editorialName} · ${categoryObj.name[locale]}`
                : product.categoryEditorial}
            </span>
            <span className="text-ih-cobalt font-mono text-[11px]">{product.sku}</span>
          </div>

          <Link
            to={productPath}
            className="block text-lg font-display text-ih-cobalt hover:underline leading-snug rounded-control"
          >
            {product.name[locale]}
          </Link>

          <p className="text-xs text-ih-muted mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescriptor[locale]}
          </p>
        </div>

        <div className="pt-3 border-t border-ih-border flex items-center justify-between">
          {/* Variant Color Swatches + Availability Badge (Slide 19) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {product.variants.map((v) => (
                <span
                  key={v.id}
                  title={v.name[locale]}
                  className="w-3.5 h-3.5 rounded-pill border border-ih-border-control"
                  style={{ backgroundColor: v.colorHex }}
                />
              ))}
            </div>
            <Availability state="available" locale={locale} />
          </div>

          <Price amountFormatted={formatPrice(product.priceEur)} size="sm" />
        </div>
      </div>
    </Card>
  );
};
