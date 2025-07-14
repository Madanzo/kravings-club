'use client';

import { StarIcon } from '@heroicons/react/24/solid';

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: 'Maria G.',
      rating: 5,
      text: 'Amazing service! My order arrived in 25 minutes and the quality was incredible. The Girl Scout Cookies strain was exactly what I needed.',
      location: 'Los Angeles',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'David L.',
      rating: 5,
      text: 'Best cannabis delivery in LA! Professional drivers, discreet packaging, and the product selection is huge. Highly recommend!',
      location: 'Downey',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Sarah M.',
      rating: 5,
      text: 'First time customer and got 30% off! The ordering process was super easy and the delivery was right on time. Will definitely order again.',
      location: 'Long Beach',
      date: '3 days ago'
    },
    {
      id: 4,
      name: 'Carlos R.',
      rating: 5,
      text: 'Great prices and amazing quality. The STIIIZY cartridges are always fresh and the delivery is always fast. Customer for life!',
      location: 'Lynwood',
      date: '5 days ago'
    }
  ];

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Kravings Club for their cannabis delivery needs.
          </p>
          
          <div className="flex justify-center items-center mt-6 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">4.8</div>
              <div className="flex justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">1,000+</div>
              <div className="text-white font-medium">Happy Customers</div>
              <div className="text-gray-400 text-sm">And Growing</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition duration-200">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-400 text-sm">{review.date}</span>
              </div>
              
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium text-sm">{review.name}</div>
                  <div className="text-gray-400 text-xs">{review.location}</div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {review.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join Our Community
            </h3>
            <p className="text-white mb-6">
              Follow us on social media for the latest deals, new product drops, and cannabis education.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-gray-800 hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition duration-200">
                Follow on Instagram
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-200">
                Leave a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}