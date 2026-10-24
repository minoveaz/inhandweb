import React, { useRef, useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useCart } from '../context/CartContext';
import { STATIC_ROUTES } from '../config/routes';
import { SeoHead } from '../components/organisms/SeoHead';
import {
  PaymentProvider,
  CheckoutCustomerData,
  GatewayRedirectResult,
  generateOrderReference,
  initiatePciCompliantCheckout,
} from '../utils/paymentGateway';
import {
  CheckoutSteps,
  TextField,
  Textarea,
  Button,
  Alert,
  Card,
  Badge,
  EmptyState,
} from '../components/ui';

export const Checkout: React.FC = () => {
  const { locale, t, formatPrice } = useLocale();
  const {
    items,
    subtotalEur,
    shippingEur,
    taxBaseEur,
    vatAmountEur,
    totalEur,
    clearCart,
  } = useCart();

  const [provider, setProvider] = useState<PaymentProvider>('stripe');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [completedGatewayResult, setCompletedGatewayResult] =
    useState<GatewayRedirectResult | null>(null);

  const [customer, setCustomer] = useState<CheckoutCustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    country: locale === 'es' ? 'España' : 'Spain',
    notes: '',
  });

  const redsysFormRef = useRef<HTMLFormElement | null>(null);

  const handleFieldChange = (
    field: keyof CheckoutCustomerData,
    value: string
  ) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsRedirecting(true);
    const orderId = generateOrderReference();

    const result = await initiatePciCompliantCheckout({
      orderId,
      locale,
      provider,
      customer,
      items: items.map((item) => ({
        productId: item.productId,
        sku: item.product.sku,
        name: item.product.name[locale],
        variantLabel: item.variant.name[locale],
        unitPriceEur: item.product.priceEur,
        quantity: item.quantity,
      })),
      subtotalEur,
      shippingEur,
      taxBaseEur,
      vatAmountEur,
      totalEur,
      createdAtIso: new Date().toISOString(),
    });

    if (result.mode === 'external_redirect' && result.redirectUrl) {
      window.location.href = result.redirectUrl;
      return;
    }

    if (result.mode === 'hosted_form_post' && result.redsysForm) {
      setCompletedGatewayResult(result);
      setTimeout(() => {
        redsysFormRef.current?.submit();
      }, 150);
      return;
    }

    setIsRedirecting(false);
    setCompletedGatewayResult(result);
    clearCart();
  };

  const routeMeta = STATIC_ROUTES.checkout;

  const checkoutStepsData = [
    {
      id: '1',
      label: locale === 'es' ? 'Datos y Entrega' : 'Shipping Details',
      state: completedGatewayResult ? ('completed' as const) : ('current' as const),
    },
    {
      id: '2',
      label: locale === 'es' ? 'Pasarela Bancaria' : 'Payment Gateway',
      state: completedGatewayResult
        ? ('completed' as const)
        : isRedirecting
        ? ('current' as const)
        : ('pending' as const),
    },
    {
      id: '3',
      label: locale === 'es' ? 'Confirmación' : 'Confirmation',
      state: completedGatewayResult ? ('current' as const) : ('pending' as const),
    },
  ];

  return (
    <>
      <SeoHead
        title={routeMeta.title[locale]}
        description={routeMeta.description[locale]}
        noindex={true}
      />

      <section className="ih-container py-12 sm:py-16">
        {/* Stepper (Slide 22) */}
        <div className="mb-10 pb-6 border-b border-ih-border">
          <CheckoutSteps steps={checkoutStepsData} />
        </div>

        {completedGatewayResult ? (
          <Card className="max-w-2xl mx-auto p-8 sm:p-12 space-y-6 text-center">
            <div className="w-16 h-16 rounded-pill bg-ih-success-bg text-ih-success-fg mx-auto flex items-center justify-center text-2xl font-bold">
              ✓
            </div>

            <Badge tone="success">
              {completedGatewayResult.securityAuditNote}
            </Badge>

            <h1 className="ds-heading font-bold">
              {t.checkout.successTitle}
            </h1>

            <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
              {t.checkout.successSubtitle}
            </p>

            <Card className="p-5 text-left space-y-2 text-xs sm:text-sm bg-ih-cream">
              <div className="flex justify-between">
                <span className="text-ih-muted">{t.checkout.orderReference}:</span>
                <strong className="font-mono text-ih-cobalt">
                  #{completedGatewayResult.orderId}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ih-muted">{t.checkout.gatewayUsed}:</span>
                <strong className="text-ih-cobalt uppercase">
                  {completedGatewayResult.provider === 'stripe'
                    ? 'Stripe Hosted Checkout'
                    : completedGatewayResult.provider === 'redsys_bizum'
                    ? 'Redsys TPV Virtual · Bizum'
                    : 'Redsys TPV Virtual · Tarjeta 3DS2'}
                </strong>
              </div>
              {completedGatewayResult.redsysForm && (
                <div className="pt-2 border-t border-ih-border">
                  <p className="text-[11px] font-mono text-ih-muted break-all">
                    Ds_SignatureVersion: {completedGatewayResult.redsysForm.Ds_SignatureVersion}
                  </p>
                </div>
              )}
            </Card>

            <div className="pt-4">
              <Button
                to={STATIC_ROUTES.shop.paths[locale]}
                variant="primary"
                size="lg"
                className="px-8"
              >
                <span>{t.checkout.backToStore}</span>
              </Button>
            </div>
          </Card>
        ) : items.length === 0 ? (
          <div className="max-w-lg mx-auto">
            <EmptyState
              icon="🛍"
              title={t.cart.emptyTitle}
              description={t.cart.emptyDesc}
              actionLabel={t.cart.exploreFirstDrop}
              onAction={() => window.location.assign(STATIC_ROUTES.shop.paths[locale])}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Page Header */}
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
                {t.checkout.eyebrow}
              </span>
              <h1 className="ds-heading font-bold">
                {t.checkout.title}
              </h1>
              <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
                {t.checkout.subtitle}
              </p>
            </div>

            {/* Alert Component (Slide 23: Semantic info/success alert with icon + text) */}
            <Alert tone="success" title={t.checkout.pciNoticeTitle}>
              {t.checkout.pciNoticeBody}
            </Alert>

            <form
              onSubmit={handleSubmitCheckout}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left 7 Columns: Customer Shipping & Gateway Selection */}
              <div className="lg:col-span-7 space-y-8">
                {/* Step 1: Shipping Address */}
                <Card className="p-6 sm:p-8 space-y-5">
                  <h2 className="text-xl font-display text-ih-cobalt border-b border-ih-border pb-3">
                    {t.checkout.step1Title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      label={t.checkout.firstName}
                      required
                      autoComplete="given-name"
                      value={customer.firstName}
                      onChange={(e) =>
                        handleFieldChange('firstName', e.target.value)
                      }
                    />
                    <TextField
                      label={t.checkout.lastName}
                      required
                      autoComplete="family-name"
                      value={customer.lastName}
                      onChange={(e) =>
                        handleFieldChange('lastName', e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      type="email"
                      label={t.checkout.email}
                      required
                      autoComplete="email"
                      value={customer.email}
                      onChange={(e) =>
                        handleFieldChange('email', e.target.value)
                      }
                    />
                    <TextField
                      type="tel"
                      label={t.checkout.phone}
                      required
                      autoComplete="tel"
                      placeholder="+34 600 000 000"
                      value={customer.phone}
                      onChange={(e) =>
                        handleFieldChange('phone', e.target.value)
                      }
                    />
                  </div>

                  <TextField
                    label={t.checkout.address}
                    required
                    autoComplete="street-address"
                    value={customer.address}
                    onChange={(e) =>
                      handleFieldChange('address', e.target.value)
                    }
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <TextField
                      label={t.checkout.postalCode}
                      required
                      autoComplete="postal-code"
                      value={customer.postalCode}
                      onChange={(e) =>
                        handleFieldChange('postalCode', e.target.value)
                      }
                    />
                    <TextField
                      label={t.checkout.city}
                      required
                      autoComplete="address-level2"
                      value={customer.city}
                      onChange={(e) =>
                        handleFieldChange('city', e.target.value)
                      }
                    />
                    <TextField
                      label={t.checkout.province}
                      required
                      autoComplete="address-level1"
                      value={customer.province}
                      onChange={(e) =>
                        handleFieldChange('province', e.target.value)
                      }
                    />
                    <TextField
                      label={t.checkout.country}
                      required
                      autoComplete="country-name"
                      value={customer.country}
                      onChange={(e) =>
                        handleFieldChange('country', e.target.value)
                      }
                    />
                  </div>

                  <Textarea
                    label={t.checkout.notes}
                    rows={2}
                    value={customer.notes}
                    onChange={(e) =>
                      handleFieldChange('notes', e.target.value)
                    }
                  />
                </Card>

                {/* Step 2: Payment Gateway Selector */}
                <Card as="section" className="p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl font-display text-ih-cobalt border-b border-ih-border pb-3">
                    {t.checkout.step2Title}
                  </h2>

                  {/* Option A: Stripe Hosted Checkout */}
                  <label
                    className={`block rounded-card border p-5 cursor-pointer transition duration-fast ${
                      provider === 'stripe'
                        ? 'border-ih-cobalt bg-ih-cream ring-2 ring-ih-focus'
                        : 'border-ih-border bg-ih-raised hover:border-ih-cobalt'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentProvider"
                        checked={provider === 'stripe'}
                        onChange={() => setProvider('stripe')}
                        className="mt-1 accent-ih-cobalt w-4 h-4"
                      />
                      <div className="space-y-1.5 flex-1">
                        <span className="text-sm font-bold text-ih-cobalt block">
                          {t.checkout.gatewayStripeTitle}
                        </span>
                        <p className="text-xs text-ih-muted leading-relaxed">
                          {t.checkout.gatewayStripeSubtitle}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {t.checkout.gatewayStripeBadges.map((b) => (
                            <Badge key={b} tone="neutral" showSymbol={false} className="text-[10px] py-0.5">
                              {b}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Option B: Redsys TPV Virtual */}
                  <label
                    className={`block rounded-card border p-5 cursor-pointer transition duration-fast ${
                      provider === 'redsys_card'
                        ? 'border-ih-cobalt bg-ih-cream ring-2 ring-ih-focus'
                        : 'border-ih-border bg-ih-raised hover:border-ih-cobalt'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentProvider"
                        checked={provider === 'redsys_card'}
                        onChange={() => setProvider('redsys_card')}
                        className="mt-1 accent-ih-cobalt w-4 h-4"
                      />
                      <div className="space-y-1.5 flex-1">
                        <span className="text-sm font-bold text-ih-cobalt block">
                          {t.checkout.gatewayRedsysTitle}
                        </span>
                        <p className="text-xs text-ih-muted leading-relaxed">
                          {t.checkout.gatewayRedsysSubtitle}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {t.checkout.gatewayRedsysBadges.map((b) => (
                            <Badge key={b} tone="neutral" showSymbol={false} className="text-[10px] py-0.5">
                              {b}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Option C: Redsys Bizum Direct */}
                  <label
                    className={`block rounded-card border p-5 cursor-pointer transition duration-fast ${
                      provider === 'redsys_bizum'
                        ? 'border-ih-cobalt bg-ih-cream ring-2 ring-ih-focus'
                        : 'border-ih-border bg-ih-raised hover:border-ih-cobalt'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentProvider"
                        checked={provider === 'redsys_bizum'}
                        onChange={() => setProvider('redsys_bizum')}
                        className="accent-ih-cobalt w-4 h-4"
                      />
                      <div className="flex items-center justify-between flex-1">
                        <span className="text-sm font-bold text-ih-cobalt">
                          {t.checkout.bizumToggleLabel}
                        </span>
                        <Badge tone="accent" showSymbol={false} className="!bg-ih-coral !text-ih-on-action !border-transparent">
                          Bizum España
                        </Badge>
                      </div>
                    </div>
                  </label>
                </Card>
              </div>

              {/* Right 5 Columns: OrderSummary */}
              <div className="lg:col-span-5">
                <Card className="p-6 sm:p-8 space-y-6 sticky top-28">
                  <h2 className="text-xl font-display text-ih-cobalt border-b border-ih-border pb-3">
                    {t.checkout.summaryTitle}
                  </h2>

                  <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.product.images.main}
                            alt={item.product.name[locale]}
                            className="w-14 h-16 rounded-control object-cover bg-ih-sand shrink-0 border border-ih-border"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-ih-text truncate">
                              {item.product.name[locale]}
                            </p>
                            <p className="text-xs text-ih-muted">
                              {item.variant.name[locale]} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-ih-text shrink-0">
                          {formatPrice(item.lineTotalEur)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial & Tax Breakdown */}
                  <div className="pt-4 border-t border-ih-border space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between text-ih-muted">
                      <span>{t.checkout.subtotal}</span>
                      <span className="font-semibold text-ih-text">
                        {formatPrice(subtotalEur)}
                      </span>
                    </div>
                    <div className="flex justify-between text-ih-muted">
                      <span>{t.checkout.shipping}</span>
                      <span className="font-semibold text-ih-cobalt">
                        {shippingEur === 0
                          ? t.checkout.free
                          : formatPrice(shippingEur)}
                      </span>
                    </div>
                    <div className="flex justify-between text-ih-muted text-xs pt-1 border-t border-ih-border">
                      <span>{t.checkout.taxBase}</span>
                      <span>{formatPrice(taxBaseEur)}</span>
                    </div>
                    <div className="flex justify-between text-ih-muted text-xs">
                      <span>{t.checkout.vat21}</span>
                      <span>{formatPrice(vatAmountEur)}</span>
                    </div>

                    <div className="flex justify-between text-base sm:text-lg font-bold text-ih-cobalt pt-3 border-t border-ih-border">
                      <span>{t.checkout.total}</span>
                      <span>{formatPrice(totalEur)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isRedirecting}
                    loadingText={t.checkout.redirectingTitle}
                    className="w-full"
                  >
                    {provider === 'stripe'
                      ? `${t.checkout.payWithStripe} · ${formatPrice(totalEur)}`
                      : provider === 'redsys_bizum'
                      ? `${t.checkout.payWithBizum} · ${formatPrice(totalEur)}`
                      : `${t.checkout.payWithRedsys} · ${formatPrice(totalEur)}`}
                  </Button>

                  {isRedirecting && (
                    <p className="ds-helper text-center font-medium">
                      {t.checkout.redirectingDesc}
                    </p>
                  )}
                </Card>
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
};
