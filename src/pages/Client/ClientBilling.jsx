import React from 'react';

const ClientBilling = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Billing & Payments</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage your billing information and payment methods</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Billing Coming Soon</h2>
          <p className="text-gray-400 text-sm">Billing and payment features are under development</p>
        </div>

      </div>
    </div>
  );
};

export default ClientBilling;