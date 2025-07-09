
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      {/* Palm trees background - simulated with CSS */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGFsbSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMiIGZpbGw9InJnYmEoMCwwLDAsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjcGFsbSkiLz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Silhouette overlays */}
      <div className="absolute bottom-0 left-0 w-32 h-96 bg-gradient-to-t from-black/30 to-transparent transform -rotate-12"></div>
      <div className="absolute bottom-0 right-0 w-24 h-80 bg-gradient-to-t from-black/30 to-transparent transform rotate-12"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm md:text-base mb-6 text-white/90 font-barlow font-light tracking-widest uppercase">
            Los Angeles Cannabis Delivery
          </p>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 animate-fade-in font-barlow leading-tight">
            Satisfying your <span className="text-white">KRAVINGS</span>
            <br />
            <span className="text-white">one delivery at a time</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in mb-8">
            <Button size="lg" className="bg-kravings-500 text-white hover:bg-kravings-600 text-lg font-barlow font-bold py-6 px-10 rounded-full">
              START DELIVERY
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-kravings-500 text-lg font-barlow font-bold py-6 px-10 rounded-full">
              THE CLUB
            </Button>
          </div>

          <p className="text-xs md:text-sm text-white/80 font-barlow font-light tracking-wider uppercase">
            Fast Delivery: Los Angeles, Cerritos, Downey, Long Beach, Torrance, South Bay, Lakewood, Los Alamitos, Inglewood
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
