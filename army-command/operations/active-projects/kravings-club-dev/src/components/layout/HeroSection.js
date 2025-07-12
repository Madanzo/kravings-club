'use client';

import { ArrowRightIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-pink-500 py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Satisfying your KRAVINGS
            <span className="block text-yellow-300">one delivery at a time</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            30% OFF on all Kravings Flower! Shop 1,300+ cannabis products & top brands like STIIIZY, CBX, & Jeeter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center text-white">
              <TruckIcon className="h-6 w-6 mr-2" />
              <span className="font-medium">Free Delivery on $50+</span>
            </div>
            <div className="flex items-center text-white">
              <ClockIcon className="h-6 w-6 mr-2" />
              <span className="font-medium">20-45 Minute Delivery</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition duration-200 flex items-center justify-center">
              Shop Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold py-4 px-8 rounded-lg text-lg transition duration-200">
              View Menu
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">1,300+</div>
              <div className="text-lg">Cannabis Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">30%</div>
              <div className="text-lg">First-Time Discount</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">24/7</div>
              <div className="text-lg">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}