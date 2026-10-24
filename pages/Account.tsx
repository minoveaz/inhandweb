import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { STATIC_ROUTES } from '../config/routes';
import { PRODUCTS } from '../config/products';
import { UserAddress, Order, OrderStatus } from '../types';
import {
  Button,
  Card,
  Badge,
  Avatar,
  TextField,
  Checkbox,
  Modal,
  Alert,
} from '../components/ui';

export const Account: React.FC = () => {
  const { locale, t, formatPrice } = useLocale();
  const {
    user,
    isAuthenticated,
    orders,
    wishlist,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultShippingAddress,
    toggleWishlist,
  } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab state: overview | orders | addresses | wishlist | profile
  const tabParam = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'wishlist' | 'profile'>(
    (tabParam as any) || 'overview'
  );

  // Address Modal state
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    label: '',
    recipientName: '',
    phone: '',
    street: '',
    apartment: '',
    postalCode: '',
    city: '',
    province: '',
    country: 'ES',
    isDefaultShipping: false,
    isDefaultBilling: false,
  });

  // Selected Order for detail modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Profile edit state
  const [profileFirstName, setProfileFirstName] = useState('');
  const [profileLastName, setProfileLastName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileLang, setProfileLang] = useState<'es' | 'en'>('es');
  const [taxCompany, setTaxCompany] = useState('');
  const [taxId, setTaxId] = useState('');
  const [taxFiscalAddress, setTaxFiscalAddress] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Sync user state into forms
  useEffect(() => {
    if (user) {
      setProfileFirstName(user.firstName || '');
      setProfileLastName(user.lastName || '');
      setProfilePhone(user.phone || '');
      setProfileLang(user.preferredLocale || 'es');
      if (user.billingDetails) {
        setTaxCompany(user.billingDetails.companyName || '');
        setTaxId(user.billingDetails.taxId || '');
        setTaxFiscalAddress(user.billingDetails.fiscalAddress || '');
      }
    }
  }, [user]);

  // Auth Guard
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(STATIC_ROUTES.login.paths[locale], {
        replace: true,
        state: { from: { pathname: STATIC_ROUTES.account.paths[locale] } },
      });
    }
  }, [isAuthenticated, navigate, locale]);

  // Sync tab with URL search params
  const handleTabChange = (newTab: 'overview' | 'orders' | 'addresses' | 'wishlist' | 'profile') => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  if (!user) {
    return null;
  }

  // Address Modal handlers
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      label: locale === 'es' ? 'Casa' : 'Home',
      recipientName: `${user.firstName} ${user.lastName}`.trim(),
      phone: user.phone || '',
      street: '',
      apartment: '',
      postalCode: '',
      city: '',
      province: '',
      country: 'ES',
      isDefaultShipping: user.addresses.length === 0,
      isDefaultBilling: user.addresses.length === 0,
    });
    setAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr: UserAddress) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      label: addr.label,
      recipientName: addr.recipientName,
      phone: addr.phone,
      street: addr.street,
      apartment: addr.apartment || '',
      postalCode: addr.postalCode,
      city: addr.city,
      province: addr.province,
      country: addr.country,
      isDefaultShipping: Boolean(addr.isDefaultShipping),
      isDefaultBilling: Boolean(addr.isDefaultBilling),
    });
    setAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.recipientName || !addressForm.street || !addressForm.city || !addressForm.postalCode) {
      return;
    }

    if (editingAddressId) {
      updateAddress(editingAddressId, addressForm);
    } else {
      addAddress(addressForm);
    }
    setAddressModalOpen(false);
  };

  // Profile save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      firstName: profileFirstName,
      lastName: profileLastName,
      phone: profilePhone,
      preferredLocale: profileLang,
      billingDetails: {
        companyName: taxCompany,
        taxId: taxId,
        fiscalAddress: taxFiscalAddress,
      },
    });
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Change password simulation
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length >= 8 && newPassword === confirmPassword) {
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(false), 3500);
    }
  };

  // GDPR export
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `inhand-user-data-${user.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Wishlist products
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Latest active order for overview
  const latestOrder = orders[0];

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

  return (
    <div className="py-10 sm:py-14 md:py-16 bg-ih-cream">
      <div className="ih-container max-w-6xl mx-auto">
        {/* Account Header Hero */}
        <div className="bg-ih-raised border border-ih-border rounded-dialog p-6 sm:p-8 mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <Avatar name={`${user.firstName} ${user.lastName}`} size="lg" />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-display font-light text-ih-cobalt">
                  {user.firstName} {user.lastName}
                </h1>
                <Badge tone="accent" showSymbol={false}>
                  {t.account.memberBadge}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-ih-muted mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to={STATIC_ROUTES.shop.paths[locale]}
              className="flex-1 md:flex-initial"
            >
              <Button variant="secondary" size="sm" className="w-full text-xs font-bold uppercase tracking-wider">
                {t.account.orders.exploreShop}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-xs font-bold uppercase tracking-wider text-ih-muted hover:text-ih-coral"
            >
              {t.nav.signOut}
            </Button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-ih-border">
          <button
            type="button"
            onClick={() => handleTabChange('overview')}
            className={`min-h-control-sm px-4 py-2 rounded-pill text-xs font-bold uppercase tracking-wider transition duration-fast shrink-0 ${
              activeTab === 'overview'
                ? 'bg-ih-cobalt text-ih-on-action shadow-sm'
                : 'bg-ih-raised text-ih-muted hover:text-ih-cobalt border border-ih-border'
            }`}
          >
            {t.account.tabs.overview}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('orders')}
            className={`min-h-control-sm px-4 py-2 rounded-pill text-xs font-bold uppercase tracking-wider transition duration-fast shrink-0 flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-ih-cobalt text-ih-on-action shadow-sm'
                : 'bg-ih-raised text-ih-muted hover:text-ih-cobalt border border-ih-border'
            }`}
          >
            <span>{t.account.tabs.orders}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-ih-sand/80 text-ih-cobalt font-mono">
              {orders.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('addresses')}
            className={`min-h-control-sm px-4 py-2 rounded-pill text-xs font-bold uppercase tracking-wider transition duration-fast shrink-0 ${
              activeTab === 'addresses'
                ? 'bg-ih-cobalt text-ih-on-action shadow-sm'
                : 'bg-ih-raised text-ih-muted hover:text-ih-cobalt border border-ih-border'
            }`}
          >
            {t.account.tabs.addresses}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('wishlist')}
            className={`min-h-control-sm px-4 py-2 rounded-pill text-xs font-bold uppercase tracking-wider transition duration-fast shrink-0 flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'bg-ih-cobalt text-ih-on-action shadow-sm'
                : 'bg-ih-raised text-ih-muted hover:text-ih-cobalt border border-ih-border'
            }`}
          >
            <span>{t.account.tabs.wishlist}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-ih-sand/80 text-ih-cobalt font-mono">
              {wishlist.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('profile')}
            className={`min-h-control-sm px-4 py-2 rounded-pill text-xs font-bold uppercase tracking-wider transition duration-fast shrink-0 ${
              activeTab === 'profile'
                ? 'bg-ih-cobalt text-ih-on-action shadow-sm'
                : 'bg-ih-raised text-ih-muted hover:text-ih-cobalt border border-ih-border'
            }`}
          >
            {t.account.tabs.profile}
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Active order highlight banner */}
            {latestOrder && (
              <Card className="p-6 sm:p-8 bg-ih-raised border-ih-border shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ih-border">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ih-coral">
                      {latestOrder.status === 'shipped'
                        ? locale === 'es'
                          ? '📦 PAQUETE EN CAMINO'
                          : '📦 PACKAGE ON THE WAY'
                        : t.account.overview.recentOrderTitle}
                    </span>
                    <h2 className="text-xl font-display font-light text-ih-cobalt mt-1">
                      {t.account.orders.orderNumber} {latestOrder.orderNumber}
                    </h2>
                  </div>
                  <div>{getStatusBadge(latestOrder.status)}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-ih-border text-xs">
                  <div>
                    <p className="text-ih-muted uppercase tracking-wider font-semibold mb-1">
                      {locale === 'es' ? 'Transportista' : 'Carrier'}
                    </p>
                    <p className="font-bold text-ih-cobalt">{latestOrder.carrierName || 'Correos Express'}</p>
                    {latestOrder.trackingNumber && (
                      <p className="text-ih-muted font-mono mt-0.5">{latestOrder.trackingNumber}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-ih-muted uppercase tracking-wider font-semibold mb-1">
                      {t.account.orders.deliveryTo}
                    </p>
                    <p className="font-bold text-ih-cobalt">{latestOrder.shippingAddress.street}</p>
                    <p className="text-ih-muted">
                      {latestOrder.shippingAddress.postalCode} {latestOrder.shippingAddress.city}
                    </p>
                  </div>
                  <div>
                    <p className="text-ih-muted uppercase tracking-wider font-semibold mb-1">
                      {t.account.orders.total}
                    </p>
                    <p className="text-lg font-bold text-ih-cobalt">{formatPrice(latestOrder.totalEur)}</p>
                    <p className="text-ih-muted">
                      {latestOrder.items.length} {latestOrder.items.length === 1 ? 'artículo' : 'artículos'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {latestOrder.items.slice(0, 3).map((item) => (
                      <img
                        key={`${item.productId}-${item.variantId}`}
                        src={item.image}
                        alt={item.productName[locale]}
                        className="w-11 h-11 object-cover rounded-control border border-ih-border bg-ih-sand/40"
                        title={item.productName[locale]}
                      />
                    ))}
                    {latestOrder.items.length > 3 && (
                      <span className="text-xs text-ih-muted font-bold">
                        +{latestOrder.items.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setSelectedOrder(latestOrder)}
                      className="flex-1 sm:flex-initial text-xs uppercase tracking-wider !h-9"
                    >
                      {t.account.orders.viewDetails}
                    </Button>
                    <button
                      type="button"
                      onClick={() => handleTabChange('orders')}
                      className="text-xs text-ih-cobalt font-bold hover:text-ih-coral transition duration-fast"
                    >
                      {t.account.overview.viewAllOrders} →
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Card
                className="p-6 bg-ih-raised border-ih-border cursor-pointer hover:border-ih-cobalt/40 transition duration-fast"
                onClick={() => handleTabChange('orders')}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-ih-muted">
                  {t.account.tabs.orders}
                </span>
                <p className="text-3xl font-display font-light text-ih-cobalt mt-2">
                  {orders.length}
                </p>
                <p className="text-xs text-ih-muted mt-1">
                  {t.account.overview.viewAllOrders} →
                </p>
              </Card>

              <Card
                className="p-6 bg-ih-raised border-ih-border cursor-pointer hover:border-ih-cobalt/40 transition duration-fast"
                onClick={() => handleTabChange('addresses')}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-ih-muted">
                  {t.account.tabs.addresses}
                </span>
                <p className="text-3xl font-display font-light text-ih-cobalt mt-2">
                  {user.addresses.length}
                </p>
                <p className="text-xs text-ih-muted mt-1">
                  {t.account.overview.manageAddresses} →
                </p>
              </Card>

              <Card
                className="p-6 bg-ih-raised border-ih-border cursor-pointer hover:border-ih-cobalt/40 transition duration-fast"
                onClick={() => handleTabChange('wishlist')}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-ih-muted">
                  {t.account.tabs.wishlist}
                </span>
                <p className="text-3xl font-display font-light text-ih-cobalt mt-2">
                  {wishlist.length}
                </p>
                <p className="text-xs text-ih-muted mt-1">
                  {t.account.overview.viewWishlist} →
                </p>
              </Card>
            </div>

            {/* Default Address Quick Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-ih-raised border-ih-border space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-ih-cobalt uppercase tracking-wider">
                    {t.account.overview.savedAddressesTitle}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleTabChange('addresses')}
                    className="text-xs text-ih-coral font-bold hover:underline"
                  >
                    {t.account.addresses.edit}
                  </button>
                </div>
                {user.addresses[0] ? (
                  <div className="text-xs text-ih-muted leading-relaxed space-y-0.5">
                    <p className="font-bold text-ih-cobalt">{user.addresses[0].recipientName}</p>
                    <p>{user.addresses[0].street}</p>
                    {user.addresses[0].apartment && <p>{user.addresses[0].apartment}</p>}
                    <p>
                      {user.addresses[0].postalCode} {user.addresses[0].city},{' '}
                      {user.addresses[0].country}
                    </p>
                    <p>{user.addresses[0].phone}</p>
                  </div>
                ) : (
                  <p className="text-xs text-ih-muted">
                    {t.account.addresses.noAddresses}
                  </p>
                )}
              </Card>

              <Card className="p-6 bg-ih-raised border-ih-border space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-ih-cobalt uppercase tracking-wider">
                    {locale === 'es' ? 'Datos de facturación' : 'Billing Information'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleTabChange('profile')}
                    className="text-xs text-ih-coral font-bold hover:underline"
                  >
                    {t.account.addresses.edit}
                  </button>
                </div>
                {user.billingDetails?.taxId ? (
                  <div className="text-xs text-ih-muted leading-relaxed space-y-0.5">
                    <p className="font-bold text-ih-cobalt">{user.billingDetails.companyName}</p>
                    <p>NIF/CIF: {user.billingDetails.taxId}</p>
                    <p>{user.billingDetails.fiscalAddress}</p>
                  </div>
                ) : (
                  <p className="text-xs text-ih-muted">
                    {locale === 'es'
                      ? 'No has especificado NIF para facturas con empresa.'
                      : 'No tax ID registered for corporate invoices.'}
                  </p>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-light text-ih-cobalt">
                  {t.account.orders.title}
                </h2>
                <p className="text-xs text-ih-muted mt-0.5">
                  {t.account.orders.subtitle}
                </p>
              </div>
              <span className="text-xs text-ih-muted">
                {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
              </span>
            </div>

            {orders.length === 0 ? (
              <Card className="p-12 text-center bg-ih-raised border-ih-border">
                <p className="text-sm text-ih-muted mb-4">{t.account.orders.emptyDesc}</p>
                <Link to={STATIC_ROUTES.shop.paths[locale]}>
                  <Button variant="primary" size="sm" className="text-xs font-bold uppercase tracking-wider">
                    {t.account.orders.exploreShop}
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6 bg-ih-raised border-ih-border shadow-card space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-ih-border">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-base text-ih-cobalt font-display">
                            {order.orderNumber}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-ih-muted mt-1">
                          {new Date(order.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-base font-bold text-ih-cobalt">
                          {formatPrice(order.totalEur)}
                        </span>
                        <p className="text-[11px] text-ih-muted">
                          {locale === 'es' ? 'Pago verificado' : 'Payment verified'}
                        </p>
                      </div>
                    </div>

                    {/* Order items preview */}
                    <div className="divide-y divide-ih-border/60">
                      {order.items.map((item) => (
                        <div key={`${item.productId}-${item.variantId}`} className="py-2.5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.productName[locale]}
                              className="w-12 h-12 object-cover rounded-control border border-ih-border bg-ih-sand/40"
                            />
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-ih-cobalt">
                                {item.productName[locale]}
                              </p>
                              <p className="text-xs text-ih-muted">
                                {locale === 'es' ? 'Cantidad' : 'Qty'}: {item.quantity} · {item.variantName[locale]}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-ih-cobalt">
                            {formatPrice(item.unitPriceEur * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-ih-border flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-ih-muted">
                        {order.trackingNumber && (
                          <span>
                            {t.account.orders.trackShipment}:{' '}
                            <strong className="text-ih-cobalt">{order.trackingNumber}</strong>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                          className="text-xs !h-8 px-3"
                        >
                          {t.account.orders.viewDetails}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            order.items.forEach((it) => addItem(it.productId, it.variantId, it.quantity));
                            navigate(STATIC_ROUTES.checkout.paths[locale]);
                          }}
                          className="text-xs !h-8 px-3 text-ih-cobalt border border-ih-border"
                        >
                          {t.account.orders.repeatOrder}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-light text-ih-cobalt">
                  {t.account.addresses.title}
                </h2>
                <p className="text-xs text-ih-muted mt-1">
                  {t.account.addresses.subtitle}
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenAddAddress}
                className="text-xs font-bold uppercase tracking-wider"
              >
                + {t.account.addresses.addNew}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {user.addresses.map((addr) => (
                <Card key={addr.id} className="p-6 bg-ih-raised border-ih-border shadow-card flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-bold text-ih-cobalt">{addr.label}</span>
                      <div className="flex items-center gap-1.5">
                        {addr.isDefaultShipping && (
                          <Badge tone="accent" showSymbol={false}>
                            {t.account.addresses.defaultShipping}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-ih-muted leading-relaxed space-y-0.5">
                      <p className="font-semibold text-ih-cobalt">{addr.recipientName}</p>
                      <p>{addr.street}</p>
                      {addr.apartment && <p>{addr.apartment}</p>}
                      <p>
                        {addr.postalCode} {addr.city}, {addr.province} ({addr.country})
                      </p>
                      <p className="text-ih-muted/80">{addr.phone}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-ih-border flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditAddress(addr)}
                        className="text-ih-cobalt font-bold hover:text-ih-coral transition duration-fast"
                      >
                        {t.account.addresses.edit}
                      </button>
                      <span className="text-ih-border">•</span>
                      <button
                        type="button"
                        onClick={() => deleteAddress(addr.id)}
                        className="text-ih-muted hover:text-ih-coral transition duration-fast"
                      >
                        {t.account.addresses.delete}
                      </button>
                    </div>

                    {!addr.isDefaultShipping && (
                      <button
                        type="button"
                        onClick={() => setDefaultShippingAddress(addr.id)}
                        className="text-ih-muted hover:text-ih-cobalt underline"
                      >
                        {t.account.addresses.makeDefaultShipping}
                      </button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-light text-ih-cobalt">
                  {t.account.wishlist.title}
                </h2>
                <p className="text-xs text-ih-muted mt-0.5">
                  {t.account.wishlist.subtitle}
                </p>
              </div>
              <span className="text-xs text-ih-muted">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'pieza' : 'piezas'}
              </span>
            </div>

            {wishlistProducts.length === 0 ? (
              <Card className="p-12 text-center bg-ih-raised border-ih-border space-y-4">
                <div className="text-3xl text-ih-coral">♡</div>
                <h3 className="text-lg font-bold text-ih-cobalt">{t.account.wishlist.emptyTitle}</h3>
                <p className="text-xs text-ih-muted max-w-sm mx-auto">
                  {t.account.wishlist.emptyDesc}
                </p>
                <div className="pt-2">
                  <Link to={STATIC_ROUTES.shop.paths[locale]}>
                    <Button variant="primary" size="sm" className="text-xs font-bold uppercase tracking-wider">
                      {t.account.wishlist.exploreShop}
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((prod) => (
                  <Card key={prod.id} className="p-4 bg-ih-raised border-ih-border shadow-card flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[4/5] rounded-control overflow-hidden bg-ih-sand/40 mb-3 border border-ih-border">
                        <img
                          src={prod.images.main}
                          alt={prod.name[locale]}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => toggleWishlist(prod.id)}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-ih-raised/90 border border-ih-border flex items-center justify-center text-ih-coral shadow-sm hover:scale-105 transition"
                          title="Quitar de favoritos"
                        >
                          ♥
                        </button>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-ih-muted">
                        {prod.categorySlug}
                      </span>
                      <h3 className="text-sm font-bold text-ih-cobalt line-clamp-1 mt-0.5">
                        {prod.name[locale]}
                      </h3>
                      <p className="text-xs font-bold text-ih-cobalt mt-1">
                        {formatPrice(prod.priceEur)}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-ih-border flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => addItem(prod.id, prod.variants[0]?.id, 1, true)}
                        className="flex-1 text-xs !h-9"
                      >
                        {t.account.wishlist.addToCart}
                      </Button>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(prod.id)}
                        className="text-xs text-ih-muted hover:text-ih-coral underline px-2 py-1"
                      >
                        {locale === 'es' ? 'Quitar' : 'Remove'}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROFILE & SECURITY */}
        {activeTab === 'profile' && (
          <div className="space-y-8 max-w-3xl">
            {profileSuccess && (
              <Alert tone="success">
                {t.account.profile.savedSuccess}
              </Alert>
            )}

            {/* Basic Profile Form */}
            <Card className="p-6 sm:p-8 bg-ih-raised border-ih-border shadow-card space-y-6">
              <h2 className="text-xl font-display font-light text-ih-cobalt">
                {t.account.profile.personalInfo}
              </h2>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    label={t.account.profile.firstName}
                    value={profileFirstName}
                    onChange={(e) => setProfileFirstName(e.target.value)}
                    required
                  />
                  <TextField
                    label={t.account.profile.lastName}
                    value={profileLastName}
                    onChange={(e) => setProfileLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    label={t.account.profile.email}
                    value={user.email}
                    disabled
                    description={locale === 'es' ? 'El correo no puede modificarse directamente por motivos de seguridad.' : 'Email is tied to your account identity.'}
                  />
                  <TextField
                    label={t.account.profile.phone}
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div className="pt-2">
                  <label className="text-xs font-semibold text-ih-cobalt block mb-1.5">
                    {t.account.profile.preferredLanguage}
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-ih-cobalt cursor-pointer">
                      <input
                        type="radio"
                        name="lang"
                        checked={profileLang === 'es'}
                        onChange={() => setProfileLang('es')}
                        className="text-ih-cobalt"
                      />
                      Español (ES)
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-ih-cobalt cursor-pointer">
                      <input
                        type="radio"
                        name="lang"
                        checked={profileLang === 'en'}
                        onChange={() => setProfileLang('en')}
                        className="text-ih-cobalt"
                      />
                      English (EN)
                    </label>
                  </div>
                </div>

                {/* Billing details */}
                <div className="pt-6 border-t border-ih-border space-y-4">
                  <h3 className="text-sm font-bold text-ih-cobalt uppercase tracking-wider">
                    {locale === 'es' ? 'Datos Fiscales para Facturación (Opcional)' : 'Tax Details for Invoicing (Optional)'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      label={locale === 'es' ? 'Razón Social / Empresa' : 'Company Name'}
                      value={taxCompany}
                      onChange={(e) => setTaxCompany(e.target.value)}
                      placeholder="Marta Soler Estudio S.L."
                    />
                    <TextField
                      label={locale === 'es' ? 'CIF / NIF' : 'VAT / Tax ID'}
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      placeholder="B-12345678"
                    />
                  </div>
                  <TextField
                    label={locale === 'es' ? 'Dirección Fiscal' : 'Fiscal Address'}
                    value={taxFiscalAddress}
                    onChange={(e) => setTaxFiscalAddress(e.target.value)}
                    placeholder="Calle de Serrano 45, 28001 Madrid"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="primary" size="sm" className="text-xs font-bold uppercase tracking-wider">
                    {t.account.profile.saveProfile}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Change Password Card */}
            <Card className="p-6 sm:p-8 bg-ih-raised border-ih-border shadow-card space-y-5">
              <h2 className="text-xl font-display font-light text-ih-cobalt">
                {t.account.profile.securityTitle}
              </h2>

              {passwordSuccess && (
                <Alert tone="success">
                  {t.account.profile.passwordUpdated}
                </Alert>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-ih-cobalt">
                    {t.account.profile.currentPassword}
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full min-h-control-md rounded-control border border-ih-border bg-ih-surface px-3.5 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-ih-cobalt">
                    {t.account.profile.newPassword}
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Mínimo 8 caracteres"
                    className="w-full min-h-control-md rounded-control border border-ih-border bg-ih-surface px-3.5 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-ih-cobalt">
                    {locale === 'es' ? 'Confirmar nueva contraseña' : 'Confirm new password'}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full min-h-control-md rounded-control border border-ih-border bg-ih-surface px-3.5 text-sm"
                  />
                </div>

                <Button type="submit" variant="secondary" size="sm" className="text-xs font-bold uppercase tracking-wider">
                  {t.account.profile.updatePassword}
                </Button>
              </form>
            </Card>

            {/* GDPR & Privacy */}
            <Card className="p-6 sm:p-8 bg-ih-raised border-ih-border shadow-card space-y-4">
              <h2 className="text-xl font-display font-light text-ih-cobalt">
                {t.account.profile.dangerZone}
              </h2>
              <p className="text-xs text-ih-muted leading-relaxed">
                {locale === 'es'
                  ? 'De conformidad con el Reglamento General de Protección de Datos (RGPD UE 2016/679), tienes derecho a la portabilidad de tus datos y al derecho al olvido.'
                  : 'In compliance with the GDPR (EU 2016/679), you have the right to data portability and account erasure.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleExportData}
                  className="text-xs !h-9"
                >
                  {locale === 'es' ? 'Descargar mis datos (JSON/RGPD)' : 'Download my data (JSON/GDPR)'}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(t.account.profile.deleteWarning)) {
                      logout();
                      navigate(STATIC_ROUTES.home.paths[locale]);
                    }
                  }}
                  className="text-xs text-ih-coral font-bold hover:underline px-3 py-2"
                >
                  {t.account.profile.deleteAccount}
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* ADDRESS ADD / EDIT MODAL */}
        <Modal
          open={addressModalOpen}
          onClose={() => setAddressModalOpen(false)}
          title={editingAddressId ? t.account.addresses.modalEditTitle : t.account.addresses.modalAddTitle}
        >
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label={locale === 'es' ? 'Etiqueta / Alias' : 'Label'}
                value={addressForm.label}
                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                required
                placeholder={t.account.addresses.labelPlaceholder}
              />
              <TextField
                label={t.account.addresses.phone}
                value={addressForm.phone}
                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                required
                placeholder="+34 600 000 000"
              />
            </div>

            <TextField
              label={t.account.addresses.recipientName}
              value={addressForm.recipientName}
              onChange={(e) => setAddressForm({ ...addressForm, recipientName: e.target.value })}
              required
            />

            <TextField
              label={t.account.addresses.street}
              value={addressForm.street}
              onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
              required
              placeholder="Calle, número, piso"
            />

            <TextField
              label={t.account.addresses.apartment}
              value={addressForm.apartment}
              onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
              placeholder="Piso 3º B, Escalera Derecha"
            />

            <div className="grid grid-cols-2 gap-3">
              <TextField
                label={t.account.addresses.postalCode}
                value={addressForm.postalCode}
                onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                required
                placeholder="28001"
              />
              <TextField
                label={t.account.addresses.city}
                value={addressForm.city}
                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                required
                placeholder="Madrid"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <TextField
                label={t.account.addresses.province}
                value={addressForm.province}
                onChange={(e) => setAddressForm({ ...addressForm, province: e.target.value })}
                required
                placeholder="Madrid"
              />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ih-cobalt">
                  {t.account.addresses.country}
                </label>
                <select
                  value={addressForm.country}
                  onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                  className="w-full min-h-control-md rounded-control border border-ih-border bg-ih-surface px-3 text-sm text-ih-text"
                >
                  <option value="ES">España (ES)</option>
                  <option value="PT">Portugal (PT)</option>
                  <option value="FR">France (FR)</option>
                  <option value="IT">Italia (IT)</option>
                  <option value="DE">Deutschland (DE)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <Checkbox
                label={t.account.addresses.defaultShipping}
                checked={addressForm.isDefaultShipping}
                onChange={(e) => setAddressForm({ ...addressForm, isDefaultShipping: e.target.checked })}
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-ih-border">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setAddressModalOpen(false)}
                className="text-xs text-ih-muted"
              >
                {t.account.addresses.cancel}
              </Button>
              <Button type="submit" variant="primary" size="sm" className="text-xs font-bold uppercase tracking-wider">
                {t.account.addresses.saveAddress}
              </Button>
            </div>
          </form>
        </Modal>

        {/* ORDER DETAIL MODAL */}
        {selectedOrder && (
          <Modal
            open={Boolean(selectedOrder)}
            onClose={() => setSelectedOrder(null)}
            title={`${t.account.orders.orderNumber} ${selectedOrder.orderNumber}`}
          >
            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              <div className="flex items-center justify-between pb-3 border-b border-ih-border">
                <span className="text-xs text-ih-muted">
                  {new Date(selectedOrder.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>

              {selectedOrder.trackingNumber && (
                <div className="p-3 bg-ih-sand/40 rounded-card border border-ih-border text-xs flex items-center justify-between">
                  <div>
                    <span className="text-ih-muted">{selectedOrder.carrierName}:</span>{' '}
                    <span className="font-mono font-bold text-ih-cobalt">{selectedOrder.trackingNumber}</span>
                  </div>
                  {selectedOrder.trackingUrl && (
                    <a
                      href={selectedOrder.trackingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ih-coral font-bold hover:underline"
                    >
                      {t.account.orders.trackShipment} →
                    </a>
                  )}
                </div>
              )}

              {/* Items */}
              <div className="divide-y divide-ih-border">
                {selectedOrder.items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName[locale]}
                        className="w-10 h-10 object-cover rounded-control border border-ih-border bg-ih-sand/40"
                      />
                      <div>
                        <p className="font-semibold text-ih-cobalt">{item.productName[locale]}</p>
                        <p className="text-ih-muted">
                          {item.variantName[locale]} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-ih-cobalt">
                      {formatPrice(item.unitPriceEur * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="pt-3 border-t border-ih-border space-y-1.5 text-xs text-ih-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(selectedOrder.subtotalEur)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'es' ? 'Envío' : 'Shipping'}</span>
                  <span>
                    {selectedOrder.shippingEur === 0
                      ? locale === 'es'
                        ? 'Gratis'
                        : 'Free'
                      : formatPrice(selectedOrder.shippingEur)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'es' ? 'IVA incluido (21%)' : 'VAT included (21%)'}</span>
                  <span>{formatPrice(selectedOrder.taxEur)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-ih-cobalt pt-2 border-t border-ih-border">
                  <span>Total</span>
                  <span>{formatPrice(selectedOrder.totalEur)}</span>
                </div>
              </div>

              {/* Address */}
              <div className="pt-3 border-t border-ih-border text-xs text-ih-muted">
                <p className="font-bold text-ih-cobalt uppercase tracking-wider mb-1">
                  {t.account.orders.deliveryTo}
                </p>
                <p>{selectedOrder.shippingAddress.recipientName}</p>
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>
                  {selectedOrder.shippingAddress.postalCode} {selectedOrder.shippingAddress.city},{' '}
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>

              <div className="pt-3 border-t border-ih-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      locale === 'es'
                        ? `Descargando factura simplificada para el pedido ${selectedOrder.orderNumber} en PDF...`
                        : `Downloading PDF invoice for order ${selectedOrder.orderNumber}...`
                    );
                  }}
                  className="text-xs font-bold text-ih-cobalt hover:text-ih-coral underline flex items-center gap-1"
                >
                  <span>📄</span>
                  <span>{t.account.orders.downloadInvoice}</span>
                </button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    selectedOrder.items.forEach((it) => addItem(it.productId, it.variantId, it.quantity));
                    setSelectedOrder(null);
                    navigate(STATIC_ROUTES.checkout.paths[locale]);
                  }}
                  className="text-xs !h-8"
                >
                  {t.account.orders.repeatOrder}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
