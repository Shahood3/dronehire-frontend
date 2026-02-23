import React from 'react';

const ClientProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage your profile information</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Profile Management Coming Soon</h2>
          <p className="text-gray-400 text-sm">Profile editing features are under development</p>
        </div>

      </div>
    </div>
  );
};

export default ClientProfile;