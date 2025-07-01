
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-pink-400">KRAVINGS</span>
              <span className="text-coral-400">.CLUB</span>
            </div>
            <p className="text-gray-400 mb-4">
              Satisfying your KRAVINGS one delivery at a time across LA County.
            </p>
            <p className="text-sm text-gray-500">
              Licensed Cannabis Retailer<br />
              License #C9-000555-LIC
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/menu" className="hover:text-pink-400 transition-colors">Shop Menu</Link></li>
              <li><Link to="/delivery" className="hover:text-pink-400 transition-colors">Delivery Info</Link></li>
              <li><Link to="/about" className="hover:text-pink-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-pink-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/faq" className="hover:text-pink-400 transition-colors">FAQ</Link></li>
              <li><Link to="/track-order" className="hover:text-pink-400 transition-colors">Track Order</Link></li>
              <li><Link to="/returns" className="hover:text-pink-400 transition-colors">Returns</Link></li>
              <li><Link to="/help" className="hover:text-pink-400 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-2 text-gray-400">
              <p>📞 (555) 420-CLUB</p>
              <p>📧 hello@kravings.club</p>
              <p>⏰ Daily: 8AM - 11PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2024 Kravings Club. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-pink-400 transition-colors">Terms of Service</Link>
              <Link to="/compliance" className="hover:text-pink-400 transition-colors">Compliance</Link>
            </div>
          </div>
          <div className="text-center mt-6 text-xs text-gray-600">
            <p>
              ⚠️ Must be 21+ to order. Valid ID required for delivery. 
              Products have not been evaluated by the FDA. Keep out of reach of children and pets.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
