
import { Button } from '@/components/ui/button';
import { Clock, MapPin, ShoppingCart } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-kravings-500 to-kravings-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-hero font-black mb-6 animate-fade-in font-barlow">
            Jaw-dropping <span className="text-white">Cannabis Deals</span>
            <br />
            <span className="italic">Delivered</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in font-barlow font-medium">
            Premium cannabis delivery across Southern California in just 20-45 minutes
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-white" />
              <span className="text-lg font-barlow">20-45 Min Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-white" />
              <span className="text-lg font-barlow">So Cal Wide</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="text-lg font-barlow">$50 Minimum</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="bg-white text-kravings-500 hover:bg-gray-100 text-nav font-barlow font-bold py-4 px-8">
              VIEW MENU
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-kravings-500 text-nav font-barlow font-bold py-4 px-8">
              CHECK DELIVERY AREA
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/80 font-barlow">
            Licensed Cannabis Retailer • License #C9-000555-LIC • 21+ Only
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
