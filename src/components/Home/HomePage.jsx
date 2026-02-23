import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
            🚁
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
            DroneHire
          </h1>
        </div>
        <p className="text-gray-400 mb-8 text-lg">Connect with Professional Drone Pilots</p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/login" 
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-3 bg-gray-800 border border-gray-700 text-white font-semibold rounded-xl hover:bg-gray-700 hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;