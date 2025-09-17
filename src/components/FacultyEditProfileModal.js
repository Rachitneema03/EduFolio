import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './EditProfileModal.css';

const FacultyEditProfileModal = ({ isOpen, onClose, onSave, userData }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    age: userData?.age || '',
    gender: userData?.gender || '',
    profileHeadline: userData?.profileHeadline || '',
    collegeName: userData?.collegeName || '',
    degree: userData?.degree || '',
    passingYear: userData?.passingYear || '',
    subjectsTaught: userData?.subjectsTaught || [],
    experience: userData?.experience || '',
    skills: userData?.skills || [],
    profilePhoto: userData?.profilePhoto || null,
    linkedinUrl: userData?.linkedinUrl || ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [linkedinError, setLinkedinError] = useState('');

  const validateLinkedInUrl = (url) => {
    if (!url) return true; // Empty URL is valid (optional field)
    
    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9-]+\/?$/;
    return linkedinPattern.test(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'linkedinUrl') {
      setLinkedinError('');
      if (value && !validateLinkedInUrl(value)) {
        setLinkedinError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/your-profile)');
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddSubject = () => {
    if (newSubject.trim() && !formData.subjectsTaught.includes(newSubject.trim())) {
      setFormData(prev => ({
        ...prev,
        subjectsTaught: [...prev.subjectsTaught, newSubject.trim()]
      }));
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subjectToRemove) => {
    setFormData(prev => ({
      ...prev,
      subjectsTaught: prev.subjectsTaught.filter(subject => subject !== subjectToRemove)
    }));
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'skill') {
        handleAddSkill();
      } else if (type === 'subject') {
        handleAddSubject();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate LinkedIn URL before submitting
    if (formData.linkedinUrl && !validateLinkedInUrl(formData.linkedinUrl)) {
      setLinkedinError('Please enter a valid LinkedIn profile URL');
      return;
    }
    
    onSave(formData);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="modal-header">
          <h2>Edit Faculty Profile</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            
            {/* Profile Photo */}
            <div className="form-group">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <div className="photo-upload-container">
                <div className="photo-preview">
                  {formData.profilePhoto ? (
                    <img 
                      src={formData.profilePhoto} 
                      alt="Profile Preview" 
                      className="preview-image"
                    />
                  ) : (
                    <div className="photo-placeholder">
                      <span>📷</span>
                      <p>No photo selected</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="profilePhoto" className="file-input-label">
                  Choose Photo
                </label>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="profileHeadline">Profile Headline</label>
                <input
                  type="text"
                  id="profileHeadline"
                  name="profileHeadline"
                  value={formData.profileHeadline}
                  onChange={handleInputChange}
                  placeholder="e.g., Professor of Computer Science"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn Profile URL</label>
              <input
                type="url"
                id="linkedinUrl"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/your-profile"
                className={linkedinError ? 'error' : ''}
              />
              {linkedinError && (
                <span className="error-message">{linkedinError}</span>
              )}
            </div>
          </div>

          {/* Educational Information */}
          <div className="form-section">
            <h3>Educational Information</h3>
            <div className="form-group">
              <label htmlFor="collegeName">College/Institute Name *</label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                required
                placeholder="e.g., International Institute of Professional Studies (IIPS) Indore"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="degree">Degree/Course *</label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Ph.D. in Computer Science"
                />
              </div>
              <div className="form-group">
                <label htmlFor="passingYear">Passing Year</label>
                <input
                  type="number"
                  id="passingYear"
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleInputChange}
                  min="1990"
                  max="2030"
                  placeholder="e.g., 2020"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <h3>Professional Information</h3>
            
            <div className="form-group">
              <label htmlFor="experience">Experience (Years) *</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                min="0"
                max="50"
                placeholder="e.g., 10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subjectsTaught">Subjects Taught</label>
              <div className="skills-input-container">
                <input
                  type="text"
                  id="subjectsTaught"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'subject')}
                  placeholder="Enter a subject and press Enter or click Add"
                />
                <button
                  type="button"
                  className="add-skill-btn"
                  onClick={handleAddSubject}
                >
                  Add
                </button>
              </div>
              {formData.subjectsTaught.length > 0 && (
                <div className="skills-list">
                  {formData.subjectsTaught.map((subject, index) => (
                    <div key={index} className="skill-tag">
                      <span>{subject}</span>
                      <button
                        type="button"
                        className="remove-skill-btn"
                        onClick={() => handleRemoveSubject(subject)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="form-section">
            <h3>Skills</h3>
            <div className="form-group">
              <label htmlFor="skills">Add Skills</label>
              <div className="skills-input-container">
                <input
                  type="text"
                  id="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'skill')}
                  placeholder="Enter a skill and press Enter or click Add"
                />
                <button
                  type="button"
                  className="add-skill-btn"
                  onClick={handleAddSkill}
                >
                  Add
                </button>
              </div>
              {formData.skills.length > 0 && (
                <div className="skills-list">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="skill-tag">
                      <span>{skill}</span>
                      <button
                        type="button"
                        className="remove-skill-btn"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FacultyEditProfileModal;
