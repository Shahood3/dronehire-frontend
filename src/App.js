import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginForm, RegisterForm, ProtectedRoute, RoleBasedRoute } from './components/auth';
import HomePage from './components/Home/HomePage';

// Layouts
import ClientLayout from './components/layout/ClientLayout';
import PilotLayout from './components/layout/PilotLayout';

// Client Pages
import ClientDashboard from './pages/Client/ClientDashboard';


// Pilot Pages
import PilotDashboard from './pages/Pilot/PilotDashboard';
import PilotSettings from './pages/Pilot/PilotSettings'; 
import PilotProfile from './pages/Pilot/PilotProfile';  // Full settings component
import {
  PilotInvoices,
  PilotJobs,
  PilotMessages,
  PilotPayments,
  PilotUpgrade
} from './pages/Pilot/PilotPages';
import PostJobForm from './pages/Client/PostJobForm';
import ClientSettings from './pages/Client/ClientSettings';
import ClientProfile from './pages/Client/ClientProfile';
import ClientPilotSearch from './pages/Client/ClientPilotSearch';
import ClientInvoices from './pages/Client/ClientInvoices;';
import ClientBilling from './pages/Client/ClientBilling';
import ClientMessages from './pages/Client/ClientMessages';


// Dashboard wrapper that redirects based on user type
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.userType === 'client') {
    return <Navigate to="/client/dashboard" replace />;
  } else if (user.userType === 'pilot') {
    return <Navigate to="/pilot/dashboard" replace />;
  }
  
  return <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Dashboard Redirect */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* ==================== CLIENT ROUTES ==================== */}
          <Route
            path="/client"
            element={
              <RoleBasedRoute allowedRoles={['client']}>
                <ClientLayout />
              </RoleBasedRoute>
            }
          >
            {/* Main Dashboard */}
            <Route path="dashboard" element={<ClientDashboard />} />
            
            {/* Job Management */}
            <Route path="post-job" element={<PostJobForm />} /> {/* Opens modal */}
            
            {/* Invoices */}
            <Route path="invoices" element={<ClientInvoices />} />
            
            {/* Pilot Search */}
            <Route path="pilot-search" element={<ClientPilotSearch />} />
            <Route path="pilot-search/saved" element={<ClientPilotSearch />} />
            <Route path="pilot-search/contacted" element={<ClientPilotSearch />} />
            
            {/* Messages */}
            <Route path="messages" element={<ClientMessages />} />
            
            {/* Profile & Settings */}
            <Route path="profile" element={<ClientProfile />} />
            <Route path="settings" element={<ClientSettings />} />
            <Route path="billing" element={<ClientBilling />} />
            
            {/* Redirect /client to /client/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* ==================== PILOT ROUTES ==================== */}
          <Route
            path="/pilot"
            element={
              <RoleBasedRoute allowedRoles={['pilot']}>
                <PilotLayout />
              </RoleBasedRoute>
            }
          >
            {/* Main Dashboard - Missions & Quotes */}
            <Route path="dashboard" element={<PilotDashboard />} />
            <Route path="inquiry" element={<PilotDashboard />} /> {/* Alternative path */}
            
            {/* Invoices */}
            <Route path="invoices" element={<PilotInvoices />} />
            
            {/* Browse Jobs */}
            <Route path="jobs" element={<PilotJobs />} />
            
            {/* Messages */}
            <Route path="messages" element={<PilotMessages />} />
            
            {/* Profile & Settings */}
            <Route path="profile" element={<PilotProfile />} />
            <Route path="settings" element={<PilotSettings />} /> {/* Full settings component */}
            <Route path="settings/general" element={<PilotSettings />} /> {/* Alternative path */}
            <Route path="settings/edit" element={<PilotSettings />} /> {/* Alternative path */}
            <Route path="accounts/general/edit" element={<PilotSettings />} /> {/* Direct URL path */}
            <Route path="payments" element={<PilotPayments />} />
            
            {/* Upgrade */}
            <Route path="upgrade" element={<PilotUpgrade />} />
            
            {/* Redirect /pilot to /pilot/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;