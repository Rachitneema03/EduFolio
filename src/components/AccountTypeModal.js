import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AccountTypeModal.css';

const AccountTypeModal = ({ isOpen, onSelectAccountType, onClose }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const handleConfirm = () => {
    if (selectedType) {
      onSelectAccountType(selectedType);
    }
  };

  const handleClose = () => {
    setSelectedType('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="account-type-modal-overlay">
      <motion.div 
        className="account-type-modal"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="account-type-modal-header">
          <h2>Select Your Account Type</h2>
          <p>Choose the type of account that best describes your role</p>
        </div>

        <div className="account-type-options">
          <motion.div 
            className={`account-type-option ${selectedType === 'student' ? 'selected' : ''}`}
            onClick={() => handleSelectType('student')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="account-type-icon">
              <i className="bi bi-person-badge-fill"></i>
            </div>
            <div className="account-type-content">
              <h3>Student</h3>
              <p>I am a student looking to track my academic progress, achievements, and build my digital portfolio.</p>
              <ul>
                <li>Track academic activities</li>
                <li>Upload certificates and achievements</li>
                <li>Generate digital portfolio</li>
                <li>Connect with peers and faculty</li>
              </ul>
            </div>
            <div className="account-type-radio">
              <div className={`radio-button ${selectedType === 'student' ? 'checked' : ''}`}>
                {selectedType === 'student' && <i className="bi bi-check"></i>}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={`account-type-option ${selectedType === 'faculty' ? 'selected' : ''}`}
            onClick={() => handleSelectType('faculty')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="account-type-icon">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <div className="account-type-content">
              <h3>Faculty</h3>
              <p>I am a faculty member or administrator looking to manage students, courses, and institutional analytics.</p>
              <ul>
                <li>Manage student activities</li>
                <li>Approve student submissions</li>
                <li>Generate institutional reports</li>
                <li>Track course analytics</li>
              </ul>
            </div>
            <div className="account-type-radio">
              <div className={`radio-button ${selectedType === 'faculty' ? 'checked' : ''}`}>
                {selectedType === 'faculty' && <i className="bi bi-check"></i>}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="account-type-modal-footer">
          <button 
            className="cancel-btn"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button 
            className={`confirm-btn ${selectedType ? 'enabled' : 'disabled'}`}
            onClick={handleConfirm}
            disabled={!selectedType}
          >
            Continue to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountTypeModal;
