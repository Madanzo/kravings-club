'use client';

import Header from './Header';
import Footer from './Footer';
import Cart from '@/components/cart/Cart';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
      <Cart />
    </div>
  );
}