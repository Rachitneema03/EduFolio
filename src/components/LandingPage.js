import React from 'react';
import { motion } from 'framer-motion';
import logoImage from '../Assets/logo.png';
import './LandingPage.css';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="landing-page">
      {/* Background Image */}
      <div className="background-image"></div>
      
      {/* Header with Logo */}
      <motion.header 
        className="header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="logo-container">
          <img 
            src={logoImage} 
            alt="EduFolio Logo" 
            className="logo-image"
          />
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side - Text Content */}
        <motion.div 
          className="text-content"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.h1 
            className="main-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Welcome to<br />
            <span className="brand-name">EduFolio</span>
          </motion.h1>

          <motion.p 
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            THE ULTIMATE PLATFORM FOR STUDENTS AND FACULTY
          </motion.p>

          <motion.p 
            className="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            MANAGE COURSES, TRACK ACHIEVEMENTS, AND COLLABORATE ON EDUCATIONAL GOALS.
          </motion.p>

          <motion.button 
            className="cta-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(139, 69, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('/signup')}
          >
            SIGN UP NOW
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
        <motion.div 
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ↓
        </motion.div>
        <span>Scroll to explore</span>
      </motion.div>
    </div>
  );
};

export default LandingPage;
