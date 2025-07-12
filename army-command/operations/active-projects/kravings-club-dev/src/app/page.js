'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/layout/HeroSection';
import PromoBanner from '@/components/layout/PromoBanner';
import ProductGrid from '@/components/cannabis/ProductGrid';
import BrandShowcase from '@/components/layout/BrandShowcase';
import ServiceAreas from '@/components/layout/ServiceAreas';
import DeliveryPromise from '@/components/layout/DeliveryPromise';
import CustomerReviews from '@/components/layout/CustomerReviews';
import AgeVerification from '@/components/cannabis/AgeVerification';

export default function HomePage() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already verified age
    const verified = localStorage.getItem('kravings_age_verified');
    if (verified === 'true') {
      setAgeVerified(true);
    }
    setIsLoading(false);
  }, []);

  const handleAgeVerified = () => {
    setAgeVerified(true);
    localStorage.setItem('kravings_age_verified', 'true');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!ageVerified) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

  return (
    <Layout>
      <HeroSection />
      <PromoBanner />
      <ProductGrid />
      <BrandShowcase />
      <DeliveryPromise />
      <ServiceAreas />
      <CustomerReviews />
    </Layout>
  );
}