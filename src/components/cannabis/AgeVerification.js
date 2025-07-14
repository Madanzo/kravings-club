'use client';

import { useState } from 'react';
import { CalendarDaysIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function AgeVerification({ onVerified }) {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!birthDate) {
      setError('Please enter your birth date');
      setLoading(false);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age >= 21) {
      setTimeout(() => {
        onVerified();
        setLoading(false);
      }, 1000);
    } else {
      setError('You must be 21 or older to access this site');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <ShieldCheckIcon className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Age Verification Required</h1>
          <p className="text-gray-600">You must be 21 years or older to enter this site</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Birth Date
            </label>
            <div className="relative">
              <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                id="birthdate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Verifying...' : 'Verify Age'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By entering this site, you agree to our Terms of Service and Privacy Policy.
            <br />
            This site is for adults 21+ only.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            License: {process.env.NEXT_PUBLIC_LICENSE_NUMBER}
          </p>
        </div>
      </div>
    </div>
  );
}