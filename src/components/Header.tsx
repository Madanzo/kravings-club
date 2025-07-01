
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold font-barlow">
              <span className="text-kravings-500">KRAVINGS</span>
              <span className="text-black">.CLUB</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/menu" className="text-nav font-barlow font-medium text-gray-700 hover:text-kravings-500 transition-colors uppercase tracking-[3px] italic">
              Menu
            </Link>
            <Link to="/about" className="text-nav font-barlow font-medium text-gray-700 hover:text-kravings-500 transition-colors uppercase tracking-[3px] italic">
              About Us
            </Link>
            <Link to="/contact" className="text-nav font-barlow font-medium text-gray-700 hover:text-kravings-500 transition-colors uppercase tracking-[3px] italic">
              Contact
            </Link>
            <Link to="/faq" className="text-nav font-barlow font-medium text-gray-700 hover:text-kravings-500 transition-colors uppercase tracking-[3px] italic">
              FAQ
            </Link>
            <Link to="/blog" className="text-nav font-barlow font-medium text-gray-700 hover:text-kravings-500 transition-colors uppercase tracking-[3px] italic">
              Blog
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="font-barlow text-nav uppercase tracking-[3px]">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart (0)
            </Button>
            <Button className="bg-kravings-500 hover:bg-kravings-600 text-white font-barlow text-nav uppercase tracking-[3px]">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/menu" 
                className="text-gray-700 hover:text-kravings-500 transition-colors font-barlow font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-kravings-500 transition-colors font-barlow font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-kravings-500 transition-colors font-barlow font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 hover:text-kravings-500 transition-colors font-barlow font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-kravings-500 transition-colors font-barlow font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm" className="font-barlow">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart (0)
                </Button>
                <Button className="bg-kravings-500 hover:bg-kravings-600 text-white font-barlow">
                  Order Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
