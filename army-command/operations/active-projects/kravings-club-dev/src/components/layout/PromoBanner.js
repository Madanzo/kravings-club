'use client';

import { GiftIcon, FireIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-2">
            <FireIcon className="h-8 w-8 text-red-600 mr-2 animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold text-red-700">
              HOT DEALS!
            </h2>
            <FireIcon className="h-8 w-8 text-red-600 ml-2 animate-pulse" />
          </div>
          
          <p className="text-lg md:text-xl font-semibold text-red-800 mb-4">
            30% OFF on all Kravings Flower! 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <GiftIcon className="h-5 w-5 text-red-700 mr-2" />
              <span className="text-red-800 font-medium">First-Time Customer Discount</span>
            </div>
            
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <ClockIcon className="h-5 w-5 text-red-700 mr-2" />
              <span className="text-red-800 font-medium">Limited Time Offer</span>
            </div>
          </div>
          
          <p className="text-sm text-red-700 mt-4 opacity-90">
            Shop 1,300+ cannabis products & top brands like STIIIZY, CBX, & Jeeter
          </p>
        </div>
      </div>
    </div>
  );
}