import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { destroyToken, getCurrentUserToken } from '../utils/tokenManager';
import { useAuth } from '../contexts/AuthContext';
import dashboardLogo from '../Assets/dashboard-logo.png';
import logoDark from '../Assets/logo-dark.png';
import './AdminDashboard.css';
import './StudentDashboard.css'; // Import for consistent profile styling

const AdminDashboard = ({ onNavigate }) => {
  const { updateAuthStatus, storeData, getData, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCollegeRegistrationOpen, setIsCollegeRegistrationOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Admin profile data
  const [adminProfile, setAdminProfile] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    phone: '',
    address: '',
    instituteName: '',
    instituteAddress: '',
    institutePhone: '',
    instituteEmail: '',
    verificationDocuments: [],
    verificationStatus: 'pending'
  });
  
  // Mock data for students and faculty
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@university.edu",
      department: "Computer Science",
      year: "3rd Year",
      status: "active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      department: "Computer Science",
      year: "2nd Year",
      status: "active"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@university.edu",
      department: "Information Technology",
      year: "4th Year",
      status: "active"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@university.edu",
      department: "Electronics",
      year: "1st Year",
      status: "active"
    }
  ]);

  const [faculty, setFaculty] = useState([
    {
      id: 1,
      name: "Dr. Robert Brown",
      email: "robert.brown@university.edu",
      department: "Computer Science",
      designation: "Professor",
      status: "active"
    },
    {
      id: 2,
      name: "Dr. Emily Davis",
      email: "emily.davis@university.edu",
      department: "Information Technology",
      designation: "Associate Professor",
      status: "active"
    },
    {
      id: 3,
      name: "Dr. Michael Garcia",
      email: "michael.garcia@university.edu",
      department: "Electronics",
      designation: "Assistant Professor",
      status: "active"
    }
  ]);

  // College registration form data
  const [collegeData, setCollegeData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    establishedYear: '',
    accreditation: '',
    principalName: '',
    principalEmail: '',
    principalPhone: '',
    courses: []
  });

  // Load data from token storage on component mount
  useEffect(() => {
    if (isLoggedIn) {
      const savedStudentsData = getData('admin_students');
      if (savedStudentsData) {
        setStudents(savedStudentsData);
      }
      
      const savedFacultyData = getData('admin_faculty');
      if (savedFacultyData) {
        setFaculty(savedFacultyData);
      }
      
      const savedAdminProfile = getData('admin_profile');
      if (savedAdminProfile) {
        setAdminProfile(savedAdminProfile);
      }
    }
  }, [isLoggedIn, getData]);

  // Save data to token storage whenever data changes
  useEffect(() => {
    if (isLoggedIn && students.length > 0) {
      storeData('admin_students', students);
    }
  }, [students, isLoggedIn, storeData]);

  useEffect(() => {
    if (isLoggedIn && faculty.length > 0) {
      storeData('admin_faculty', faculty);
    }
  }, [faculty, isLoggedIn, storeData]);

  useEffect(() => {
    if (isLoggedIn && adminProfile.name) {
      storeData('admin_profile', adminProfile);
    }
  }, [adminProfile, isLoggedIn, storeData]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


  const handleSignOut = () => {
    const currentUser = getCurrentUserToken();
    
    if (currentUser) {
      destroyToken(currentUser.email);
    }
    
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_first_name');
    localStorage.removeItem('user_last_name');
    localStorage.removeItem('user_remember_me');
    localStorage.removeItem('user_social_provider');
    
    console.log('Admin user signed out successfully');
    
    updateAuthStatus();
    
    if (onNavigate) {
      onNavigate('/signin');
    }
  };

  const handleViewProfile = (user) => {
    console.log('View profile for:', user.name);
  };

  const handleCollegeRegistration = () => {
    setIsCollegeRegistrationOpen(true);
  };

  const handleCollegeRegistrationSubmit = (e) => {
    e.preventDefault();
    console.log('College registration data:', collegeData);
    alert('College registration submitted successfully!');
    setIsCollegeRegistrationOpen(false);
    setCollegeData({
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      website: '',
      establishedYear: '',
      accreditation: '',
      principalName: '',
      principalEmail: '',
      principalPhone: '',
      courses: []
    });
  };

  const handleCollegeDataChange = (e) => {
    const { name, value } = e.target;
    setCollegeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCourse = () => {
    setCollegeData(prev => ({
      ...prev,
      courses: [...prev.courses, { id: Date.now(), name: '', duration: '', description: '' }]
    }));
  };

  const handleRemoveCourse = (courseId) => {
    setCollegeData(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.id !== courseId)
    }));
  };

  const handleCourseChange = (courseId, field, value) => {
    setCollegeData(prev => ({
      ...prev,
      courses: prev.courses.map(course =>
        course.id === courseId ? { ...course, [field]: value } : course
      )
    }));
  };


  const handleGenerateReport = () => {
    console.log('Generating NAAC report...');
    alert('NAAC report generated and exported successfully!');
  };

  const handleProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      uploadDate: new Date().toISOString()
    }));
    
    setAdminProfile(prev => ({
      ...prev,
      verificationDocuments: [...prev.verificationDocuments, ...newDocuments]
    }));
  };

  const handleRemoveDocument = (documentId) => {
    setAdminProfile(prev => ({
      ...prev,
      verificationDocuments: prev.verificationDocuments.filter(doc => doc.id !== documentId)
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Admin profile submitted:', adminProfile);
    alert('Profile updated successfully! Verification documents submitted for review.');
    setIsProfileModalOpen(false);
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <AdminProfileContent 
          adminProfile={adminProfile}
          onEditProfile={handleProfileModal}
        />;
      case 'user-management':
        return <UserManagementContent 
          students={students}
          faculty={faculty}
          onViewProfile={handleViewProfile}
        />;
      case 'naac-reports':
        return <NAACReportsContent onGenerateReport={handleGenerateReport} isDarkMode={isDarkMode} />;
      default:
        return <AdminProfileContent 
          adminProfile={adminProfile}
          onEditProfile={handleProfileModal}
        />;
    }
  };

  return (
    <div className={`admin-dashboard ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Header */}
      <motion.header 
        className="admin-dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="admin-header-left">
          <div className="admin-dashboard-logo-container">
            <img 
              src={isDarkMode ? dashboardLogo : logoDark} 
              alt="EduFolio Logo" 
              className="admin-dashboard-logo"
            />
          </div>
          <div className="admin-header-title">
            <h1>Administrator Panel</h1>
          </div>
        </div>
        
        <div className="admin-header-right">
          <button className="admin-theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>}
          </button>

          <button className="admin-college-registration-btn" onClick={handleCollegeRegistration}>
            <i className="bi bi-building"></i>
            Register College
          </button>
        </div>
      </motion.header>

      <div className="admin-dashboard-content">
        {/* Tabs */}
        <motion.div 
          className="admin-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button 
            className={`admin-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="bi bi-person-fill"></i>
            My Profile
          </button>
          <button 
            className={`admin-tab ${activeTab === 'user-management' ? 'active' : ''}`}
            onClick={() => setActiveTab('user-management')}
          >
            <i className="bi bi-people-fill"></i>
            User Management
          </button>
          <button 
            className={`admin-tab ${activeTab === 'naac-reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('naac-reports')}
          >
            <i className="bi bi-file-earmark-text"></i>
            NAAC Reports
          </button>
        </motion.div>

        {/* Main Content */}
        <motion.main 
          className="admin-main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {renderContent()}
        </motion.main>
      </div>


      {/* College Registration Modal */}
      {isCollegeRegistrationOpen && (
        <div className="admin-college-modal-overlay" onClick={() => setIsCollegeRegistrationOpen(false)}>
          <div className="admin-college-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-college-modal-header">
              <h3>College Registration</h3>
              <button 
                className="admin-close-btn"
                onClick={() => setIsCollegeRegistrationOpen(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCollegeRegistrationSubmit} className="admin-college-form">
              <div className="admin-form-section">
                <h4>College Information</h4>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>College Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={collegeData.name}
                      onChange={handleCollegeDataChange}
                      required
                      placeholder="Enter college name"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Established Year *</label>
                    <input
                      type="number"
                      name="establishedYear"
                      value={collegeData.establishedYear}
                      onChange={handleCollegeDataChange}
                      required
                      placeholder="e.g., 1995"
                    />
                  </div>
                </div>
                
                <div className="admin-form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={collegeData.address}
                    onChange={handleCollegeDataChange}
                    required
                    placeholder="Enter complete address"
                    rows="3"
                  />
                </div>
                
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={collegeData.city}
                      onChange={handleCollegeDataChange}
                      required
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={collegeData.state}
                      onChange={handleCollegeDataChange}
                      required
                      placeholder="Enter state"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={collegeData.pincode}
                      onChange={handleCollegeDataChange}
                      required
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>
                
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={collegeData.phone}
                      onChange={handleCollegeDataChange}
                      required
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={collegeData.email}
                      onChange={handleCollegeDataChange}
                      required
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      value={collegeData.website}
                      onChange={handleCollegeDataChange}
                      placeholder="Enter website URL"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Accreditation</label>
                    <input
                      type="text"
                      name="accreditation"
                      value={collegeData.accreditation}
                      onChange={handleCollegeDataChange}
                      placeholder="e.g., NAAC A+"
                    />
                  </div>
                </div>
              </div>
              
              <div className="admin-form-section">
                <h4>Principal Information</h4>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Principal Name *</label>
                    <input
                      type="text"
                      name="principalName"
                      value={collegeData.principalName}
                      onChange={handleCollegeDataChange}
                      required
                      placeholder="Enter principal name"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Principal Email *</label>
                    <input
                      type="email"
                      name="principalEmail"
                      value={collegeData.principalEmail}
                      onChange={handleCollegeDataChange}
                      required
                      placeholder="Enter principal email"
                    />
                  </div>
                </div>
                
                <div className="admin-form-group">
                  <label>Principal Phone *</label>
                  <input
                    type="tel"
                    name="principalPhone"
                    value={collegeData.principalPhone}
                    onChange={handleCollegeDataChange}
                    required
                    placeholder="Enter principal phone"
                  />
                </div>
              </div>

              {/* Courses Section */}
              <div className="admin-form-section">
                <h4>Courses Offered</h4>
                <div className="admin-form-group">
                  <button 
                    type="button"
                    className="admin-add-btn"
                    onClick={handleAddCourse}
                  >
                    <i className="bi bi-plus-circle"></i>
                    Add Course
                  </button>
                </div>
                
                {collegeData.courses.map((course, index) => (
                  <div key={course.id} className="admin-dynamic-item">
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Course Name *</label>
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                          required
                          placeholder="e.g., Computer Science Engineering"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Duration *</label>
                        <input
                          type="text"
                          value={course.duration}
                          onChange={(e) => handleCourseChange(course.id, 'duration', e.target.value)}
                          required
                          placeholder="e.g., 4 Years"
                        />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Description</label>
                      <textarea
                        value={course.description}
                        onChange={(e) => handleCourseChange(course.id, 'description', e.target.value)}
                        placeholder="Brief description of the course"
                        rows="2"
                      />
                    </div>
                    <button 
                      type="button"
                      className="admin-remove-btn"
                      onClick={() => handleRemoveCourse(course.id)}
                    >
                      <i className="bi bi-trash"></i>
                      Remove Course
                    </button>
                  </div>
                ))}
              </div>

              
              <div className="admin-college-modal-footer">
                <button 
                  type="button"
                  className="admin-cancel-btn"
                  onClick={() => setIsCollegeRegistrationOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="admin-save-btn"
                >
                  Register College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Profile Modal */}
      {isProfileModalOpen && (
        <div className="admin-profile-modal-overlay" onClick={handleProfileModalClose}>
          <div className="admin-profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-profile-modal-header">
              <h3>Administrator Profile & Verification</h3>
              <button 
                className="admin-close-btn"
                onClick={handleProfileModalClose}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleProfileSubmit} className="admin-profile-form">
              <div className="admin-profile-section">
                <h4>Personal Information</h4>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={adminProfile.name}
                      onChange={handleProfileDataChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={adminProfile.email}
                      onChange={handleProfileDataChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Designation *</label>
                    <input
                      type="text"
                      name="designation"
                      value={adminProfile.designation}
                      onChange={handleProfileDataChange}
                      required
                      placeholder="e.g., Principal, Registrar, Director"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      name="department"
                      value={adminProfile.department}
                      onChange={handleProfileDataChange}
                      placeholder="Enter department"
                    />
                  </div>
                </div>
                
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={adminProfile.phone}
                      onChange={handleProfileDataChange}
                      required
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={adminProfile.address}
                      onChange={handleProfileDataChange}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>
              
              <div className="admin-profile-section">
                <h4>Institute Information</h4>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Institute Name *</label>
                    <input
                      type="text"
                      name="instituteName"
                      value={adminProfile.instituteName}
                      onChange={handleProfileDataChange}
                      required
                      placeholder="Enter institute name"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Institute Phone *</label>
                    <input
                      type="tel"
                      name="institutePhone"
                      value={adminProfile.institutePhone}
                      onChange={handleProfileDataChange}
                      required
                      placeholder="Enter institute phone"
                    />
                  </div>
                </div>
                
                <div className="admin-form-group">
                  <label>Institute Address *</label>
                  <textarea
                    name="instituteAddress"
                    value={adminProfile.instituteAddress}
                    onChange={handleProfileDataChange}
                    required
                    placeholder="Enter complete institute address"
                    rows="3"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label>Institute Email *</label>
                  <input
                    type="email"
                    name="instituteEmail"
                    value={adminProfile.instituteEmail}
                    onChange={handleProfileDataChange}
                    required
                    placeholder="Enter institute email"
                  />
                </div>
              </div>
              
              <div className="admin-profile-section">
                <h4>Verification Documents</h4>
                <p className="admin-verification-note">
                  Upload official documents to verify your identity and institutional affiliation. 
                  Required documents: ID proof, appointment letter, and institute authorization letter.
                </p>
                
                <div className="admin-document-upload">
                  <input
                    type="file"
                    id="document-upload"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleDocumentUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="document-upload" className="admin-upload-btn">
                    <i className="bi bi-cloud-upload"></i>
                    Upload Documents
                  </label>
                </div>
                
                {adminProfile.verificationDocuments.length > 0 && (
                  <div className="admin-documents-list">
                    <h5>Uploaded Documents:</h5>
                    {adminProfile.verificationDocuments.map(doc => (
                      <div key={doc.id} className="admin-document-item">
                        <div className="admin-document-info">
                          <i className="bi bi-file-earmark-text"></i>
                          <span className="admin-document-name">{doc.name}</span>
                          <span className="admin-document-size">({(doc.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          type="button"
                          className="admin-remove-document-btn"
                          onClick={() => handleRemoveDocument(doc.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="admin-profile-modal-footer">
                <button 
                  type="button"
                  className="admin-cancel-btn"
                  onClick={handleProfileModalClose}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="admin-save-btn"
                >
                  Save Profile & Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Admin Profile Content Component
const AdminProfileContent = ({ adminProfile, onEditProfile }) => {
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A';
  };

  const getVerificationStatusColor = (status) => {
    switch (status) {
      case 'verified': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getVerificationStatusText = (status) => {
    switch (status) {
      case 'verified': return 'Verified';
      case 'pending': return 'Pending Review';
      case 'rejected': return 'Rejected';
      default: return 'Not Submitted';
    }
  };

  return (
    <div className="profile-content">
      <div className="profile-card">
        <div className="profile-main">
          <div className="profile-left">
            <div className="profile-avatar-large">
              {adminProfile.profilePhoto ? (
                <img 
                  src={adminProfile.profilePhoto} 
                  alt="Profile" 
                  className="profile-photo"
                />
              ) : (
                <div className="avatar-circle">{getInitials(adminProfile.name)}</div>
              )}
              <div className="profile-edit-icon" onClick={onEditProfile}>
                <i className="bi bi-pencil-square"></i>
              </div>
            </div>
            <h2 className="username">{adminProfile.name || 'Administrator'}</h2>
            {adminProfile.designation && (
              <p className="profile-headline">{adminProfile.designation}</p>
            )}
          </div>
          
          <div className="profile-center">
            <div className="institution-info">
              {adminProfile.instituteName && (
                <div className="institution">
                  <span className="institution-label">Institution:</span>
                  <span className="institution-value">{adminProfile.instituteName}</span>
                </div>
              )}
              {adminProfile.department && (
                <div className="institution">
                  <span className="institution-label">Department:</span>
                  <span className="institution-value">{adminProfile.department}</span>
                </div>
              )}
              {adminProfile.email && (
                <div className="institution">
                  <span className="institution-label">Email:</span>
                  <span className="institution-value">{adminProfile.email}</span>
                </div>
              )}
              {adminProfile.phone && (
                <div className="institution">
                  <span className="institution-label">Phone:</span>
                  <span className="institution-value">{adminProfile.phone}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="profile-right">
            <button 
              className="edit-profile-btn"
              onClick={onEditProfile}
            >
              <i className="bi bi-pencil-square"></i>
              Edit Profile
            </button>
            
            <div className="profile-stats">
              <div className="stat-section">
                <span className="stat-label">Verification Status</span>
                <div className="stat-value" style={{ color: getVerificationStatusColor(adminProfile.verificationStatus) }}>
                  {getVerificationStatusText(adminProfile.verificationStatus)}
                </div>
              </div>
              <div className="stat-section">
                <span className="stat-label">Documents</span>
                <span className="stat-value">{adminProfile.verificationDocuments.length}</span>
              </div>
              <div className="stat-section">
                <span className="stat-label">Account Type</span>
                <span className="stat-value">Administrator</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-bottom">
          <div className="verification-status-info">
            {adminProfile.verificationStatus === 'pending' && (
              <p className="verification-note">
                <i className="bi bi-clock"></i>
                Your verification documents are under review. This process typically takes 2-3 business days.
              </p>
            )}
            {adminProfile.verificationStatus === 'rejected' && (
              <p className="verification-note verification-error">
                <i className="bi bi-exclamation-triangle"></i>
                Your verification was rejected. Please review the requirements and resubmit your documents.
              </p>
            )}
            {adminProfile.verificationStatus === 'verified' && (
              <p className="verification-note verification-success">
                <i className="bi bi-check-circle"></i>
                Your account has been verified. You have full access to all administrative features.
              </p>
            )}
            {(!adminProfile.verificationStatus || adminProfile.verificationStatus === 'not-submitted') && (
              <p className="verification-note">
                <i className="bi bi-info-circle"></i>
                Please complete your profile and upload verification documents to get started.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information Cards */}
      <div className="profile-additional-info">
        <div className="info-card">
          <h3>Institute Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Institute Name</span>
              <span className="info-value">{adminProfile.instituteName || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Institute Phone</span>
              <span className="info-value">{adminProfile.institutePhone || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Institute Email</span>
              <span className="info-value">{adminProfile.instituteEmail || 'Not provided'}</span>
            </div>
            <div className="info-item info-item-full">
              <span className="info-label">Institute Address</span>
              <span className="info-value">{adminProfile.instituteAddress || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {adminProfile.verificationDocuments.length > 0 && (
          <div className="info-card">
            <h3>Verification Documents</h3>
            <div className="documents-grid">
              {adminProfile.verificationDocuments.map(doc => (
                <div key={doc.id} className="document-item">
                  <div className="document-icon">
                    <i className="bi bi-file-earmark-text"></i>
                  </div>
                  <div className="document-details">
                    <h4>{doc.name}</h4>
                    <p>{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="document-date">
                      Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// User Management Content Component
const UserManagementContent = ({ students, faculty, onViewProfile }) => {
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [facultySearchQuery, setFacultySearchQuery] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
    student.department.toLowerCase().includes(studentSearchQuery.toLowerCase())
  );

  const filteredFaculty = faculty.filter(facultyMember =>
    facultyMember.name.toLowerCase().includes(facultySearchQuery.toLowerCase()) ||
    facultyMember.email.toLowerCase().includes(facultySearchQuery.toLowerCase()) ||
    facultyMember.department.toLowerCase().includes(facultySearchQuery.toLowerCase())
  );

  return (
    <div className="admin-user-management-content">
      {/* Manage Students Section */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">Manage Students</h2>
          <div className="admin-search-bar">
            <input
              type="text"
              placeholder="Search students..."
              value={studentSearchQuery}
              onChange={(e) => setStudentSearchQuery(e.target.value)}
              className="admin-section-search"
            />
            <i className="bi bi-search"></i>
          </div>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td className="admin-user-name">
                    <div className="admin-user-info">
                      <span className="admin-user-icon">👨‍🎓</span>
                      {student.name}
                    </div>
                  </td>
                  <td className="admin-user-email">{student.email}</td>
                  <td className="admin-user-department">{student.department}</td>
                  <td className="admin-user-year">{student.year}</td>
                  <td className="admin-user-status">
                    <span className={`admin-status-badge ${student.status}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="admin-user-actions">
                    <button 
                      className="admin-view-profile-btn"
                      onClick={() => onViewProfile(student)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Faculty Section */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">Manage Faculty</h2>
          <div className="admin-search-bar">
            <input
              type="text"
              placeholder="Search faculty..."
              value={facultySearchQuery}
              onChange={(e) => setFacultySearchQuery(e.target.value)}
              className="admin-section-search"
            />
            <i className="bi bi-search"></i>
          </div>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map(facultyMember => (
                <tr key={facultyMember.id}>
                  <td className="admin-user-name">
                    <div className="admin-user-info">
                      <span className="admin-user-icon">👨‍🏫</span>
                      {facultyMember.name}
                    </div>
                  </td>
                  <td className="admin-user-email">{facultyMember.email}</td>
                  <td className="admin-user-department">{facultyMember.department}</td>
                  <td className="admin-user-designation">{facultyMember.designation}</td>
                  <td className="admin-user-status">
                    <span className={`admin-status-badge ${facultyMember.status}`}>
                      {facultyMember.status}
                    </span>
                  </td>
                  <td className="admin-user-actions">
                    <button 
                      className="admin-view-profile-btn"
                      onClick={() => onViewProfile(facultyMember)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// D3 Bar Chart Component
const D3BarChart = ({ data, isDarkMode }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    
    // Clear previous chart
    svg.selectAll("*").remove();

    // Set dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create main group
    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.activities)])
      .range([height, 0]);

    // Color scale
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']);

    // Grid lines
    const yAxisGrid = d3.axisLeft(yScale)
      .tickSize(-width)
      .tickFormat("")
      .ticks(8);

    g.append("g")
      .attr("class", "grid")
      .call(yAxisGrid)
      .style("stroke", isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")
      .style("stroke-dasharray", "3,3");

    // Bars
    const bars = g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.name))
      .attr("width", xScale.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", d => colorScale(d.name))
      .attr("rx", 4)
      .attr("ry", 4);

    // Animate bars
    bars.transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("y", d => yScale(d.activities))
      .attr("height", d => height - yScale(d.activities));

    // X-axis
    const xAxis = d3.axisBottom(xScale);
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", isDarkMode ? "#a0a0a0" : "#6b7280")
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .call(wrap, xScale.bandwidth());

    // Y-axis
    const yAxis = d3.axisLeft(yScale);
    g.append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .selectAll("text")
      .style("fill", isDarkMode ? "#a0a0a0" : "#6b7280")
      .style("font-size", "12px");

    // Y-axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", isDarkMode ? "#a0a0a0" : "#6b7280")
      .style("font-size", "14px")
      .style("font-weight", "500")
      .text("Activities");

    // Tooltips
    const tooltip = d3.select("body").append("div")
      .attr("class", "d3-tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", isDarkMode ? "#2a2a2a" : "#ffffff")
      .style("border", `1px solid ${isDarkMode ? "#404040" : "#e0e0e0"}`)
      .style("border-radius", "8px")
      .style("padding", "12px")
      .style("font-size", "14px")
      .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.15)")
      .style("pointer-events", "none")
      .style("z-index", "1000");

    bars
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 0.9)
          .style("filter", "brightness(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3))");

        tooltip.transition()
          .duration(200)
          .style("opacity", 1);

        tooltip.html(`
          <div style="color: ${isDarkMode ? "white" : "#1a1a1a"}; font-weight: 600; margin-bottom: 8px;">${d.name}</div>
          <div style="color: ${isDarkMode ? "#a0a0a0" : "#6b7280"}; margin-bottom: 4px;">
            <i class="bi bi-activity" style="margin-right: 6px; color: ${colorScale(d.name)};"></i>
            Activities: <span style="color: ${colorScale(d.name)}; font-weight: 600;">${d.activities}</span>
          </div>
          <div style="color: ${isDarkMode ? "#a0a0a0" : "#6b7280"}; margin-bottom: 4px;">
            <i class="bi bi-people" style="margin-right: 6px; color: ${colorScale(d.name)};"></i>
            Students: <span style="color: ${colorScale(d.name)}; font-weight: 600;">${d.students}</span>
          </div>
          <div style="color: ${isDarkMode ? "#a0a0a0" : "#6b7280"};">
            <i class="bi bi-trophy" style="margin-right: 6px; color: ${colorScale(d.name)};"></i>
            Achievements: <span style="color: ${colorScale(d.name)}; font-weight: 600;">${d.achievements}</span>
          </div>
        `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 1)
          .style("filter", "none");

        tooltip.transition()
          .duration(200)
          .style("opacity", 0);
      });

    // Cleanup function
    return () => {
      d3.select("body").selectAll(".d3-tooltip").remove();
    };

  }, [data, isDarkMode]);

  // Text wrapping function
  function wrap(text, width) {
    text.each(function() {
      const text = d3.select(this);
      const words = text.text().split(/\s+/).reverse();
      let word;
      let line = [];
      let lineNumber = 0;
      const lineHeight = 1.1;
      const y = text.attr("y");
      const dy = parseFloat(text.attr("dy"));
      let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

  return (
    <div className="d3-chart-container" ref={containerRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

// D3 Line Chart Component
const D3LineChart = ({ data, isDarkMode }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    
    // Clear previous chart
    svg.selectAll("*").remove();

    // Set dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create main group
    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scalePoint()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.activities)])
      .range([height, 0]);

    // Color scale
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']);

    // Grid lines
    const yAxisGrid = d3.axisLeft(yScale)
      .tickSize(-width)
      .tickFormat("")
      .ticks(8);

    g.append("g")
      .attr("class", "grid")
      .call(yAxisGrid)
      .style("stroke", isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")
      .style("stroke-dasharray", "3,3");

    // Line generator
    const line = d3.line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.activities))
      .curve(d3.curveMonotoneX);

    // Area generator
    const area = d3.area()
      .x(d => xScale(d.name))
      .y0(height)
      .y1(d => yScale(d.activities))
      .curve(d3.curveMonotoneX);

    // Add area
    g.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area)
      .style("fill", "url(#gradient)")
      .style("opacity", 0.3);

    // Add line
    g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#6366f1")
      .style("stroke-width", 3)
      .style("stroke-linecap", "round")
      .style("stroke-linejoin", "round");

    // Add gradient definition
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#6366f1")
      .attr("stop-opacity", 0.6);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#6366f1")
      .attr("stop-opacity", 0.1);

    // Add dots
    const dots = g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.name))
      .attr("cy", d => yScale(d.activities))
      .attr("r", 0)
      .style("fill", d => colorScale(d.name))
      .style("stroke", isDarkMode ? "#2a2a2a" : "#ffffff")
      .style("stroke-width", 2);

    // Animate dots
    dots.transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("r", 6);

    // Animate line
    const totalLength = g.select(".line").node().getTotalLength();
    g.select(".line")
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    // X-axis
    const xAxis = d3.axisBottom(xScale);
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", isDarkMode ? "#a0a0a0" : "#6b7280")
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .call(wrap, 60);

    // Y-axis
    const yAxis = d3.axisLeft(yScale);
    g.append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .selectAll("text")
      .style("fill", isDarkMode ? "#a0a0a0" : "#6b7280")
      .style("font-size", "12px");

    // Y-axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", isDarkMode ? "#a0a0a0" : "#6b7280")
      .style("font-size", "14px")
      .style("font-weight", "500")
      .text("Activities");

    // Tooltips
    const tooltip = d3.select("body").append("div")
      .attr("class", "d3-tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", isDarkMode ? "#2a2a2a" : "#ffffff")
      .style("border", `1px solid ${isDarkMode ? "#404040" : "#e0e0e0"}`)
      .style("border-radius", "8px")
      .style("padding", "12px")
      .style("font-size", "14px")
      .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.15)")
      .style("pointer-events", "none")
      .style("z-index", "1000");

    dots
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .style("stroke-width", 3);

        tooltip.transition()
          .duration(200)
          .style("opacity", 1);

        tooltip.html(`
          <div style="color: ${isDarkMode ? "white" : "#1a1a1a"}; font-weight: 600;">${d.name}</div>
          <div style="color: ${isDarkMode ? "#a0a0a0" : "#6b7280"}; margin-top: 4px;">
            Activities: <span style="color: ${colorScale(d.name)}; font-weight: 600;">${d.activities}</span>
          </div>
          <div style="color: ${isDarkMode ? "#a0a0a0" : "#6b7280"};">
            Students: <span style="color: ${colorScale(d.name)}; font-weight: 600;">${d.students}</span>
          </div>
          <div style="color: ${isDarkMode ? "#a0a0a0" : "#6b7280"};">
            Achievements: <span style="color: ${colorScale(d.name)}; font-weight: 600;">${d.achievements}</span>
          </div>
        `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 6)
          .style("stroke-width", 2);

        tooltip.transition()
          .duration(200)
          .style("opacity", 0);
      });

    // Cleanup function
    return () => {
      d3.select("body").selectAll(".d3-tooltip").remove();
    };

  }, [data, isDarkMode]);

  // Text wrapping function
  function wrap(text, width) {
    text.each(function() {
      const text = d3.select(this);
      const words = text.text().split(/\s+/).reverse();
      let word;
      let line = [];
      let lineNumber = 0;
      const lineHeight = 1.1;
      const y = text.attr("y");
      const dy = parseFloat(text.attr("dy"));
      let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

  return (
    <div className="d3-chart-container" ref={containerRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

// NAAC Reports Content Component
const NAACReportsContent = ({ onGenerateReport, isDarkMode }) => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [viewType, setViewType] = useState('bar'); // 'bar', 'line', or 'table'

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical',
    'Civil',
    'All Departments'
  ];

  const activityTypes = [
    'Internships',
    'Workshops',
    'Competitions',
    'Research Projects',
    'Certifications',
    'All Activities'
  ];

  // Mock data for reports
  const reportData = {
    departments: [
      { name: 'Computer Science', activities: 320, students: 150, achievements: 45 },
      { name: 'Information Technology', activities: 280, students: 120, achievements: 38 },
      { name: 'Electronics', activities: 250, students: 100, achievements: 32 },
      { name: 'Mechanical', activities: 200, students: 80, achievements: 28 },
      { name: 'Civil', activities: 180, students: 70, achievements: 25 }
    ],
    monthlyData: [
      { month: 'Jan', activities: 120, students: 85 },
      { month: 'Feb', activities: 135, students: 92 },
      { month: 'Mar', activities: 150, students: 98 },
      { month: 'Apr', activities: 165, students: 105 },
      { month: 'May', activities: 180, students: 112 },
      { month: 'Jun', activities: 195, students: 118 }
    ]
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="admin-naac-reports-content">
      <div className="admin-reports-header">
        <h2 className="admin-section-title">NAAC Reports</h2>
        <p className="admin-reports-description">
          Generate comprehensive reports for NAAC accreditation based on student activities and achievements.
        </p>
      </div>

      <div className="admin-reports-filters">
        <div className="admin-filter-section">
          <h3>Report Filters</h3>
          
          <div className="admin-filter-row">
            <div className="admin-filter-group">
              <label>Date Range *</label>
              <div className="admin-date-range">
                <input
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                  required
                />
                <span>to</span>
                <input
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="admin-filter-row">
            <div className="admin-filter-group">
              <label>Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="admin-filter-select"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="admin-filter-group">
              <label>Activity Type</label>
              <select
                value={selectedActivityType}
                onChange={(e) => setSelectedActivityType(e.target.value)}
                className="admin-filter-select"
              >
                <option value="">Select Activity Type</option>
                {activityTypes.map(activity => (
                  <option key={activity} value={activity}>{activity}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="admin-generate-report-section">
          <button 
            className="admin-generate-report-btn"
            onClick={onGenerateReport}
            disabled={!dateRange.startDate || !dateRange.endDate}
          >
            <i className="bi bi-download"></i>
            Generate & Export CSV Report
          </button>
        </div>
      </div>

      <div className="admin-reports-preview">
        <div className="admin-reports-preview-header">
          <h3>Report Preview</h3>
          <div className="admin-view-toggle">
            <button 
              className={`admin-view-btn ${viewType === 'bar' ? 'active' : ''}`}
              onClick={() => setViewType('bar')}
            >
              <i className="bi bi-bar-chart-fill"></i>
              Bar Chart
            </button>
            <button 
              className={`admin-view-btn ${viewType === 'line' ? 'active' : ''}`}
              onClick={() => setViewType('line')}
            >
              <i className="bi bi-graph-up"></i>
              Line Chart
            </button>
            <button 
              className={`admin-view-btn ${viewType === 'table' ? 'active' : ''}`}
              onClick={() => setViewType('table')}
            >
              <i className="bi bi-table"></i>
              Table
            </button>
          </div>
        </div>

        {viewType === 'bar' && (
          <div className="admin-graph-container">
            <div className="admin-graph-header">
              <h4>Department-wise Activities - Bar Chart</h4>
            </div>
            <D3BarChart data={reportData.departments} isDarkMode={isDarkMode} />
          </div>
        )}

        {viewType === 'line' && (
          <div className="admin-graph-container">
            <div className="admin-graph-header">
              <h4>Department-wise Activities - Line Chart</h4>
            </div>
            <D3LineChart data={reportData.departments} isDarkMode={isDarkMode} />
          </div>
        )}

        {viewType === 'table' && (
          <div className="admin-table-container">
            <div className="admin-table-header">
              <h4>Department-wise Report Data</h4>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Activities</th>
                    <th>Students</th>
                    <th>Achievements</th>
                    <th>Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.departments.map((dept, index) => (
                    <tr key={dept.name}>
                      <td className="admin-user-info">
                        <div className="admin-user-icon">
                          <i className="bi bi-building"></i>
                        </div>
                        <div>
                          <div className="admin-user-name">{dept.name}</div>
                        </div>
                      </td>
                      <td>{dept.activities}</td>
                      <td>{dept.students}</td>
                      <td>{dept.achievements}</td>
                      <td>
                        <span className="admin-status-badge active">
                          {Math.round((dept.achievements / dept.activities) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
