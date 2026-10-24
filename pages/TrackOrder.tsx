import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { useAuth } from '../context/AuthContext';
import { STATIC_ROUTES } from '../config/routes';
import { Button, Card, TextField, Badge } from '../components/ui';
import { Order, OrderStatus } from '../types';

export const TrackOrder: React.FC = () => {
  const { locale, t, formatPrice } = useLocale();
  const { lookupGuestOrder } = useAuth();
  const [searchParams] = useSearchParams();

  const [orderNumber, setOrderNumber] = useState(searchParams.get('num') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const registerPath = STATIC_ROUTES.register.paths[locale];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setSearched(true);

    setTimeout(() => {
      const result = lookupGuestOrder(email, orderNumber);
      setFoundOrder(result);
      setLoading(false);
    }, 400);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'shipped':
        return <Badge tone="accent">{t.account.orders.statusShipped}</Badge>;
      case 'delivered':
        return <Badge tone="success">{t.account.orders.statusDelivered}</Badge>;
      case 'preparing':
        return <Badge tone="info">{t.account.orders.statusPreparing}</Badge>;
      case 'cancelled':
        return <Badge tone="error">{t.account.orders.statusCancelled}</Badge>;
      default:
        return <Badge tone="neutral">{t.account.orders.statusConfirmed}</Badge>;
    }
  };

  const steps = [
    { key: 'confirmed', label: t.account.orders.statusConfirmed },
    { key: 'preparing', label: t.account.orders.statusPreparing },
    { key: 'shipped', label: t.account.orders.statusShipped },
    { key: 'delivered', label: t.account.orders.statusDelivered },
  ];

  const getStepState = (status: OrderStatus, stepKey: string) => {
    const orderRanks: Record<OrderStatus, number> = {
      confirmed: 0,
      preparing: 1,
      shipped: 2,
      delivered: 3,
      cancelled: -1,
    };
    const stepRank: Record<string, number> = {
      confirmed: 0,
      preparing: 1,
      shipped: 2,
      delivered: 3,
    };

    const currentRank = orderRanks[status] ?? 0;
    const thisStepRank = stepRank[stepKey];

    if (currentRank > thisStepRank) return 'completed';
    if (currentRank === thisStepRank) return 'current';
    return 'upcoming';
  };

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-ih-cream">
      <div className="ih-container max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-ih-cobalt">
            {locale === 'es' ? 'SEGUIMIENTO EN DIRECTO' : 'LIVE TRACKING'}
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-display font-light text-ih-cobalt">
            {t.auth.trackOrderHeading}
          </h1>
          <p className="mt-3 text-sm text-ih-muted max-w-md mx-auto leading-relaxed">
            {t.auth.trackOrderDesc}
          </p>
        </div>

        {/* Lookup form */}
        <Card className="p-6 sm:p-8 shadow-card border-ih-border bg-ih-raised">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label={locale === 'es' ? 'Número de pedido' : 'Order Number'}
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="IH-2026-8942"
                description={locale === 'es' ? 'Ej: IH-2026-8942' : 'E.g. IH-2026-8942'}
              />
              <TextField
                label={t.auth.emailLabel}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com (opcional)"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full !h-11 text-xs font-bold uppercase tracking-wider"
            >
              {t.auth.trackOrderButton}
            </Button>
          </form>
        </Card>

        {/* Result */}
        {searched && !loading && (
          <div className="mt-8 space-y-6">
            {foundOrder ? (
              <Card className="p-6 sm:p-8 shadow-card border-ih-border bg-ih-raised space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ih-border">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-ih-muted">
                      {t.account.orders.orderNumber}
                    </span>
                    <h2 className="text-2xl font-display font-light text-ih-cobalt">
                      {foundOrder.orderNumber}
                    </h2>
                    <p className="text-xs text-ih-muted mt-1">
                      {new Date(foundOrder.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>{getStatusBadge(foundOrder.status)}</div>
                </div>

                {/* Stepper Timeline */}
                <div className="py-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {steps.map((st, i) => {
                      const state = getStepState(foundOrder.status, st.key);
                      return (
                        <div key={st.key} className="flex flex-col items-center text-center">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition duration-fast ${
                              state === 'completed'
                                ? 'bg-ih-cobalt text-ih-on-action'
                                : state === 'current'
                                ? 'bg-ih-coral text-ih-on-action ring-4 ring-ih-coral/20'
                                : 'bg-ih-sand text-ih-muted border border-ih-border'
                            }`}
                          >
                            {state === 'completed' ? '✓' : i + 1}
                          </div>
                          <span
                            className={`text-xs ${
                              state === 'current'
                                ? 'font-bold text-ih-cobalt'
                                : state === 'completed'
                                ? 'font-medium text-ih-cobalt'
                                : 'text-ih-muted'
                            }`}
                          >
                            {st.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Carrier Details */}
                {foundOrder.carrierName && (
                  <div className="p-4 rounded-card bg-ih-sand/40 border border-ih-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-ih-cobalt">
                        {foundOrder.carrierName} · {foundOrder.trackingNumber}
                      </p>
                      <p className="text-ih-muted">
                        {locale === 'es'
                          ? 'En tránsito para entrega estimada en 24/48h laborables'
                          : 'In transit for estimated delivery within 24/48h'}
                      </p>
                    </div>
                    {foundOrder.trackingUrl && (
                      <a
                        href={foundOrder.trackingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ih-coral font-bold hover:underline shrink-0"
                      >
                        {t.account.orders.trackShipment} →
                      </a>
                    )}
                  </div>
                )}

                {/* Items */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ih-cobalt">
                    {locale === 'es' ? 'Artículos del pedido' : 'Order Items'}
                  </h3>
                  <div className="divide-y divide-ih-border">
                    {foundOrder.items.map((item) => (
                      <div key={`${item.productId}-${item.variantId}`} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.productName[locale]}
                            className="w-12 h-12 object-cover rounded-control border border-ih-border bg-ih-sand/30"
                          />
                          <div>
                            <p className="text-sm font-medium text-ih-cobalt">
                              {item.productName[locale]}
                            </p>
                            <p className="text-xs text-ih-muted">
                              {locale === 'es' ? 'Cantidad' : 'Qty'}: {item.quantity} · {item.variantName[locale]}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-ih-cobalt">
                          {formatPrice(item.unitPriceEur * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address & Summary */}
                <div className="pt-4 border-t border-ih-border flex flex-col sm:flex-row justify-between gap-6 text-xs text-ih-muted">
                  <div>
                    <p className="font-bold text-ih-cobalt uppercase tracking-wider mb-1">
                      {t.account.orders.deliveryTo}
                    </p>
                    <p>{foundOrder.shippingAddress.recipientName}</p>
                    <p>{foundOrder.shippingAddress.street}</p>
                    <p>
                      {foundOrder.shippingAddress.postalCode} {foundOrder.shippingAddress.city},{' '}
                      {foundOrder.shippingAddress.country}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-bold text-ih-cobalt uppercase tracking-wider mb-1">
                      {t.account.orders.total}
                    </p>
                    <p className="text-lg font-bold text-ih-cobalt">
                      {formatPrice(foundOrder.totalEur)}
                    </p>
                    <p className="text-[11px] text-ih-muted">
                      {locale === 'es' ? 'IVA y gastos de envío calculados' : 'VAT and shipping computed'}
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center shadow-card border-ih-border bg-ih-raised space-y-4">
                <div className="text-3xl text-ih-coral">🔍</div>
                <h3 className="text-lg font-bold text-ih-cobalt">
                  {locale === 'es' ? 'No hemos localizado ese pedido' : 'Order not found'}
                </h3>
                <p className="text-xs text-ih-muted max-w-md mx-auto leading-relaxed">
                  {locale === 'es'
                    ? 'Comprueba que el número esté bien escrito (ej: IH-2026-8942). Si necesitas asistencia, contacta con nosotros indicando tu correo de compra.'
                    : 'Please check the order number format (e.g. IH-2026-8942). If you need help, reach out with your checkout email.'}
                </p>
              </Card>
            )}
          </div>
        )}

        {/* Call to Register */}
        <div className="mt-8 text-center text-xs text-ih-muted">
          <p>
            {locale === 'es'
              ? '¿Quieres tener todos tus pedidos y facturas guardados en un solo lugar?'
              : 'Want all your orders and invoices in one place?'}{' '}
            <Link to={registerPath} className="font-bold text-ih-cobalt hover:text-ih-coral underline">
              {locale === 'es' ? 'Crear una cuenta INHAND' : 'Create an INHAND account'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
