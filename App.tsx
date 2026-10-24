import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LocaleProvider } from './context/LocaleContext';
import { CartProvider } from './context/CartContext';
import { StorefrontLayout } from './components/layouts/StorefrontLayout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { OurStory } from './pages/OurStory';
import { ForCommunities } from './pages/ForCommunities';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';
import { Legal } from './pages/Legal';
import { DesignSystemPage } from './pages/DesignSystemPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <CartProvider>
          <Routes>
            <Route element={<StorefrontLayout />}>
              {/* Spanish (ES) Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Shop />} />
              <Route path="/producto/:slug" element={<ProductDetail />} />
              <Route path="/nuestra-historia" element={<OurStory />} />
              <Route path="/para-comunidades" element={<ForCommunities />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/design-system" element={<DesignSystemPage />} />

              {/* English (EN) Routes */}
              <Route path="/en" element={<Home />} />
              <Route path="/en/shop" element={<Shop />} />
              <Route path="/en/product/:slug" element={<ProductDetail />} />
              <Route path="/en/our-story" element={<OurStory />} />
              <Route path="/en/for-communities" element={<ForCommunities />} />
              <Route path="/en/contact" element={<Contact />} />
              <Route path="/en/checkout" element={<Checkout />} />
              <Route path="/en/legal" element={<Legal />} />
              <Route path="/en/design-system" element={<DesignSystemPage />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </CartProvider>
      </LocaleProvider>
    </BrowserRouter>
  );
};

export default App;
