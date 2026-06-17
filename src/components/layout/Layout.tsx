import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { ShaderBackground } from '@/components/ui/shader-background';
import { CartDrawer } from '@/components/cart/CartDrawer';

function ScrollToTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function ProgressBar() {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-gold-500 to-green-500 z-[100]"
      initial={{ scaleX: 0, transformOrigin: '0% 50%' }}
      animate={{ scaleX: 1, transformOrigin: '0% 50%' }}
      exit={{ scaleX: 0, transformOrigin: '100% 50%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  );
}

export function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return <Outlet />;

  return (
    <div className="min-h-screen flex flex-col">
      <ShaderBackground />
      <CursorGlow />
      <ScrollToTopOnNav />
      <AnimatePresence mode="wait">
        <ProgressBar key={`progress-${location.pathname}`} />
      </AnimatePresence>
      <Navbar />
      <CartDrawer />
      <main className="flex-1 pt-16 sm:pt-18">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
