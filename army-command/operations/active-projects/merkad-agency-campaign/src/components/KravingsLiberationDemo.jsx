import React, { useState } from 'react';

// Liberation Dashboard - Showing Kravings Club FREE from Blaze/Weedmaps
const KravingsLiberationDemo = () => {
  const [showSavings, setShowSavings] = useState(false);
  
  // Enemy costs based on research
  const enemyCosts = {
    blaze: 1500,
    weedmaps: 2500,
    other: 500,
    total: 4500
  };
  
  const ourCost = 500;
  const monthlySavings = enemyCosts.total - ourCost;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-green-400">
          🚀 Kravings Club Liberation Dashboard
        </h2>
        <p className="text-gray-300">
          See how we're freeing Kravings Club from expensive monopolies
        </p>
      </div>

      {/* Cost Comparison */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-red-900/20 border border-red-500 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-red-400">
            💸 Current Enemy Costs
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Blaze E-commerce:</span>
              <span className="text-red-400">${enemyCosts.blaze}/mo</span>
            </li>
            <li className="flex justify-between">
              <span>Weedmaps Fees:</span>
              <span className="text-red-400">${enemyCosts.weedmaps}/mo</span>
            </li>
            <li className="flex justify-between">
              <span>Other Tools:</span>
              <span className="text-red-400">${enemyCosts.other}/mo</span>
            </li>
            <li className="border-t pt-2 flex justify-between font-bold">
              <span>Total Monthly:</span>
              <span className="text-red-500">${enemyCosts.total}/mo</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-900/20 border border-green-500 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-green-400">
            ✅ Merkad Liberation Cost
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>All-in-One Platform:</span>
              <span className="text-green-400">${ourCost}/mo</span>
            </li>
            <li className="flex justify-between">
              <span>No Marketplace Fees:</span>
              <span className="text-green-400">$0/mo</span>
            </li>
            <li className="flex justify-between">
              <span>Own Your Data:</span>
              <span className="text-green-400">Priceless</span>
            </li>
            <li className="border-t pt-2 flex justify-between font-bold">
              <span>Total Monthly:</span>
              <span className="text-green-500">${ourCost}/mo</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Savings Calculator */}
      <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-bold mb-4">
          💰 Kravings Club Savings
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-3xl font-bold text-green-400">
              ${monthlySavings.toLocaleString()}
            </p>
            <p className="text-gray-400">Per Month</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">
              ${yearlySavings.toLocaleString()}
            </p>
            <p className="text-gray-400">Per Year</p>
          </div>
        </div>
        <button 
          onClick={() => setShowSavings(!showSavings)}
          className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold transition-all"
        >
          See Full Liberation Benefits
        </button>
      </div>

      {/* Liberation Features */}
      {showSavings && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-green-400">
            🎯 Liberation Features Unlocked
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="font-bold text-green-400 mb-2">✅ E-commerce Freedom</h4>
              <p className="text-sm text-gray-300">
                Custom website, no Blaze restrictions, full control
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="font-bold text-green-400 mb-2">✅ Customer Ownership</h4>
              <p className="text-sm text-gray-300">
                Direct SMS/email, no Weedmaps dependency
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="font-bold text-green-400 mb-2">✅ SEO Domination</h4>
              <p className="text-sm text-gray-300">
                Rank above Weedmaps in local search
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="font-bold text-green-400 mb-2">✅ Offline Capability</h4>
              <p className="text-sm text-gray-300">
                Works even when Blaze goes down
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KravingsLiberationDemo;