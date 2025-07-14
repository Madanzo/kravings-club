import React, { useState } from 'react';

const LiberationComparison = () => {
  const [showLiberated, setShowLiberated] = useState(false);

  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">
        🎯 Kravings Club: Enemy Control vs Liberation
      </h2>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowLiberated(!showLiberated)}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${
            showLiberated 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'
          }`}
        >
          {showLiberated ? '✅ Liberated Vision' : '🔴 Current (Enemy Control)'}
        </button>
      </div>

      {/* Comparison Display */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Visual Mockup */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Visual Design</h3>
          
          {!showLiberated ? (
            <div className="space-y-4">
              {/* Current Kravings Mock */}
              <div className="bg-pink-500 text-white p-8 rounded">
                <h1 className="text-4xl font-black" style={{fontFamily: 'Bangers, cursive'}}>
                  KRAVINGS CLUB
                </h1>
                <p className="text-xl mt-2">Jaw-dropping Cannabis Deals!</p>
                <div className="mt-4 space-x-2">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded">40% OFF!</span>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded">DEALS!</span>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded">SAVE!</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>❌ Loud, discount-focused design</p>
                <p>❌ Competing on price only</p>
                <p>❌ Generic cannabis aesthetic</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Liberated Kravings Mock */}
              <div className="bg-gray-900 text-white p-8 rounded">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                  <h1 className="text-2xl font-light tracking-wider">KRAVINGS CLUB</h1>
                </div>
                <p className="text-xl font-light text-gray-300">Premium Cannabis, Delivered with Care.</p>
                <div className="mt-6">
                  <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded transition-all">
                    Explore Collection →
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>✅ Sophisticated, premium design</p>
                <p>✅ Quality & experience focused</p>
                <p>✅ Unique brand identity</p>
              </div>
            </div>
          )}
        </div>

        {/* Technical Stack */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Technical Infrastructure</h3>
          
          {!showLiberated ? (
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-bold">E-commerce Platform</h4>
                <p className="text-gray-600">Blaze ($1,500/month)</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-bold">Customer Acquisition</h4>
                <p className="text-gray-600">Weedmaps ($2,500/month)</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-bold">Analytics & Data</h4>
                <p className="text-gray-600">Third-party controlled</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-bold">SEO Performance</h4>
                <p className="text-gray-600">Dependent on Weedmaps</p>
              </div>
              <div className="bg-red-50 p-4 rounded mt-4">
                <p className="text-2xl font-bold text-red-600">Total: $4,500+/month</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold">E-commerce Platform</h4>
                <p className="text-gray-600">Custom React/Next.js (Owned)</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold">Customer Acquisition</h4>
                <p className="text-gray-600">Direct SEO + Email/SMS</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold">Analytics & Data</h4>
                <p className="text-gray-600">100% Owned & Controlled</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold">SEO Performance</h4>
                <p className="text-gray-600">Rank above Weedmaps</p>
              </div>
              <div className="bg-green-50 p-4 rounded mt-4">
                <p className="text-2xl font-bold text-green-600">Total: $500/month</p>
                <p className="text-sm text-gray-600">Saving $4,000/month</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Feature Comparison</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Feature</th>
              <th className="text-center py-2">Current (Enemy)</th>
              <th className="text-center py-2">Liberated</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Monthly Cost</td>
              <td className="text-center text-red-600">$4,500+</td>
              <td className="text-center text-green-600">$500</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Customer Data Ownership</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Offline Capability</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Custom Branding</td>
              <td className="text-center">Limited</td>
              <td className="text-center">Unlimited</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">SEO Control</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Transaction Fees</td>
              <td className="text-center">2-5%</td>
              <td className="text-center">0%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiberationComparison;