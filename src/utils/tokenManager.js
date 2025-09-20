/**
 * Token Management Utilities
 * Handles generation, storage, validation, and destruction of authentication tokens
 */

// Generate a 16-digit hexadecimal token
export const generateToken = () => {
  const chars = '0123456789abcdef';
  let token = '';
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

// Token expiration time (6.5 days in milliseconds)
const TOKEN_EXPIRATION_TIME = 6.5 * 24 * 60 * 60 * 1000; // 6.5 days

// Store token with expiration
export const storeToken = (email, token) => {
  const tokenData = {
    token,
    email,
    createdAt: Date.now(),
    expiresAt: Date.now() + TOKEN_EXPIRATION_TIME
  };
  
  localStorage.setItem(`auth_token_${email}`, JSON.stringify(tokenData));
  localStorage.setItem('current_user_email', email);
  localStorage.setItem('current_user_token', token);
  
  return tokenData;
};

// Get token for a specific email
export const getToken = (email) => {
  const tokenData = localStorage.getItem(`auth_token_${email}`);
  if (!tokenData) return null;
  
  try {
    const parsed = JSON.parse(tokenData);
    return parsed;
  } catch (error) {
    console.error('Error parsing token data:', error);
    return null;
  }
};

// Get current user's token
export const getCurrentUserToken = () => {
  const email = localStorage.getItem('current_user_email');
  const token = localStorage.getItem('current_user_token');
  
  if (!email || !token) return null;
  
  const tokenData = getToken(email);
  if (!tokenData) return null;
  
  return {
    email,
    token,
    ...tokenData
  };
};

// Validate if token is still valid
export const isTokenValid = (email) => {
  const tokenData = getToken(email);
  if (!tokenData) return false;
  
  const now = Date.now();
  return now < tokenData.expiresAt;
};

// Check if current user is authenticated
export const isAuthenticated = () => {
  const currentUser = getCurrentUserToken();
  if (!currentUser) return false;
  
  return isTokenValid(currentUser.email);
};

// Destroy token (sign out)
export const destroyToken = (email) => {
  if (email) {
    localStorage.removeItem(`auth_token_${email}`);
  }
  
  // Clear current user data
  localStorage.removeItem('current_user_email');
  localStorage.removeItem('current_user_token');
  
  // Clear all user-specific data from localStorage
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('user_data_')) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

// Store user data with token-based key
export const storeUserData = (key, data) => {
  const currentUser = getCurrentUserToken();
  if (!currentUser) {
    console.error('No authenticated user found');
    return false;
  }
  
  const storageKey = `user_data_${currentUser.email}_${key}`;
  localStorage.setItem(storageKey, JSON.stringify({
    data,
    timestamp: Date.now(),
    token: currentUser.token
  }));
  
  return true;
};

// Retrieve user data with token-based key
export const getUserData = (key) => {
  const currentUser = getCurrentUserToken();
  if (!currentUser) {
    console.error('No authenticated user found');
    return null;
  }
  
  const storageKey = `user_data_${currentUser.email}_${key}`;
  const storedData = localStorage.getItem(storageKey);
  
  if (!storedData) return null;
  
  try {
    const parsed = JSON.parse(storedData);
    // Verify the token matches (security check)
    if (parsed.token !== currentUser.token) {
      console.error('Token mismatch - data may be corrupted');
      return null;
    }
    return parsed.data;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Remove specific user data
export const removeUserData = (key) => {
  const currentUser = getCurrentUserToken();
  if (!currentUser) {
    console.error('No authenticated user found');
    return false;
  }
  
  const storageKey = `user_data_${currentUser.email}_${key}`;
  localStorage.removeItem(storageKey);
  return true;
};

// Get all user data keys
export const getAllUserDataKeys = () => {
  const currentUser = getCurrentUserToken();
  if (!currentUser) return [];
  
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`user_data_${currentUser.email}_`)) {
      keys.push(key.replace(`user_data_${currentUser.email}_`, ''));
    }
  }
  return keys;
};

// Clean up expired tokens (utility function)
export const cleanupExpiredTokens = () => {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('auth_token_')) {
      const email = key.replace('auth_token_', '');
      if (!isTokenValid(email)) {
        keysToRemove.push(key);
      }
    }
  }
  
  keysToRemove.forEach(key => {
    const email = key.replace('auth_token_', '');
    destroyToken(email);
  });
  
  return keysToRemove.length;
};
