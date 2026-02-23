import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    experience: '',
    droneTypes: '',
    certifications: '',
    location: '',
    companyName: '',
    industry: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (error) {
      clearError();
    }
  };

  const selectUserType = (type) => {
    setFormData(prev => ({
      ...prev,
      userType: type
    }));
    setStep(2);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) {
      errors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (formData.userType === 'pilot') {
      if (!formData.location) {
        errors.location = 'Location is required';
      }
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const userData = {
      userType: formData.userType,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      location: formData.location,
      ...(formData.userType === 'pilot' && {
        experience: formData.experience,
        droneTypes: formData.droneTypes,
        certifications: formData.certifications
      }),
      ...(formData.userType === 'client' && {
        companyName: formData.companyName,
        industry: formData.industry
      })
    };

    const result = await register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setFormErrors({});
    }
  };

  // Step 1: User Type Selection
  const renderUserTypeSelection = () => (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
            🚁
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
            DroneHire
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Join DroneHire</h1>
        <p className="text-gray-400">Choose how you want to use DroneHire</p>
      </div>

      {/* User Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Client Card */}
        <button
          onClick={() => selectUserType('client')}
          className="group p-6 bg-gray-900/50 border-2 border-gray-700 rounded-2xl text-left hover:border-teal-500 hover:bg-teal-500/5 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
            I'm a Client
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            I want to hire drone pilots for my projects
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Post unlimited jobs
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Browse pilot portfolios
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Secure payments
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Review & rate pilots
            </li>
          </ul>
        </button>

        {/* Pilot Card */}
        <button
          onClick={() => selectUserType('pilot')}
          className="group p-6 bg-gray-900/50 border-2 border-gray-700 rounded-2xl text-left hover:border-teal-500 hover:bg-teal-500/5 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">🚁</div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
            I'm a Drone Pilot
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            I want to find drone jobs and grow my business
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Browse available jobs
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Showcase your portfolio
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Get paid securely
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-400">✓</span> Build your reputation
            </li>
          </ul>
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );

  // Step 2: Registration Form
  const renderRegistrationForm = () => (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6 relative">
        <button 
          onClick={goBack}
          className="absolute left-0 top-0 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-white transition-all duration-300"
        >
          ← Back
        </button>
        <div className="flex items-center justify-center gap-2 mb-4 pt-10 md:pt-0">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center text-xl">
            🚁
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
            DroneHire
          </span>
        </div>
        <h1 className="text-xl font-bold text-white mb-1">
          Create {formData.userType === 'client' ? 'Client' : 'Pilot'} Account
        </h1>
        <p className="text-gray-400 text-sm">Fill in your details to get started</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400">
          <span className="text-xl">⚠️</span>
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
            Basic Information
          </h3>
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">👤</span>
              <input
                type="text"
                id="name"
                name="name"
                className={`w-full pl-12 pr-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  formErrors.name 
                    ? 'border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-700 focus:border-teal-500 focus:ring-teal-500/30'
                }`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {formErrors.name && <p className="mt-2 text-sm text-red-400">{formErrors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full pl-12 pr-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  formErrors.email 
                    ? 'border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-700 focus:border-teal-500 focus:ring-teal-500/30'
                }`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {formErrors.email && <p className="mt-2 text-sm text-red-400">{formErrors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📱</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`w-full pl-12 pr-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  formErrors.phone 
                    ? 'border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-700 focus:border-teal-500 focus:ring-teal-500/30'
                }`}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {formErrors.phone && <p className="mt-2 text-sm text-red-400">{formErrors.phone}</p>}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-2">
              Location {formData.userType === 'pilot' ? '*' : ''}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📍</span>
              <input
                type="text"
                id="location"
                name="location"
                className={`w-full pl-12 pr-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  formErrors.location 
                    ? 'border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-700 focus:border-teal-500 focus:ring-teal-500/30'
                }`}
                placeholder="e.g., Mumbai, Maharashtra"
                value={formData.location}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {formErrors.location && <p className="mt-2 text-sm text-red-400">{formErrors.location}</p>}
          </div>
        </div>

        {/* Pilot Specific Fields */}
        {formData.userType === 'pilot' && (
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
              Pilot Details
            </h3>
            
            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-400 mb-2">
                Years of Experience
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">⏱️</span>
                <select
                  id="experience"
                  name="experience"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:border-teal-500 focus:ring-teal-500/30 transition-all duration-300 appearance-none cursor-pointer"
                  value={formData.experience}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="" className="bg-gray-900">Select experience</option>
                  <option value="0-1" className="bg-gray-900">Less than 1 year</option>
                  <option value="1-3" className="bg-gray-900">1-3 years</option>
                  <option value="3-5" className="bg-gray-900">3-5 years</option>
                  <option value="5+" className="bg-gray-900">5+ years</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">▼</span>
              </div>
            </div>

            {/* Drone Types */}
            <div>
              <label htmlFor="droneTypes" className="block text-sm font-medium text-gray-400 mb-2">
                Drone Types (comma separated)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🚁</span>
                <input
                  type="text"
                  id="droneTypes"
                  name="droneTypes"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-teal-500 focus:ring-teal-500/30 transition-all duration-300"
                  placeholder="e.g., DJI Mavic 3, Phantom 4 Pro"
                  value={formData.droneTypes}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Certifications */}
            <div>
              <label htmlFor="certifications" className="block text-sm font-medium text-gray-400 mb-2">
                Certifications
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📜</span>
                <input
                  type="text"
                  id="certifications"
                  name="certifications"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-teal-500 focus:ring-teal-500/30 transition-all duration-300"
                  placeholder="e.g., DGCA Remote Pilot Certificate"
                  value={formData.certifications}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        )}

        {/* Client Specific Fields */}
        {formData.userType === 'client' && (
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
              Company Details (Optional)
            </h3>
            
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-400 mb-2">
                Company Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🏢</span>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-teal-500 focus:ring-teal-500/30 transition-all duration-300"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-400 mb-2">
                Industry
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📊</span>
                <select
                  id="industry"
                  name="industry"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:border-teal-500 focus:ring-teal-500/30 transition-all duration-300 appearance-none cursor-pointer"
                  value={formData.industry}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="" className="bg-gray-900">Select industry</option>
                  <option value="real-estate" className="bg-gray-900">Real Estate</option>
                  <option value="construction" className="bg-gray-900">Construction</option>
                  <option value="agriculture" className="bg-gray-900">Agriculture</option>
                  <option value="media" className="bg-gray-900">Media & Entertainment</option>
                  <option value="events" className="bg-gray-900">Events & Weddings</option>
                  <option value="infrastructure" className="bg-gray-900">Infrastructure</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">▼</span>
              </div>
            </div>
          </div>
        )}

        {/* Password Section */}
        <div className="space-y-4 pt-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
            Security
          </h3>
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
              Password *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`w-full pl-12 pr-12 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  formErrors.password 
                    ? 'border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-700 focus:border-teal-500 focus:ring-teal-500/30'
                }`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {formErrors.password && <p className="mt-2 text-sm text-red-400">{formErrors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔒</span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className={`w-full pl-12 pr-12 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  formErrors.confirmPassword 
                    ? 'border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-700 focus:border-teal-500 focus:ring-teal-500/30'
                }`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {formErrors.confirmPassword && <p className="mt-2 text-sm text-red-400">{formErrors.confirmPassword}</p>}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div>
          <label className={`flex items-start gap-3 cursor-pointer group ${formErrors.agreeToTerms ? 'text-red-400' : ''}`}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-900/50 text-teal-500 focus:ring-teal-500/30 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              I agree to the{' '}
              <Link to="/terms" className="text-teal-400 hover:text-teal-300">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-teal-400 hover:text-teal-300">Privacy Policy</Link>
            </span>
          </label>
          {formErrors.agreeToTerms && <p className="mt-2 text-sm text-red-400">{formErrors.agreeToTerms}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {step === 1 ? renderUserTypeSelection() : renderRegistrationForm()}
      </div>
    </div>
  );
};

export default RegisterForm;