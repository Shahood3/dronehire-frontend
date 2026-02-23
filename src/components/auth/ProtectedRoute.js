import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute - Wrapper component to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Debug: Log every time this component renders
  useEffect(() => {
    console.log('🛡️ ProtectedRoute: Checking route protection', {
      path: location.pathname,
      hasUser: !!user,
      loading: loading,
      userEmail: user?.email
    });
  }, [location.pathname, user, loading]);

  // Show loading spinner while checking auth status
  if (loading) {
    console.log('⏳ ProtectedRoute: Still loading auth state...');
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
    console.log('❌ ProtectedRoute: No user found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  console.log('✅ ProtectedRoute: User authenticated, rendering content');
  return children;
};

/**
 * RoleBasedRoute - Protects routes based on user role
 * Redirects to appropriate dashboard if user doesn't have required role
 */
export const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Debug: Log every time this component renders
  useEffect(() => {
    console.log('🛡️ RoleBasedRoute: Checking role-based protection', {
      path: location.pathname,
      hasUser: !!user,
      userType: user?.userType,
      allowedRoles: allowedRoles,
      loading: loading
    });
  }, [location.pathname, user, loading, allowedRoles]);

  // Show loading spinner while checking auth status
  if (loading) {
    console.log('⏳ RoleBasedRoute: Still loading auth state...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log('❌ RoleBasedRoute: No user found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (!allowedRoles.includes(user.userType)) {
    console.log('❌ RoleBasedRoute: User does not have required role', {
      userType: user.userType,
      allowedRoles: allowedRoles
    });
    
    // Redirect to their correct dashboard
    const redirectPath = user.userType === 'client' 
      ? '/client/dashboard' 
      : '/pilot/dashboard';
    
    console.log('↪️ RoleBasedRoute: Redirecting to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  // User is authenticated with correct role, render the protected content
  console.log('✅ RoleBasedRoute: User authorized, rendering content');
  return children;
};

export default ProtectedRoute;