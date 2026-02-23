import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * RoleBasedRoute - Wrapper component to protect routes based on user role
 * 
 * Usage:
 * <RoleBasedRoute allowedRoles={['client']}>
 *   <ClientDashboard />
 * </RoleBasedRoute>
 * 
 * <RoleBasedRoute allowedRoles={['pilot']}>
 *   <PilotDashboard />
 * </RoleBasedRoute>
 */
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user's role is in the allowed roles
  const userRole = user.userType;
  const hasAccess = Array.isArray(allowedRoles) 
    ? allowedRoles.includes(userRole)
    : allowedRoles === userRole;

  // Redirect if role doesn't match
  if (!hasAccess) {
    if (userRole === 'client') {
      return <Navigate to="/client/dashboard" replace />;
    } else if (userRole === 'pilot') {
      return <Navigate to="/pilot/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

/**
 * ClientRoute - Shorthand for client-only routes
 */
export const ClientRoute = ({ children }) => {
  return (
    <RoleBasedRoute allowedRoles={['client']}>
      {children}
    </RoleBasedRoute>
  );
};

/**
 * PilotRoute - Shorthand for pilot-only routes
 */
export const PilotRoute = ({ children }) => {
  return (
    <RoleBasedRoute allowedRoles={['pilot']}>
      {children}
    </RoleBasedRoute>
  );
};

export default RoleBasedRoute;