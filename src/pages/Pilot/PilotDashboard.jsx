import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const PilotDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('missions');
  const [activeStatusFilter, setActiveStatusFilter] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');

  const tabs = [
    { id: 'missions', label: 'Missions & Quotes', count: 0 },
    { id: 'new', label: 'New Leads', count: 0 },
    { id: 'archived', label: 'Archived Leads', count: 0 }
  ];

  const statusFilters = [
    { id: 'active', label: 'Active', count: 0 },
    { id: 'pursuing', label: 'Pursuing', count: 0 },
    { id: 'hired', label: 'Hired', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
    { id: 'archived', label: 'Archived', count: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs Navigation */}
        <div className="bg-white rounded-t-lg border-b border-gray-200">
          <div className="flex gap-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-lg shadow-sm">
          {/* Header with Status Filters */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900 mb-4">
              Your Missions & Quotes / Inquiries
            </h1>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {statusFilters.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setActiveStatusFilter(status.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeStatusFilter === status.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.label} ({status.count})
                </button>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="w-64">
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option value="all">All services</option>
                  <option value="aerial-photography">Aerial Photography</option>
                  <option value="mapping">Mapping & Surveying</option>
                  <option value="inspection">Infrastructure Inspection</option>
                  <option value="agriculture">Agricultural Monitoring</option>
                </select>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Alert Banners */}
          <div className="p-6 space-y-4">
            {/* Pending Approval Alert */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-900">
                    Your account is pending approval
                  </p>
                  <p className="text-sm text-indigo-700 mt-1">
                    You must complete your <button className="underline font-medium hover:text-indigo-900">profile</button> before you can be approved.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details Alert */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-900">
                    Update your payment details
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Please update your <button className="underline font-medium hover:text-yellow-900">account details</button> for receiving payment if you haven't already done so.
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Completion Card */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Complete your profile</h3>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Profile Completion: 55%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Before your profile can be submitted for review, you'll need to complete the following:
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-indigo-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    A profile photo
                  </li>
                  <li className="flex items-center gap-2 text-indigo-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Your location(s)
                  </li>
                  <li className="flex items-center gap-2 text-indigo-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Your phone number
                  </li>
                  <li className="flex items-center gap-2 text-indigo-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    The services you offer
                  </li>
                  <li className="flex items-center gap-2 text-indigo-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Your hourly rate(s)
                  </li>
                  <li className="flex items-center gap-2 text-indigo-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Enter a bio & blurb
                  </li>
                </ul>

                <p className="text-sm text-gray-600 pt-2">
                  Make your profile even better by adding the following:
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    At least 1 image in your portfolio
                  </li>
                  <li className="flex items-center gap-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    At least 1 video in your portfolio
                  </li>
                  <li className="flex items-center gap-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Select your experience level
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No missions or inquiries yet</h3>
            <p className="text-gray-500 mb-6">
              Complete your profile to start receiving job offers from clients!
            </p>
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PilotDashboard;