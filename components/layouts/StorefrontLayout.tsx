import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, Footer } from '../ui';
import { CartDrawer } from '../organisms/CartDrawer';

export const StorefrontLayout: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change (unless navigating to a hash anchor)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-ih-cream text-ih-text selection:bg-ih-cobalt selection:text-white">
      <Header />
      <main className="flex-1" role="main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
