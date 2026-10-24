import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { User, UserAddress, Order, OrderStatus } from '../types';
import { PRODUCTS } from '../config/products';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  newsletterSubscribed?: boolean;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  orders: Order[];
  wishlist: string[]; // product IDs
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsDemo: () => void;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  updateAddress: (id: string, address: Partial<UserAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultShippingAddress: (id: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  lookupGuestOrder: (email: string, orderNumber: string) => Order | null;
}

const STORAGE_KEY_USER = 'inhand_user_session';
const STORAGE_KEY_ORDERS = 'inhand_user_orders';
const STORAGE_KEY_WISHLIST = 'inhand_user_wishlist';

const DEMO_USER: User = {
  id: 'usr-marta-soler',
  email: 'marta.soler@example.com',
  firstName: 'Marta',
  lastName: 'Soler',
  phone: '+34 612 345 678',
  preferredLocale: 'es',
  newsletterSubscribed: true,
  createdAt: '2026-03-15T10:00:00Z',
  giftPreference: 'Incluir tarjeta con versículo bíblico y sin precios impresos.',
  addresses: [
    {
      id: 'addr-01',
      label: 'Casa / Principal',
      recipientName: 'Marta Soler',
      phone: '+34 612 345 678',
      street: 'Calle de Serrano 45, 3º B',
      apartment: 'Escalera Derecha',
      postalCode: '28001',
      city: 'Madrid',
      province: 'Madrid',
      country: 'ES',
      isDefaultShipping: true,
      isDefaultBilling: true,
    },
    {
      id: 'addr-02',
      label: 'Estudio de Diseño / Oficina',
      recipientName: 'Marta Soler · Estudio',
      phone: '+34 612 345 678',
      street: 'Avenida de la Paz 12, Local 4',
      postalCode: '08018',
      city: 'Barcelona',
      province: 'Barcelona',
      country: 'ES',
      isDefaultShipping: false,
      isDefaultBilling: false,
    },
  ],
  billingDetails: {
    companyName: 'Marta Soler Diseño S.L.',
    taxId: 'B-87654321',
    fiscalAddress: 'Calle de Serrano 45, 3º B, 28001 Madrid',
  },
};

const DEMO_ORDERS: Order[] = [
  {
    id: 'ord-01',
    orderNumber: 'IH-2026-8942',
    date: '2026-10-22T14:32:00Z',
    status: 'shipped',
    subtotalEur: 38,
    shippingEur: 0,
    taxEur: 6.6,
    totalEur: 38,
    carrierName: 'Correos Express',
    trackingNumber: 'CE-ES-98421074',
    trackingUrl: 'https://www.correosexpress.com',
    invoicePdfUrl: '#',
    shippingAddress: {
      id: 'addr-01',
      label: 'Casa',
      recipientName: 'Marta Soler',
      phone: '+34 612 345 678',
      street: 'Calle de Serrano 45, 3º B',
      postalCode: '28001',
      city: 'Madrid',
      province: 'Madrid',
      country: 'ES',
      isDefaultShipping: true,
      isDefaultBilling: true,
    },
    items: [
      {
        productId: 'prod-tote',
        variantId: 'tote-natural',
        productName: {
          es: 'Tote Bag FE EN ACCIÓN.',
          en: 'FAITH IN ACTION. Tote Bag',
        },
        variantName: {
          es: 'Crudo natural',
          en: 'Natural unbleached',
        },
        productSlug: 'tote-bag-fe-en-accion',
        image: '/images/products/tote-bag-fe-en-accion/01_main.jpg',
        unitPriceEur: 24,
        quantity: 1,
        lineTotalEur: 24,
      },
      {
        productId: 'prod-keychain',
        variantId: 'jesus-classic',
        productName: {
          es: 'Llavero de Jesús.',
          en: 'Jesus Keychain.',
        },
        variantName: {
          es: 'Clásico · túnica arena y azul',
          en: 'Classic · sand and blue robe',
        },
        productSlug: 'llavero-jesus',
        image: '/images/products/llavero-jesus/01_main.jpg',
        unitPriceEur: 14,
        quantity: 1,
        lineTotalEur: 14,
      },
    ],
  },
  {
    id: 'ord-02',
    orderNumber: 'IH-2026-7510',
    date: '2026-09-18T11:15:00Z',
    status: 'delivered',
    subtotalEur: 32,
    shippingEur: 4.9,
    taxEur: 6.4,
    totalEur: 36.9,
    carrierName: 'GLS Spain',
    trackingNumber: 'GLS-ES-5109312',
    trackingUrl: 'https://www.gls-spain.es',
    invoicePdfUrl: '#',
    shippingAddress: {
      id: 'addr-01',
      label: 'Casa',
      recipientName: 'Marta Soler',
      phone: '+34 612 345 678',
      street: 'Calle de Serrano 45, 3º B',
      postalCode: '28001',
      city: 'Madrid',
      province: 'Madrid',
      country: 'ES',
      isDefaultShipping: true,
      isDefaultBilling: true,
    },
    items: [
      {
        productId: 'prod-gracia',
        variantId: 'gracia-blue',
        productName: {
          es: 'Escultura Tipográfica GRACIA.',
          en: 'GRACIA. Typographic Sculpture',
        },
        variantName: {
          es: 'Azul tinta + acento coral',
          en: 'Ink blue + coral accent',
        },
        productSlug: 'escultura-tipografica-gracia',
        image: '/images/products/escultura-tipografica-gracia/01_main.jpg',
        unitPriceEur: 32,
        quantity: 1,
        lineTotalEur: 32,
      },
    ],
  },
];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-tote', 'prod-bible-stand']);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedOrders = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders(DEMO_ORDERS);
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(DEMO_ORDERS));
      }
      const storedWishlist = localStorage.getItem(STORAGE_KEY_WISHLIST);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (e) {
      console.warn('Could not read user session from storage', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, _password?: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    // If it's the demo email or any custom email, log in smoothly
    const matchedUser: User =
      email.toLowerCase() === DEMO_USER.email.toLowerCase()
        ? DEMO_USER
        : {
            id: `usr-${Date.now()}`,
            email: email.trim().toLowerCase(),
            firstName: email.split('@')[0],
            lastName: '',
            preferredLocale: 'es',
            newsletterSubscribed: false,
            createdAt: new Date().toISOString(),
            addresses: [],
          };

    setUser(matchedUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(matchedUser));
    setIsLoading(false);
    return true;
  };

  const loginAsDemo = () => {
    setUser(DEMO_USER);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEMO_USER));
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newUser: User = {
      id: `usr-${Date.now()}`,
      email: data.email.trim().toLowerCase(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      preferredLocale: 'es',
      newsletterSubscribed: Boolean(data.newsletterSubscribed),
      createdAt: new Date().toISOString(),
      addresses: [],
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  const resetPassword = async (_email: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
    return true;
  };

  const addAddress = (addressData: Omit<UserAddress, 'id'>) => {
    if (!user) return;
    const newAddr: UserAddress = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };
    let updatedAddresses = [...user.addresses];
    if (newAddr.isDefaultShipping) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefaultShipping: false }));
    }
    if (newAddr.isDefaultBilling) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefaultBilling: false }));
    }
    updatedAddresses.push(newAddr);
    updateProfile({ addresses: updatedAddresses });
  };

  const updateAddress = (id: string, partial: Partial<UserAddress>) => {
    if (!user) return;
    let updated = user.addresses.map((a) => (a.id === id ? { ...a, ...partial } : a));
    if (partial.isDefaultShipping) {
      updated = updated.map((a) => (a.id === id ? a : { ...a, isDefaultShipping: false }));
    }
    if (partial.isDefaultBilling) {
      updated = updated.map((a) => (a.id === id ? a : { ...a, isDefaultBilling: false }));
    }
    updateProfile({ addresses: updated });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.filter((a) => a.id !== id);
    updateProfile({ addresses: updated });
  };

  const setDefaultShippingAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefaultShipping: a.id === id,
    }));
    updateProfile({ addresses: updated });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(next));
      return next;
    });
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  const lookupGuestOrder = (email: string, orderNumber: string): Order | null => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanNum = orderNumber.trim().toUpperCase();
    return (
      orders.find(
        (o) =>
          o.orderNumber.toUpperCase() === cleanNum ||
          (o.shippingAddress.phone && o.shippingAddress.phone.includes(cleanNum))
      ) || null
    );
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      orders,
      wishlist,
      login,
      loginAsDemo,
      register,
      logout,
      resetPassword,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultShippingAddress,
      toggleWishlist,
      isInWishlist,
      lookupGuestOrder,
    }),
    [user, orders, wishlist, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
