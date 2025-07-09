
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-kravings-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold font-barlow italic">
              <span className="text-white">Kravings</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/menu" className="text-nav font-barlow font-medium text-white hover:text-white/80 transition-colors uppercase tracking-[2px]">
              STORE
            </Link>
            <Link to="/blog" className="text-nav font-barlow font-medium text-white hover:text-white/80 transition-colors uppercase tracking-[2px]">
              BLOG
            </Link>
            <Link to="/about" className="text-nav font-barlow font-medium text-white hover:text-white/80 transition-colors uppercase tracking-[2px]">
              ABOUT US
            </Link>
            <Link to="/contact" className="text-nav font-barlow font-medium text-white hover:text-white/80 transition-colors uppercase tracking-[2px]">
              CONTACT US
            </Link>
            <Link to="/faq" className="text-nav font-barlow font-medium text-white hover:text-white/80 transition-colors uppercase tracking-[2px]">
              FAQ
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/menu" 
                className="text-white hover:text-white/80 transition-colors font-barlow font-medium uppercase tracking-[2px]"
                onClick={() => setIsMenuOpen(false)}
              >
                STORE
              </Link>
              <Link 
                to="/blog" 
                className="text-white hover:text-white/80 transition-colors font-barlow font-medium uppercase tracking-[2px]"
                onClick={() => setIsMenuOpen(false)}
              >
                BLOG
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:text-white/80 transition-colors font-barlow font-medium uppercase tracking-[2px]"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT US
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-white/80 transition-colors font-barlow font-medium uppercase tracking-[2px]"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT US
              </Link>
              <Link 
                to="/faq" 
                className="text-white hover:text-white/80 transition-colors font-barlow font-medium uppercase tracking-[2px]"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
