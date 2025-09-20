import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import './ProfileSetupModal.css';

const ProfileSetupModal = ({ isOpen, onComplete }) => {
  const { getData, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    gender: '',
    category: '',
    branch: '',
    currentYear: ''
  });

  const [errors, setErrors] = useState({});

  // Load profile data from token storage when modal opens
  useEffect(() => {
    if (isOpen && isLoggedIn) {
      const savedProfileData = getData('profile');
      if (savedProfileData) {
        setFormData({
          name: savedProfileData.name || '',
          age: savedProfileData.age || '',
          dob: savedProfileData.dob || '',
          gender: savedProfileData.gender || '',
          category: savedProfileData.category || '',
          branch: savedProfileData.branch || '',
          currentYear: savedProfileData.currentYear || ''
        });
        console.log('ProfileSetupModal: Profile data loaded from token storage:', savedProfileData);
      }
    }
  }, [isOpen, isLoggedIn, getData]);

  // Category and branch mappings
  const categoryBranches = {
    'engineering': [
      'Computer Science Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics and Communication Engineering (ECE)',
      'Mechanical Engineering (ME)',
      'Civil Engineering (CE)',
      'Electrical Engineering (EE)',
      'Chemical Engineering (CHE)',
      'Aerospace Engineering (AE)',
      'Biotechnology Engineering (BT)',
      'Other'
    ],
    'medical': [
      'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
      'BDS (Bachelor of Dental Surgery)',
      'BPT (Bachelor of Physiotherapy)',
      'B.Pharm (Bachelor of Pharmacy)',
      'B.Sc Nursing',
      'MD (Doctor of Medicine)',
      'MS (Master of Surgery)',
      'MDS (Master of Dental Surgery)',
      'Other'
    ],
    'management': [
      'MBA (Master of Business Administration)',
      'BBA (Bachelor of Business Administration)',
      'PGDM (Post Graduate Diploma in Management)',
      'Executive MBA',
      'International Business',
      'Finance',
      'Marketing',
      'Human Resources',
      'Operations',
      'Other'
    ],
    'fashion': [
      'Fashion Design',
      'Textile Design',
      'Fashion Technology',
      'Fashion Communication',
      'Fashion Merchandising',
      'Fashion Styling',
      'Fashion Photography',
      'Fashion Marketing',
      'Other'
    ],
    'other': [
      'Arts',
      'Science',
      'Commerce',
      'Law',
      'Education',
      'Social Work',
      'Journalism',
      'Mass Communication',
      'Other'
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Reset branch when category changes
    if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        category: value,
        branch: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 100) {
      newErrors.age = 'Please enter a valid age';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }

    if (!formData.currentYear) {
      newErrors.currentYear = 'Current Year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert the form data to match the expected userData structure
      const userData = {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        dob: formData.dob,
        category: formData.category,
        branch: formData.branch,
        currentYear: formData.currentYear,
        profileHeadline: `${formData.branch} Student`,
        collegeName: '',
        year: formData.currentYear,
        degree: formData.branch,
        passingYear: '',
        profilePhoto: null
      };
      
      onComplete(userData);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="profile-setup-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="profile-setup-modal"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="profile-setup-header">
          <div className="setup-icon"><i className="bi bi-person-fill"></i></div>
          <h2>Complete Your Profile</h2>
          <p>Please provide your basic information to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-setup-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={errors.age ? 'error' : ''}
                  min="1"
                  max="100"
                  placeholder="Enter your age"
                />
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dob">Date of Birth *</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={errors.dob ? 'error' : ''}
                />
                {errors.dob && <span className="error-message">{errors.dob}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Academic Information</h3>
            
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={errors.category ? 'error' : ''}
              >
                <option value="">Select Category</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="management">Management</option>
                <option value="fashion">Fashion</option>
                <option value="other">Other</option>
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="branch">Branch/Specialization *</label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className={errors.branch ? 'error' : ''}
                disabled={!formData.category}
              >
                <option value="">Select Branch</option>
                {formData.category && categoryBranches[formData.category]?.map((branch, index) => (
                  <option key={index} value={branch}>{branch}</option>
                ))}
              </select>
              {errors.branch && <span className="error-message">{errors.branch}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="currentYear">Current Year *</label>
              <select
                id="currentYear"
                name="currentYear"
                value={formData.currentYear}
                onChange={handleInputChange}
                className={errors.currentYear ? 'error' : ''}
              >
                <option value="">Select Current Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
                <option value="UG">UG</option>
                <option value="PG">PG</option>
              </select>
              {errors.currentYear && <span className="error-message">{errors.currentYear}</span>}
            </div>
          </div>

          <div className="profile-setup-actions">
            <button type="submit" className="complete-profile-btn">
              Complete Profile & Continue
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSetupModal;
