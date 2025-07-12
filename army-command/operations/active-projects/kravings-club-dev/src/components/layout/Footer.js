'use client';

import Image from 'next/image';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' }
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Delivery Policy', href: '/delivery-policy' },
    { name: 'Returns', href: '/returns' }
  ];

  const productCategories = [
    { name: 'Flower', href: '/products/flower' },
    { name: 'Edibles', href: '/products/edibles' },
    { name: 'Vapes', href: '/products/vapes' },
    { name: 'Concentrates', href: '/products/concentrates' }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/kravings-logo.png"
                alt="Kravings Club"
                width={140}
                height={46}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Los Angeles' premier cannabis delivery service. Premium products, fast delivery, 
              and exceptional customer service.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <MapPinIcon className="h-4 w-4 mr-2" />
                <span>18663 Ventura Blvd, Tarzana, CA 91356</span>
              </div>
              <div className="flex items-center text-gray-300">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span>(310) 933-8531</span>
              </div>
              <div className="flex items-center text-gray-300">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                <span>[email protected]</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-red-500 transition duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-gray-300 hover:text-red-500 transition duration-200"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-red-500 transition duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Business Hours & Service Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h5 className="font-semibold text-white mb-2">Business Hours</h5>
              <div className="text-gray-300 text-sm">
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-2">Delivery Info</h5>
              <div className="text-gray-300 text-sm">
                <p>Delivery Time: 20-45 minutes</p>
                <p>Minimum Order: $30</p>
                <p>Free Delivery on $50+</p>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-2">License Info</h5>
              <div className="text-gray-300 text-sm">
                <p>DCC State License: {process.env.NEXT_PUBLIC_LICENSE_NUMBER}</p>
                <p>Adults 21+ Only</p>
                <p>Valid ID Required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Kravings Club. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <a
                href="https://instagram.com/kravings_la"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition duration-200"
              >
                Instagram
              </a>
              <a
                href="https://x.com/Kravings_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition duration-200"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-8 p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-xs text-center">
            <strong>Important:</strong> This website is intended for adults 21 years of age or older. 
            Cannabis products have not been evaluated by the FDA and are not intended to diagnose, 
            treat, cure or prevent any disease. Keep out of reach of children and pets.
          </p>
        </div>
      </div>
    </footer>
  );
}