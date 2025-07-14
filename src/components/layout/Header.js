'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { getItemCount, toggleCart } = useCartStore();
  const itemCount = getItemCount();

  const navigation = [
    { 
      name: 'Store', 
      href: '/menu',
      dropdown: [
        { name: 'Flower', href: '/menu/categories/flower' },
        { name: 'Edible', href: '/menu/categories/edibles' },
        { name: 'Concentrates', href: '/menu/categories/concentrates' },
        { name: 'Pre-Infused', href: '/menu/categories/pre-infused' },
        { name: 'Pre-Roll', href: '/menu/categories/pre-rolls' },
        { name: 'Vapes & Carts', href: '/menu/categories/vapes' },
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className="bg-black bg-opacity-90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <Image
                  src="/kravings-logo-final.png"
                  alt="Kravings Club"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(item.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button className="text-white hover:text-red-500 px-3 py-2 text-sm font-medium transition duration-200 flex items-center">
                      {item.name}
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </button>
                    {dropdownOpen === item.name && (
                      <div className="absolute top-full left-0 w-48 bg-black bg-opacity-95 backdrop-blur-md rounded-md shadow-lg py-2 z-50">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-white hover:text-red-500 hover:bg-red-500 hover:bg-opacity-10 transition duration-200"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-white hover:text-red-500 px-3 py-2 text-sm font-medium transition duration-200"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
            
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-white hover:text-red-500 transition duration-200"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleCart}
              className="relative p-2 text-white hover:text-red-500 transition duration-200 mr-2"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-500 p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button 
                      className="text-white hover:text-red-500 block px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                      onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                    >
                      {item.name}
                      <ChevronDownIcon className={`h-4 w-4 transition-transform ${dropdownOpen === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen === item.name && (
                      <div className="pl-6 py-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="text-gray-300 hover:text-red-500 block px-3 py-1 text-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-white hover:text-red-500 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}