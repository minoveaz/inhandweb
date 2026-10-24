import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  PRODUCTS,
  Product,
  ProductVariant,
  FREE_SHIPPING_THRESHOLD_EUR,
  STANDARD_SHIPPING_EUR,
  VAT_RATE_SPAIN,
} from '../config/products';

export interface CartItem {
  key: string; // `${productId}:${variantId}`
  productId: string;
  variantId: string;
  quantity: number;
}

export interface HydratedCartItem extends CartItem {
  product: Product;
  variant: ProductVariant;
  lineTotalEur: number;
}

interface CartContextValue {
  items: HydratedCartItem[];
  totalQuantity: number;
  subtotalEur: number;
  shippingEur: number;
  freeShippingRemainingEur: number;
  freeShippingProgressPct: number;
  taxBaseEur: number;
  vatAmountEur: number;
  totalEur: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, variantId?: string, quantity?: number, openDrawer?: boolean) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
}

const STORAGE_KEY = 'inhand_cart_v1';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rawItems, setRawItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [rawItems]);

  const items: HydratedCartItem[] = useMemo(() => {
    return rawItems
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null;
        const variant =
          product.variants.find((v) => v.id === item.variantId) || product.variants[0];
        return {
          ...item,
          product,
          variant,
          lineTotalEur: Number((product.priceEur * item.quantity).toFixed(2)),
        };
      })
      .filter((x): x is HydratedCartItem => x !== null);
  }, [rawItems]);

  const totalQuantity = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const subtotalEur = useMemo(
    () => Number(items.reduce((acc, item) => acc + item.lineTotalEur, 0).toFixed(2)),
    [items]
  );

  const shippingEur = useMemo(() => {
    if (subtotalEur === 0) return 0;
    return subtotalEur >= FREE_SHIPPING_THRESHOLD_EUR ? 0 : STANDARD_SHIPPING_EUR;
  }, [subtotalEur]);

  const freeShippingRemainingEur = useMemo(() => {
    return Math.max(0, Number((FREE_SHIPPING_THRESHOLD_EUR - subtotalEur).toFixed(2)));
  }, [subtotalEur]);

  const freeShippingProgressPct = useMemo(() => {
    if (subtotalEur <= 0) return 0;
    return Math.min(100, Math.round((subtotalEur / FREE_SHIPPING_THRESHOLD_EUR) * 100));
  }, [subtotalEur]);

  const totalEur = useMemo(
    () => Number((subtotalEur + shippingEur).toFixed(2)),
    [subtotalEur, shippingEur]
  );

  const taxBaseEur = useMemo(
    () => Number((totalEur / (1 + VAT_RATE_SPAIN)).toFixed(2)),
    [totalEur]
  );

  const vatAmountEur = useMemo(
    () => Number((totalEur - taxBaseEur).toFixed(2)),
    [totalEur, taxBaseEur]
  );

  const addItem = (
    productId: string,
    variantId?: string,
    quantity = 1,
    openDrawer = true
  ) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const resolvedVariantId = variantId || product.variants[0].id;
    const key = `${productId}:${resolvedVariantId}`;

    setRawItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { key, productId, variantId: resolvedVariantId, quantity }];
    });

    if (openDrawer) {
      setIsOpen(true);
    }
  };

  const removeItem = (key: string) => {
    setRawItems((prev) => prev.filter((item) => item.key !== key));
  };

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(key);
      return;
    }
    setRawItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setRawItems([]);
  };

  const value: CartContextValue = {
    items,
    totalQuantity,
    subtotalEur,
    shippingEur,
    freeShippingRemainingEur,
    freeShippingProgressPct,
    taxBaseEur,
    vatAmountEur,
    totalEur,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
