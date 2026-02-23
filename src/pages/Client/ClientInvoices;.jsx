import React from 'react';

const ClientInvoices = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Invoices</h1>
          <p className="text-gray-500 text-sm mt-0.5">View and manage your invoices</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Invoices Coming Soon</h2>
          <p className="text-gray-400 text-sm">Invoice management features are under development</p>
        </div>

      </div>
    </div>
  );
};

export default ClientInvoices;