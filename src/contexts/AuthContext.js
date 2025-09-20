import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  isAuthenticated, 
  getCurrentUserToken, 
  storeUserData, 
  getUserData,
  removeUserData,
  getAllUserDataKeys 
} from '../utils/tokenManager';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authenticated = isAuthenticated();
      if (authenticated) {
        const currentUser = getCurrentUserToken();
        setUser(currentUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // Store data with token-based key
  const storeData = (key, data) => {
    if (!isLoggedIn) {
      console.error('User must be logged in to store data');
      return false;
    }
    return storeUserData(key, data);
  };

  // Retrieve data with token-based key
  const getData = (key) => {
    if (!isLoggedIn) {
      console.error('User must be logged in to retrieve data');
      return null;
    }
    return getUserData(key);
  };

  // Remove specific data
  const removeData = (key) => {
    if (!isLoggedIn) {
      console.error('User must be logged in to remove data');
      return false;
    }
    return removeUserData(key);
  };

  // Get all data keys for current user
  const getAllDataKeys = () => {
    if (!isLoggedIn) {
      return [];
    }
    return getAllUserDataKeys();
  };

  // Update authentication status (called after login/logout)
  const updateAuthStatus = () => {
    checkAuthStatus();
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    storeData,
    getData,
    removeData,
    getAllDataKeys,
    updateAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
