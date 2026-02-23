import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientTopbar from '../common/ClientTopbar';

const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Fixed Topbar */}
      <ClientTopbar />
      
      {/* Main Content Area - pt-16 accounts for fixed topbar height */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;