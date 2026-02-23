import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const PilotSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account-settings');
  const [portfolioSubTab, setPortfolioSubTab] = useState('images');
  
  const [formData, setFormData] = useState({
    // Account Settings
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    username: '',
    profilePhoto: null,
    subscribeGeneral: true,
    subscribeNewJobs: true,
    subscribeFeatures: true,
    subscribeBidRejection: false,
    notificationType: 'daily',
    
    // Pilot Information
    level: '',
    businessName: '',
    phoneNumber: '',
    insuranceCoverage: '',
    addresses: [
      { value: '', isPrimary: false },
      { value: '', isPrimary: false }
    ],
    blurb: '',
    bio: '',
    
    // License Information
    licenseStatus: 'not-licensed',
    certificateHolderName: '',
    certificateNumber: '',
    certificateDocument: null,
    certificateIssueDate: '',
    renewalIssueDate: '',
    renewalCertificationType: '2-years',
    renewalDocument: null,
    
    // Portfolio
    portfolioImageTitle: '',
    portfolioImage: null,
    portfolioImageService: '',
    portfolioVideoTitle: '',
    portfolioVideoUrl: '',
    portfolioVideoService: ''
  });

  // Simplified tab list - only 5 tabs
  const tabs = [
    { id: 'account-settings', label: 'Account Settings' },
    { id: 'pilot-info', label: 'Pilot Information' },
    { id: 'licenses', label: 'Licenses' },
    { id: 'payment-settings', label: 'Payment Settings' },
    { id: 'portfolio', label: 'Portfolio' }
  ];

  const pilotLevels = [
    {
      value: 'entry',
      label: 'Entry',
      description: 'Less than 30 commercial flight hours. Still photos and video of real estate, agriculture, etc. Only flown a few different platforms, if more than one, and not equipped for enterprise level work (batteries, backups, chargers, etc.).'
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description: 'Flown for a few different industries and capable of manual and autonomous flight. Experience with different platforms and sensors and capable of some enterprise level work.'
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'Flown for multiple different industries or an expert in one specific industry. Has flown enterprise level work with advanced sensors - LiDAR, OGI, Thermal, Near-Infrared.'
    }
  ];

  const serviceCategories = [
    'Real Estate Photography',
    'Construction Monitoring',
    'Agricultural Mapping',
    'Event Coverage',
    'Infrastructure Inspection',
    'Survey & Mapping',
    'Cinematography',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleAddressChange = (index, value) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index].value = value;
    setFormData(prev => ({ ...prev, addresses: newAddresses }));
  };

  const handlePrimaryChange = (index) => {
    const newAddresses = formData.addresses.map((addr, i) => ({
      ...addr,
      isPrimary: i === index
    }));
    setFormData(prev => ({ ...prev, addresses: newAddresses }));
  };

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { value: '', isPrimary: false }]
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', formData);
    // Implement save functionality
  };

  const handlePortfolioSave = () => {
    console.log('Saving portfolio:', {
      type: portfolioSubTab,
      data: portfolioSubTab === 'images' ? {
        title: formData.portfolioImageTitle,
        image: formData.portfolioImage,
        service: formData.portfolioImageService
      } : {
        title: formData.portfolioVideoTitle,
        url: formData.portfolioVideoUrl,
        service: formData.portfolioVideoService
      }
    });
    // Implement portfolio save functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Simplified Navigation - 5 tabs only */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap gap-3 px-6 py-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                    : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Account Settings Content */}
          {activeTab === 'account-settings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Email and Username */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Profile Photo Upload */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload a profile photo:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'profilePhoto')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer"
                />
                {formData.profilePhoto && (
                  <p className="mt-2 text-sm text-green-600">✓ {formData.profilePhoto.name}</p>
                )}
              </div>

              {/* Subscription Settings */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      name="subscribeGeneral"
                      checked={formData.subscribeGeneral}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Subscribe to general updates</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      name="subscribeNewJobs"
                      checked={formData.subscribeNewJobs}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Subscribe to new job notifications</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      name="subscribeFeatures"
                      checked={formData.subscribeFeatures}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Subscribe to feature updates</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      name="subscribeBidRejection"
                      checked={formData.subscribeBidRejection}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Subscribe to bid rejection notifications</span>
                  </label>
                </div>

                {/* Job Notification Type */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Job notification type <span className="text-red-500">*</span>
                  </p>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="notificationType"
                        value="daily"
                        checked={formData.notificationType === 'daily'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">Daily Digest</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="notificationType"
                        value="individual"
                        checked={formData.notificationType === 'individual'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">Individual Notifications</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Pilot Information Tab */}
          {activeTab === 'pilot-info' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Pilot Information</h2>

              {/* Level Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option value="">---------</option>
                  {pilotLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>

                {/* Level Descriptions */}
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-3">Levels:</p>
                  <ul className="space-y-3">
                    {pilotLevels.map(level => (
                      <li key={level.value}>
                        <span className="font-medium text-gray-900">{level.label}:</span>
                        <span className="text-sm text-gray-600"> {level.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Business Name, Phone, Insurance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Your business name (optional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance coverage (optional)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      name="insuranceCoverage"
                      value={formData.insuranceCoverage}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Addresses:</label>
                <div className="space-y-3">
                  {formData.addresses.map((address, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={address.value}
                        onChange={(e) => handleAddressChange(index, e.target.value)}
                        placeholder="Type a location and select from the available choices"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Primary:</span>
                        <input
                          type="checkbox"
                          checked={address.isPrimary}
                          onChange={() => handlePrimaryChange(index)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addAddress}
                  className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                >
                  <span className="text-lg">+</span> Add Another Address
                </button>
              </div>

              {/* Blurb */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Blurb</label>
                <textarea
                  name="blurb"
                  value={formData.blurb}
                  onChange={handleInputChange}
                  placeholder="Tell clients about yourself in 150 characters or less. This will be displayed in search results."
                  rows={4}
                  maxLength={150}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                />
                <p className="mt-1 text-xs text-gray-500">{formData.blurb.length}/150 characters</p>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Go into detail about your experience, the kind of projects you like to do, etc."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Licenses Tab */}
          {activeTab === 'licenses' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">License Information</h2>

              {/* License Status */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  License status <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="licenseStatus"
                      value="not-licensed"
                      checked={formData.licenseStatus === 'not-licensed'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Not licensed yet</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="licenseStatus"
                      value="remote-pilot"
                      checked={formData.licenseStatus === 'remote-pilot'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Remote Pilot Certificate</span>
                  </label>
                </div>
              </div>

              {/* Remote Pilot Certificate Section */}
              {formData.licenseStatus === 'remote-pilot' && (
                <>
                  {/* Part 107 Certificate */}
                  <div className="mb-8 p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">Remote Pilot Certificate: Part 107</h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                      To fly under the FAA's <a href="#" className="text-indigo-600 hover:text-indigo-700 underline">Small UAS Rule (14 CFR part 107)</a>, you must get a Remote Pilot Certificate from the FAA.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Remote Pilot Certificate Holder Name
                        </label>
                        <input
                          type="text"
                          name="certificateHolderName"
                          value={formData.certificateHolderName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Remote Pilot Certificate Number
                        </label>
                        <input
                          type="text"
                          name="certificateNumber"
                          value={formData.certificateNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload certificate documentation
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(e, 'certificateDocument')}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer"
                        />
                        {formData.certificateDocument && (
                          <p className="mt-2 text-sm text-green-600">✓ {formData.certificateDocument.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Certificate Issue Date
                        </label>
                        <input
                          type="date"
                          name="certificateIssueDate"
                          value={formData.certificateIssueDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Renewal Section */}
                  <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">Remote Pilot Certificate Renewal: Unmanned Aircraft - Recurrent (UGR)</h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                      Remote drone pilots are required to pass a recurrent <a href="#" className="text-indigo-600 hover:text-indigo-700 underline">Part 107 Knowledge Test (UGR)</a> every 2 years in order to maintain their Remote Pilot certificates.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Renewal Issue Date
                        </label>
                        <input
                          type="date"
                          name="renewalIssueDate"
                          value={formData.renewalIssueDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Select your renewal certification type:
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="renewalCertificationType"
                              value="2-years"
                              checked={formData.renewalCertificationType === '2-years'}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="text-sm text-gray-700">2 Years (Default)</span>
                          </label>

                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="renewalCertificationType"
                              value="6-months"
                              checked={formData.renewalCertificationType === '6-months'}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="text-sm text-gray-700">6 Months (Online Exam Under FAA COVID-19 Ruling)</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload renewal documentation
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'renewalDocument')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer"
                      />
                      {formData.renewalDocument && (
                        <p className="mt-2 text-sm text-green-600">✓ {formData.renewalDocument.name}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Payment Settings Tab */}
          {activeTab === 'payment-settings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Settings</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <p className="text-gray-600">Payment settings coming soon</p>
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="p-6">
              {/* Portfolio Sub-tabs */}
              <div className="flex gap-6 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setPortfolioSubTab('images')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                    portfolioSubTab === 'images'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Images
                </button>
                <button
                  onClick={() => setPortfolioSubTab('videos')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                    portfolioSubTab === 'videos'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Videos
                </button>
              </div>

              {/* Images Tab Content */}
              {portfolioSubTab === 'images' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Images</h2>
                  
                  {/* Add an Image Form */}
                  <div className="bg-white">
                    <h3 className="text-base font-medium text-gray-700 mb-6">Add an image</h3>
                    
                    {/* Title */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="portfolioImageTitle"
                        value={formData.portfolioImageTitle}
                        onChange={handleInputChange}
                        placeholder="A title for your image."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'portfolioImage')}
                            className="hidden"
                            id="portfolio-image-upload"
                          />
                          <label
                            htmlFor="portfolio-image-upload"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            {formData.portfolioImage ? formData.portfolioImage.name : 'Choose file'}
                          </label>
                          <button
                            onClick={() => document.getElementById('portfolio-image-upload').click()}
                            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Browse
                          </button>
                        </div>
                      </div>

                      {/* Services Dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Services <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="portfolioImageService"
                          value={formData.portfolioImageService}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
                        >
                          <option value="">Select a category for this image.</option>
                          {serviceCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-start pt-6">
                      <button
                        onClick={handlePortfolioSave}
                        className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Videos Tab Content */}
              {portfolioSubTab === 'videos' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Videos</h2>
                  
                  {/* Add a Video Form */}
                  <div className="bg-white">
                    <h3 className="text-base font-medium text-gray-700 mb-6">Add a video</h3>
                    
                    {/* Title */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="portfolioVideoTitle"
                        value={formData.portfolioVideoTitle}
                        onChange={handleInputChange}
                        placeholder="A title for your video."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Video URL */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Video URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          name="portfolioVideoUrl"
                          value={formData.portfolioVideoUrl}
                          onChange={handleInputChange}
                          placeholder="YouTube or Vimeo URL"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>

                      {/* Services Dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Services <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="portfolioVideoService"
                          value={formData.portfolioVideoService}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
                        >
                          <option value="">Select a category for this video.</option>
                          {serviceCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-start pt-6">
                      <button
                        onClick={handlePortfolioSave}
                        className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PilotSettings;