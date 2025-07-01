
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCategories from '@/components/ProductCategories';
import DeliveryAreas from '@/components/DeliveryAreas';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import AgeVerification from '@/components/AgeVerification';

const Index = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);

  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified');
    if (isVerified === 'true') {
      setShowAgeVerification(false);
    }
  }, []);

  const handleAgeVerified = () => {
    setShowAgeVerification(false);
  };

  return (
    <div className="min-h-screen">
      {showAgeVerification && (
        <AgeVerification onVerified={handleAgeVerified} />
      )}
      
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <DeliveryAreas />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
