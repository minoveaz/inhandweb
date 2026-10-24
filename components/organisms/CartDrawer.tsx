import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLocale } from '../../context/LocaleContext';
import { STATIC_ROUTES } from '../../config/routes';
import {
  Drawer,
  CartItem,
  Button,
  EmptyState,
  Progress,
  Badge,
} from '../ui';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotalEur,
    shippingEur,
    freeShippingRemainingEur,
    freeShippingProgressPct,
  } = useCart();
  const { locale, t, formatPrice } = useLocale();
  const navigate = useNavigate();

  const handleProceedCheckout = () => {
    closeCart();
    navigate(STATIC_ROUTES.checkout.paths[locale]);
  };

  const headerContent = (
    <div className="pt-2 border-t border-ih-border">
      <div className="text-xs font-medium text-ih-text mb-2">
        {freeShippingRemainingEur <= 0 ? (
          <Badge tone="success" showSymbol={true}>
            {t.cart.freeShippingUnlocked}
          </Badge>
        ) : (
          <span>
            {t.cart.freeShippingRemainingPrefix}{' '}
            <strong className="text-ih-cobalt font-bold">
              {formatPrice(freeShippingRemainingEur)}
            </strong>{' '}
            {t.cart.freeShippingRemainingSuffix}
          </span>
        )}
      </div>
      <Progress
        value={freeShippingProgressPct}
        label={t.cart.freeShippingUnlocked}
        aria-label="Progreso de envío gratuito"
      />
    </div>
  );

  const footerContent = items.length > 0 ? (
    <div className="space-y-4">
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-ih-muted">
          <span>{t.cart.subtotal}</span>
          <span className="font-bold text-ih-text">
            {formatPrice(subtotalEur)}
          </span>
        </div>
        <div className="flex justify-between text-ih-muted">
          <span>{t.cart.shipping}</span>
          <span className="font-bold text-ih-cobalt">
            {shippingEur === 0 ? t.cart.shippingFree : formatPrice(shippingEur)}
          </span>
        </div>
        <p className="ds-helper pt-1">
          {t.cart.taxIncludedNote}
        </p>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleProceedCheckout}
      >
        <span>{t.cart.proceedToCheckout}</span>
        <span className="text-ih-salmon">·</span>
        <span>{formatPrice(subtotalEur + shippingEur)}</span>
      </Button>

      <div className="flex items-center justify-center gap-2 ds-helper text-center">
        <img
          src="/icons/04_benefit/secure-payment.svg"
          alt=""
          className="w-4 h-4 shrink-0"
        />
        <span>{t.cart.pciSecurityBadge}</span>
      </div>
    </div>
  ) : undefined;

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title={t.cart.title}
      headerContent={headerContent}
      footer={footerContent}
    >
      <div className="space-y-4">
        {items.length === 0 ? (
          <EmptyState
            icon="🛍"
            title={t.cart.emptyTitle}
            description={t.cart.emptyDesc}
            actionLabel={t.cart.exploreFirstDrop}
            onAction={() => {
              closeCart();
              navigate(STATIC_ROUTES.shop.paths[locale]);
            }}
          />
        ) : (
          items.map((item) => (
            <CartItem
              key={item.key}
              title={item.product.name[locale]}
              variantLabel={item.variant.name[locale]}
              priceFormatted={formatPrice(item.lineTotalEur)}
              imageSrc={item.product.images.main}
              quantity={item.quantity}
              onQuantityChange={(next) => updateQuantity(item.key, next)}
              onRemove={() => removeItem(item.key)}
            />
          ))
        )}
      </div>
    </Drawer>
  );
};
