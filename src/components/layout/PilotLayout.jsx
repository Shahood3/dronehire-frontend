import React from 'react';
import { Outlet } from 'react-router-dom';
import PilotTopbar from '../common/PilotTopbar';

const PilotLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Topbar */}
      <PilotTopbar />
      
      {/* Main Content Area - pt-16 accounts for fixed topbar height */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default PilotLayout;