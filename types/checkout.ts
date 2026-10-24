import { Locale } from './routes';

export type PaymentProvider = 'stripe' | 'redsys_card' | 'redsys_bizum';

export interface CheckoutCustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
  notes?: string;
}

export interface CheckoutOrderItem {
  productId: string;
  sku: string;
  name: string;
  variantLabel: string;
  unitPriceEur: number;
  quantity: number;
}

export interface CheckoutPayload {
  orderId: string;
  locale: Locale;
  provider: PaymentProvider;
  customer: CheckoutCustomerData;
  items: CheckoutOrderItem[];
  subtotalEur: number;
  shippingEur: number;
  taxBaseEur: number;
  vatAmountEur: number;
  totalEur: number;
  createdAtIso: string;
}

export interface RedsysFormPayload {
  actionUrl: string;
  Ds_SignatureVersion: string;
  Ds_MerchantParameters: string;
  Ds_Signature: string;
}

export interface GatewayRedirectResult {
  orderId: string;
  provider: PaymentProvider;
  mode: 'external_redirect' | 'hosted_form_post';
  redirectUrl?: string;
  redsysForm?: RedsysFormPayload;
  securityAuditNote: string;
}
