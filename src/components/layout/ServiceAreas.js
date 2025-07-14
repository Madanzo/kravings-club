'use client';

import { MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ServiceAreas() {
  const serviceAreas = [
    { name: 'Los Angeles', deliveryFee: '$5', minOrder: '$30' },
    { name: 'Lynwood', deliveryFee: '$5', minOrder: '$30' },
    { name: 'South Gate', deliveryFee: '$5', minOrder: '$30' },
    { name: 'Downey', deliveryFee: '$7.50', minOrder: '$35' },
    { name: 'Long Beach', deliveryFee: '$7.50', minOrder: '$35' },
    { name: 'South Bay', deliveryFee: '$7.50', minOrder: '$35' },
    { name: 'Torrance', deliveryFee: '$10', minOrder: '$50' },
    { name: 'Hawthorne', deliveryFee: '$7.50', minOrder: '$35' },
    { name: 'Inglewood', deliveryFee: '$7.50', minOrder: '$35' },
    { name: 'Cerritos', deliveryFee: '$7.50', minOrder: '$35' },
    { name: 'Los Alamitos', deliveryFee: '$10', minOrder: '$50' },
    { name: 'Tarzana', deliveryFee: '$10', minOrder: '$50' }
  ];

  return (
    <div className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Delivery Areas
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We deliver to multiple cities across Los Angeles County. Check if we deliver to your area below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {serviceAreas.map((area, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-4 hover:bg-gray-750 transition duration-200">
              <div className="flex items-center mb-3">
                <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-white font-semibold">{area.name}</h3>
                <CheckCircleIcon className="h-4 w-4 text-green-400 ml-auto" />
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Delivery Fee:</span>
                  <span className="text-green-400 font-medium">{area.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Min Order:</span>
                  <span className="text-yellow-400 font-medium">{area.minOrder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">
              Don't see your area?
            </h3>
            <p className="text-white mb-4">
              We're expanding our delivery zones! Contact us to see if we can deliver to your location.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition duration-200">
              Contact Us
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="text-2xl font-bold text-green-400 mb-2">20-45</div>
            <div className="text-white font-medium mb-1">Minutes</div>
            <div className="text-gray-400 text-sm">Average delivery time</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="text-2xl font-bold text-yellow-400 mb-2">$30</div>
            <div className="text-white font-medium mb-1">Minimum</div>
            <div className="text-gray-400 text-sm">Order for delivery</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="text-2xl font-bold text-red-400 mb-2">FREE</div>
            <div className="text-white font-medium mb-1">Delivery</div>
            <div className="text-gray-400 text-sm">On orders over $50</div>
          </div>
        </div>
      </div>
    </div>
  );
}