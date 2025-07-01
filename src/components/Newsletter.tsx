
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-16 brand-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Kravings Club
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            Get exclusive deals, new product alerts, and special member perks
          </p>

          {isSubscribed ? (
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-xl font-semibold text-peach-200">
                Welcome to the Club! 🎉
              </p>
              <p className="mt-2 text-pink-100">
                Check your email for your welcome discount code
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
              <Button 
                type="submit"
                className="bg-coral-500 hover:bg-coral-600 text-white font-semibold px-8"
              >
                Join Club
              </Button>
            </form>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-pink-100">
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Exclusive BOGO deals</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Early access to new products</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Member-only discounts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
