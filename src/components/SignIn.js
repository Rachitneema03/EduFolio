import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AccountTypeModal from './AccountTypeModal';
import { generateToken, storeToken, isAuthenticated } from '../utils/tokenManager';
import { useAuth } from '../contexts/AuthContext';
import './AuthPages.css';

const SignIn = ({ onNavigate }) => {
  const { updateAuthStatus } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in data:', formData);
    
    // Generate and store authentication token
    const token = generateToken();
    const tokenData = storeToken(formData.email, token);
    
    console.log('Generated token:', token);
    console.log('Token data:', tokenData);
    
    // Store user basic info for the session
    localStorage.setItem('user_email', formData.email);
    localStorage.setItem('user_remember_me', formData.rememberMe);
    
    // Update auth context
    updateAuthStatus();
    
    // Show account type modal after successful login
    setShowAccountTypeModal(true);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Sign in with ${provider}`);
    
    // For social login, we'll use a placeholder email
    // In a real app, you'd get the actual email from the social provider
    const socialEmail = `social_${provider.toLowerCase()}_user@example.com`;
    
    // Generate and store authentication token for social login
    const token = generateToken();
    const tokenData = storeToken(socialEmail, token);
    
    console.log('Social login token:', token);
    console.log('Social login token data:', tokenData);
    
    // Store user basic info for the session
    localStorage.setItem('user_email', socialEmail);
    localStorage.setItem('user_social_provider', provider);
    
    // Update auth context
    updateAuthStatus();
    
    // Show account type modal after successful social login
    setShowAccountTypeModal(true);
  };

  const handleAccountTypeSelect = (accountType) => {
    setShowAccountTypeModal(false);
    // Redirect to appropriate dashboard based on selected account type
    if (accountType === 'faculty') {
      onNavigate('/faculty-dashboard');
    } else if (accountType === 'admin') {
      onNavigate('/admin-dashboard');
    } else {
      onNavigate('/dashboard');
    }
  };

  const handleCloseAccountTypeModal = () => {
    setShowAccountTypeModal(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div 
            className="auth-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Please sign in to continue to your dashboard.</p>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div 
            className="social-login-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button 
              className="social-btn google-btn"
              onClick={() => handleSocialLogin('Google')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="social-icon google-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              Sign in with Google
            </motion.button>


          </motion.div>

          {/* Separator */}
          <motion.div 
            className="separator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="separator-line"></div>
            <span className="separator-text">or continue with</span>
            <div className="separator-line"></div>
          </motion.div>

          {/* Email and Password Form */}
          <motion.form 
            className="auth-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>


            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Remember me</span>
              </label>

              <button className="forgot-password">Forgot your password?</button>
            </div>

            <motion.button 
              type="submit" 
              className="auth-submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign in
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div 
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p>Don't have an account? <button onClick={() => onNavigate('/signup')} className="auth-link">Sign up</button></p>
          </motion.div>
        </motion.div>
      </div>

      {/* Account Type Modal */}
      <AccountTypeModal
        isOpen={showAccountTypeModal}
        onSelectAccountType={handleAccountTypeSelect}
        onClose={handleCloseAccountTypeModal}
      />
    </div>
  );
};

export default SignIn;
