// PilotProfile.jsx - Pilot Profile Dashboard

import React, { useState } from 'react';

const PilotProfile = () => {
  // Mock pilot data - replace with API data
  const [pilot, setPilot] = useState({
    name: 'Shahood A.',
    avatar: null,
    verified: false,
    rating: 0,
    flightsMade: 0,
    averageRate: null,
    location: null,
    travelDistance: 180,
    profileCompletion: 55,
    accountStatus: 'pending', // 'pending', 'approved', 'rejected'
    paymentDetailsComplete: false,
    completedFields: {
      profilePhoto: false,
      location: false,
      phoneNumber: false,
      services: false,
      hourlyRate: false,
      bio: false,
    },
    optionalFields: {
      portfolioImage: false,
      portfolioVideo: false,
      experienceLevel: false,
    },
  });

  const requiredItems = [
    { key: 'profilePhoto', label: 'A profile photo', completed: pilot.completedFields.profilePhoto },
    { key: 'location', label: 'Your location(s)', completed: pilot.completedFields.location },
    { key: 'phoneNumber', label: 'Your phone number', completed: pilot.completedFields.phoneNumber },
    { key: 'services', label: 'The services you offer', completed: pilot.completedFields.services },
    { key: 'hourlyRate', label: 'Your hourly rate(s)', completed: pilot.completedFields.hourlyRate },
    { key: 'bio', label: 'Enter a bio & blurb', completed: pilot.completedFields.bio },
  ];

  const optionalItems = [
    { key: 'portfolioImage', label: 'At least 1 image in your portfolio', completed: pilot.optionalFields.portfolioImage },
    { key: 'portfolioVideo', label: 'At least 1 video in your portfolio', completed: pilot.optionalFields.portfolioVideo },
    { key: 'experienceLevel', label: 'Select your experience level', completed: pilot.optionalFields.experienceLevel },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
          {/* Avatar & Name */}
          <div className="flex items-start gap-5 mb-8">
            <div className="flex flex-col items-center gap-2">
              {pilot.avatar ? (
                <img
                  src={pilot.avatar}
                  alt={pilot.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-semibold">
                  {pilot.name.charAt(0)}
                </div>
              )}
              <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 transition-colors">
                Add a photo
              </button>
            </div>
            <div className="pt-1">
              <h2 className="text-xl font-semibold text-gray-900">{pilot.name}</h2>
              <div className="flex items-center gap-1 mt-0.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-400">{pilot.location || ''}</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Rating</p>
                <p className="text-lg font-bold text-gray-900">{pilot.rating}</p>
              </div>
            </div>

            {/* Flights Made */}
            <div className="flex items-center gap-3">
              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Flights made</p>
                <p className="text-lg font-bold text-gray-900">{pilot.flightsMade}</p>
              </div>
            </div>

            {/* Average Rate */}
            <div className="flex items-center gap-3">
              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Average rate</p>
                <p className="text-lg font-bold text-gray-900">{pilot.averageRate || 'Not specified'}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="text-lg font-bold text-gray-900">{pilot.location || 'Not specified'}</p>
              </div>
            </div>

            {/* Travel */}
            <div className="flex items-center gap-3">
              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Travel</p>
                <p className="text-lg font-bold text-gray-900">Up to {pilot.travelDistance} miles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Approval Alert */}
        {pilot.accountStatus === 'pending' && (
          <div className="bg-indigo-500 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-base">Your account is pending approval</h3>
            </div>
            <p className="text-sm text-indigo-100 ml-7">
              You must complete{' '}
              <span className="font-bold text-white underline cursor-pointer hover:text-indigo-200">
                your profile
              </span>{' '}
              before you can be approved.
            </p>
          </div>
        )}

        {/* Payment Details Alert */}
        {!pilot.paymentDetailsComplete && (
          <div className="bg-amber-400 rounded-xl p-5 text-gray-900">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="font-bold text-base">Update your payment details</h3>
            </div>
            <p className="text-sm text-gray-800 ml-7">
              Please update your{' '}
              <span className="font-bold text-gray-900 underline cursor-pointer hover:text-gray-700">
                account details
              </span>{' '}
              for receiving payment if you haven't already done so.
            </p>
          </div>
        )}

        {/* Complete Your Profile Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-indigo-600">Complete your profile</h3>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-8 mb-5 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full flex items-center justify-center transition-all duration-500 ease-out"
              style={{ width: `${pilot.profileCompletion}%` }}
            >
              <span className="text-white text-sm font-semibold">
                Profile Completion: {pilot.profileCompletion}%
              </span>
            </div>
          </div>

          {/* Required Fields */}
          <p className="text-sm text-indigo-400 mb-3">
            Before your profile can be submitted for review, you'll need to complete the following:
          </p>
          <ul className="space-y-2 mb-6 ml-4">
            {requiredItems.map((item) => (
              <li key={item.key} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <span
                  className={`text-sm font-semibold cursor-pointer hover:underline ${
                    item.completed ? 'text-green-600 line-through' : 'text-indigo-600'
                  }`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Optional Fields */}
          <p className="text-sm text-gray-500 mb-3">
            Make your profile even better by adding the following:
          </p>
          <ul className="space-y-2 ml-4">
            {optionalItems.map((item) => (
              <li key={item.key} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                <span
                  className={`text-sm font-semibold cursor-pointer hover:underline ${
                    item.completed ? 'text-green-600 line-through' : 'text-indigo-500'
                  }`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PilotProfile;