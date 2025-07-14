'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';

export default function BrandShowcase() {
  const topBrands = [
    {
      name: 'STIIIZY',
      logo: '/api/placeholder/150/80',
      description: 'Premium vapes and pods',
      featured: true
    },
    {
      name: 'CBX',
      logo: '/api/placeholder/150/80', 
      description: 'Curated cannabis experiences',
      featured: true
    },
    {
      name: 'Jeeter',
      logo: '/api/placeholder/150/80',
      description: 'Pre-rolls and infused joints',
      featured: true
    },
    {
      name: 'Raw Garden',
      logo: '/api/placeholder/150/80',
      description: 'Live resin cartridges',
      featured: false
    },
    {
      name: 'Connected',
      logo: '/api/placeholder/150/80',
      description: 'Craft cannabis flower',
      featured: false
    },
    {
      name: 'Cookies',
      logo: '/api/placeholder/150/80',
      description: 'Premium flower strains',
      featured: false
    }
  ];

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <SparklesIcon className="h-8 w-8 text-yellow-400 mr-2" />
            <h2 className="text-3xl font-bold text-white">Top Brands</h2>
            <SparklesIcon className="h-8 w-8 text-yellow-400 ml-2" />
          </div>
          <p className="text-gray-300 text-lg">
            Shop premium cannabis products from California's most trusted brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {topBrands.map((brand, index) => (
            <div 
              key={brand.name}
              className={`group cursor-pointer transition-all duration-300 ${
                brand.featured 
                  ? 'transform hover:scale-110' 
                  : 'transform hover:scale-105 opacity-75 hover:opacity-100'
              }`}
            >
              <div className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                brand.featured ? 'ring-2 ring-yellow-400' : ''
              }`}>
                <div className="text-center">
                  <div className="h-16 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-lg">
                      {brand.name}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs">
                    {brand.description}
                  </p>
                  {brand.featured && (
                    <div className="mt-2">
                      <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-lg">
            Shop All Brands
          </button>
        </div>
      </div>
    </div>
  );
}