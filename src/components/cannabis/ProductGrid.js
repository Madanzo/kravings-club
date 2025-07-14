'use client';

import { useState } from 'react';
import { PlusIcon, StarIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/cart';
import { useBlazeProducts, useBlazeCategories } from '@/hooks/useBlaze';

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addItem } = useCartStore();
  
  // Use Blaze hooks for real-time data
  const { 
    products: allProducts, 
    loading: productsLoading, 
    error: productsError,
    lastUpdate,
    refresh
  } = useBlazeProducts();
  
  const { 
    categories: blazeCategories, 
    loading: categoriesLoading 
  } = useBlazeCategories();

  // Build categories list with Blaze data
  const categories = [
    { id: 'all', name: 'All Products' },
    ...blazeCategories.map(cat => ({
      id: cat.id || cat.slug,
      name: cat.name
    }))
  ];

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  const loading = productsLoading || categoriesLoading;

  const handleAddToCart = (product) => {
    // Check if product is in stock before adding to cart
    if (!product.inStock) {
      alert('Sorry, this product is currently out of stock.');
      return;
    }
    addItem(product);
  };

  // Error state
  if (productsError) {
    return (
      <div className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Unable to Load Products</h2>
          <p className="text-gray-300 mb-6">{productsError}</p>
          <button 
            onClick={refresh}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <p className="text-gray-300 mt-4">Premium cannabis products from top brands</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-6 animate-pulse">
                <div className="bg-gray-600 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-600 h-4 rounded mb-2"></div>
                <div className="bg-gray-600 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            {lastUpdate && (
              <div className="ml-4 flex items-center text-gray-400 text-sm">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Updated {new Date(lastUpdate).toLocaleTimeString()}</span>
                <button
                  onClick={refresh}
                  className="ml-2 text-red-400 hover:text-red-300 underline"
                >
                  Refresh
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-300 mb-8">
            Live inventory from Blaze POS • Premium cannabis products from top brands
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-xl hover:transform hover:scale-105 transition duration-300">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    {product.thc}% THC
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-1">
                  <span className="bg-gray-800 bg-opacity-80 text-white px-2 py-1 rounded text-sm">
                    {product.type}
                  </span>
                  {!product.inStock && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      OUT OF STOCK
                    </span>
                  )}
                  {product.inventory <= 5 && product.inStock && (
                    <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">
                      LOW STOCK
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  {product.brand && (
                    <span className="text-sm text-gray-400 font-medium">{product.brand}</span>
                  )}
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`p-2 rounded-lg transition duration-200 ${
                      product.inStock 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}