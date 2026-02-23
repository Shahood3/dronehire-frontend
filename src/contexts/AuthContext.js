import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          // CRITICAL FIX: Only parse and set user if both exist
          try {
            const parsedUser = JSON.parse(storedUser);
            // Validate that parsedUser has required fields
            if (parsedUser && parsedUser.email && parsedUser.userType) {
              setUser(parsedUser);
              console.log('✅ User loaded from localStorage:', parsedUser.email);
            } else {
              console.warn('⚠️ Stored user data is invalid, clearing...');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
          } catch (parseError) {
            // CRITICAL FIX: Only clear on JSON parse errors (corrupted data)
            console.error('❌ Failed to parse stored user data:', parseError);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (err) {
        // CRITICAL FIX: General errors should NOT clear localStorage
        console.error('⚠️ Auth check error (not clearing storage):', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // CRITICAL: Empty dependency array - only run once on mount

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const response = await AuthService.login(email, password);
      
      if (response.success) {
        // Validate response has required data
        if (!response.user || !response.token) {
          throw new Error('Invalid login response: missing user or token');
        }
        
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        console.log('✅ Login successful:', response.user.email);
        return { success: true };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      const message = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await AuthService.register(userData);
      
      if (response.success) {
        // Validate response has required data
        if (!response.user || !response.token) {
          throw new Error('Invalid registration response: missing user or token');
        }
        
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        console.log('✅ Registration successful:', response.user.email);
        return { success: true };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      const message = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Logging out user:', user?.email);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const clearError = () => {
    setError(null);
  };

  // Check if user is a client
  const isClient = () => {
    return user?.userType === 'client';
  };

  // Check if user is a pilot
  const isPilot = () => {
    return user?.userType === 'pilot';
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isClient,
    isPilot,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;