import { Product, ProductVariant } from './product';

export interface CartLineItem {
  key: string; // `${productId}:${variantId}`
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
  lineTotalEur: number;
}

export interface CartContextValue {
  items: CartLineItem[];
  isOpen: boolean;
  totalQuantity: number;
  subtotalEur: number;
  shippingEur: number;
  taxBaseEur: number;
  vatAmountEur: number;
  totalEur: number;
  freeShippingRemainingEur: number;
  freeShippingProgressPct: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (productId: string, variantId?: string, quantity?: number, openDrawer?: boolean) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, nextQuantity: number) => void;
  clearCart: () => void;
}
