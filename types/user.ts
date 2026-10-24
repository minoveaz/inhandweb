import { Locale } from './routes';

export interface UserAddress {
  id: string;
  label: string; // e.g. "Casa", "Oficina", "Iglesia / Comunidad"
  recipientName: string;
  phone: string;
  street: string;
  apartment?: string;
  postalCode: string;
  city: string;
  province: string;
  country: string; // ISO 2-letter, e.g. "ES"
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

export interface UserBillingTaxDetails {
  companyName?: string;
  taxId?: string; // NIF / CIF / NIE
  fiscalAddress?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferredLocale: Locale;
  newsletterSubscribed: boolean;
  createdAt: string;
  addresses: UserAddress[];
  billingDetails?: UserBillingTaxDetails;
  giftPreference?: string;
}

export type OrderStatus = 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  variantId: string;
  productName: Record<Locale, string>;
  variantName: Record<Locale, string>;
  productSlug: string;
  image: string;
  unitPriceEur: number;
  quantity: number;
  lineTotalEur: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "IH-2026-8942"
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotalEur: number;
  shippingEur: number;
  taxEur: number;
  totalEur: number;
  shippingAddress: UserAddress;
  carrierName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  invoicePdfUrl?: string;
  estimatedDelivery?: string;
  paymentMethod?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
