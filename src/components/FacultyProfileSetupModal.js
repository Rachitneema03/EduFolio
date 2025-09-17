import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ProfileSetupModal.css';

const FacultyProfileSetupModal = ({ isOpen, onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    gender: '',
    degrees: [{ degree: '', year: '' }],
    designation: '',
    officialEmail: ''
  });

  const [errors, setErrors] = useState({});

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
  };

  const handleDegreeChange = (index, field, value) => {
    const updatedDegrees = [...formData.degrees];
    updatedDegrees[index][field] = value;
    setFormData(prev => ({
      ...prev,
      degrees: updatedDegrees
    }));
  };

  const addDegree = () => {
    setFormData(prev => ({
      ...prev,
      degrees: [...prev.degrees, { degree: '', year: '' }]
    }));
  };

  const removeDegree = (index) => {
    if (formData.degrees.length > 1) {
      const updatedDegrees = formData.degrees.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        degrees: updatedDegrees
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

    // Validate degrees
    formData.degrees.forEach((degree, index) => {
      if (!degree.degree.trim()) {
        newErrors[`degree_${index}`] = 'Degree is required';
      }
      if (!degree.year) {
        newErrors[`year_${index}`] = 'Year is required';
      }
    });

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.officialEmail.trim()) {
      newErrors.officialEmail = 'Official Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.officialEmail)) {
      newErrors.officialEmail = 'Please enter a valid email address';
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
        degrees: formData.degrees,
        designation: formData.designation,
        officialEmail: formData.officialEmail,
        department: '',
        experience: '',
        profilePhoto: null,
        linkedinUrl: ''
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
          <div className="setup-icon"><i className="bi bi-mortarboard-fill"></i></div>
          <h2>Complete Your Faculty Profile</h2>
          <p>Please provide your professional information to get started</p>
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
            <h3>Professional Information</h3>
            
            <div className="degrees-section">
              <div className="section-header">
                <label>Degrees *</label>
                <button type="button" onClick={addDegree} className="add-degree-btn">
                  <i className="bi bi-plus-circle"></i> Add Degree
                </button>
              </div>
              
              {formData.degrees.map((degree, index) => (
                <div key={index} className="degree-row">
                  <div className="form-group">
                    <input
                      type="text"
                      value={degree.degree}
                      onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
                      className={errors[`degree_${index}`] ? 'error' : ''}
                      placeholder="e.g., Ph.D. in Computer Science"
                    />
                    {errors[`degree_${index}`] && <span className="error-message">{errors[`degree_${index}`]}</span>}
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="number"
                      value={degree.year}
                      onChange={(e) => handleDegreeChange(index, 'year', e.target.value)}
                      className={errors[`year_${index}`] ? 'error' : ''}
                      placeholder="Year"
                      min="1950"
                      max="2024"
                    />
                    {errors[`year_${index}`] && <span className="error-message">{errors[`year_${index}`]}</span>}
                  </div>
                  
                  {formData.degrees.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeDegree(index)}
                      className="remove-degree-btn"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="form-group">
              <label htmlFor="designation">Designation at Work *</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className={errors.designation ? 'error' : ''}
                placeholder="e.g., Professor, Assistant Professor, Head of Department"
              />
              {errors.designation && <span className="error-message">{errors.designation}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="officialEmail">Official Email ID *</label>
              <input
                type="email"
                id="officialEmail"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleInputChange}
                className={errors.officialEmail ? 'error' : ''}
                placeholder="e.g., john.doe@university.edu"
              />
              {errors.officialEmail && <span className="error-message">{errors.officialEmail}</span>}
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

export default FacultyProfileSetupModal;
